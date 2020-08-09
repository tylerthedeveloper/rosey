import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking'
import * as Location from 'expo-location';
import React, { useEffect, useMemo, useReducer } from 'react';
import { Alert, AsyncStorage, StatusBar } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider as PaperProvider } from 'react-native-paper';
// Screens
import { App } from "./src/navigation/AppDrawer";
import { Auth } from "./src/navigation/Auth";
import { ResolveAuthScreen } from './src/screens/Auth';
// Helpers
import { isMountedRef, navigate, navigationRef } from './RootNavigation'; // TODO: Move into navigation
import roseyApi from './src/api/roseyApi';
import Constants from "./src/constants";
// Context and PROVIDERS
import { AuthContext } from './src/context/AuthContext';
import { Provider as ContactProvider } from './src/context/ContactsContext';
import { Provider as RoseProvider } from './src/context/RoseContext';
import { Provider as TagProvider } from './src/context/TagContext';
import theme from './src/core/theme';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import firebase from 'firebase';
import { firebaseConfig } from './config/firebase';

try {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
} catch (e) {
  console.log(e.message);
  // firebase.analytics();
}

// const prefix = Linking.makeUrl('/');

export default () => {

  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  useEffect(() => {
    // ANDROID!!!
    Linking.getInitialURL().then(url => {
      const { path, queryParams: { userID } } = Linking.parse(url);
      // console.log('path, user', path, userID);
      if (path === 'main/home/add') {
        if (userID !== '' && userID !== undefined && userID !== null) {
          setTimeout(() => navigate('SharedResolver', { shared: true, userID }), 0);
        } else if (userID === '' || userID === undefined || userID == null) {
          // Alert()
          alert('Looks like you tried to share a user that did not exist /:')
        }
      }
    })
  }, [])

  const _handleOpenURL = (event) => {
    const { path, queryParams: { userID } } = Linking.parse(event.url);
    if (path === 'main/home/add') {
      if (userID !== '' && userID !== undefined && userID !== null) {
        navigate('SharedResolver', { shared: true, userID });
        // navigate('AddRose', { shared: true, userID });
      } else if (userID === '' || userID === undefined || userID == null) {
        alert('Looks like you tried to share a user that did not exist /:')
      }
    }
  }

  // const ref = React.useRef();
  // const { getInitialState } = useLinking(ref, {
  //   prefixes: [prefix],
  //   config: {
  //     App: {
  //       path: 'main',
  //       screens: {
  //         Home: {
  //           path: 'home',
  //           screens: {
  //             AddRose: 'add'
  //           }
  //         },
  //       }
  //     }
  //   }
  // });

  useEffect(() => {
    Linking.addEventListener('url', _handleOpenURL);
    // console.log('listener');
    return () => (Linking.removeEventListener('url', _handleOpenURL));
  }, [])

  const [state, dispatch] = useReducer((state, action) => {
    const { payload } = action;
    switch (action.type) {
      case 'set_api_loading':
        return { ...state, isApiLoading: true, errorMessage: '' };
      case 'add_error':
        return { ...state, errorMessage: payload, isLoading: false, isApiLoading: false };
      case 'signup':
        return { errorMessage: '', token: payload.token, user: payload.user, isLoading: false, isApiLoading: false };
      case 'signin':
        return { errorMessage: '', token: payload.token, user: payload.user, isLoading: false, isApiLoading: false };
      case 'update_contact_card':
        return { ...state, user: action.payload, isApiLoading: false, errorMessage: '' };
      case 'clear_error_message':
        return { ...state, errorMessage: '' };
      case 'signout': // TODO: User null??? user: null
        return { ...state, errorMessage: '', token: null, isLoading: false, authUser: null };
      case 'need_to_signin':
        return { ...state, isLoading: false };
      default:
        return state;
    }
  },
    { isLoading: true, token: null, isApiLoading: false, errorMessage: '', user: {}, authUser: null }
  );

  const authContext = useMemo(() => {
    return {
      signup: async ({ name, email, password }) => {
        try {
          dispatch({ type: 'set_api_loading' });
          const _user = Constants._generateUser({ name, email, password, userType: 'user' });
          // console.log('_user', _user)
          const response = await roseyApi.post('/auth/signup', { user: _user });
          const { token, user } = response.data;
          // console.log(token, user);
          await AsyncStorage.multiSet([['token', token], ['user', JSON.stringify(user)]]);
          dispatch({ type: 'signup', payload: { token, user } });
          // dispatch({ type: 'signup', payload: user });
        } catch (err) {
          // FIXME: if necessary, tell user duplicate email 
          // if (err.message.includes('duplicate')) {

          // }
          dispatch({ type: 'add_error', payload: "Something went wrong with sign up, consider trying a different email" });
        }
      },
      // TODO: 
      // 1. check if user exists locally
      // share local user...
      // set timeout
      // fech API
      // check if users are different
      // same == do notjing
      // different reset
      signin: async ({ email, password }) => {
        try {
          /* -------------------------------------------------------------------------- */
          dispatch({ type: 'set_api_loading' });
          const response = await roseyApi.post('/auth/signin', { email, password });
          const { token, user } = response.data;
          await AsyncStorage.multiSet([['token', token], ['user', JSON.stringify(user)]]);
          dispatch({ type: 'signin', payload: { token, user } });
        } catch (err) {
          dispatch({ type: 'add_error', payload: 'Something went wrong with sign in, please check your spelling and try again' });
        }
      },
      signinWithFirebase: async ({ email, uid }) => {
        try {
          // console.log('_user', email, uid)
          const _user = {
            email, uid
          }
          await AsyncStorage.setItem('authUser', JSON.stringify(_user));
          dispatch({ type: 'signin', payload: { authUser: _user, user: _user } });
        } catch (err) {
          console.log(err.message)
          dispatch({ type: 'add_error', payload: 'Something went wrong with sign in, please check your spelling and try again' });
        }
      },
      updateContactCard: async ({ roseObj, callback }) => {
        try {
          // console.log('updateContactCard')
          dispatch({ type: 'set_api_loading' });
          const response = await roseyApi.post('/users/contact_card', { userObj: roseObj });
          const { user } = response.data;
          await AsyncStorage.setItem('user', JSON.stringify(user));
          dispatch({ type: 'update_contact_card', payload: user });
          if (callback) {
            callback();
          }
        } catch (err) {
          console.log(err);
          dispatch({ type: 'add_error', payload: 'Something went wrong editng contact card' });
        }
      },
      // TODO: what about if token exists and user doesnt?
      tryLocalSignin: async () => {
        try {
          firebase.auth().onAuthStateChanged(async user => {
            if (user) {
              const { email, uid } = user;
              const _user = { email, uid };
              await AsyncStorage.setItem('authUser', JSON.stringify(_user));
              dispatch({ type: 'signin', payload: { authUser: _user, user: _user } });
            } else {
              dispatch({ type: 'need_to_signin' });
            }
          });
        } catch (err) {
          console.log(err)
          dispatch({ type: 'add_error', payload: 'Something went wrong with sign in' });
        }
      },
      clearErrorMessage: () => {
        dispatch({ type: 'clear_error_message' });
      },
      signout: async () => {
        // console.log('signout')
        try {
          /* -------------------------------------------------------------------------- */
          // await AsyncStorage.removeItem('token'); // FIXME: And user? maybe this is when i should definitely refetch...?
          await AsyncStorage.removeItem('authUser'); // FIXME: And user? maybe this is when i should definitely refetch...?
          /* -------------------------------------------------------------------------- */
          // await AsyncStorage.removeItem('user');
          firebase.auth().signOut();
          dispatch({ type: 'signout' });
        } catch (e) {
          console.log(e.message);
        }
      }
    };
  }, []);

  const { tryLocalSignin } = authContext;

  useEffect(() => {
    tryLocalSignin();
  }, []);

  // FIXME: Ask again?
  // FIXME: Ask for all permissions here?
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      // console.log('location: ', status);

      // if (status !== 'granted') {
      //   alert('Permission to access location was denied');
      // }
      // let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
      // console.log(location)
    })();
  });

  // TODO:?
  // useEffect(() => {
  //   getInitialTags();
  // }, []);

  // TODO:
  const errorHandler = (error, stackTrace) => {
    /* Log the error to an error reporting service */
    console.log(error);
    // console.error(stackTrace);
  }

  const AppStack = createStackNavigator();

  return (
    <ErrorBoundary onError={errorHandler}>
      <AuthContext.Provider value={{ state, ...authContext }}>
        <RoseProvider>
          <ContactProvider>
            <TagProvider>
              <PaperProvider theme={theme}>
                {/* https://reactnavigation.org/docs/navigating-without-navigation-prop/ */}
                {/* <App ref={(navigator) => setNavigator(navigator)} /> */}
                <SafeAreaProvider>
                  <NavigationContainer ref={navigationRef} >
                    <AppStack.Navigator initialRouteName="ResolveAuth" headerMode='none'>
                      {
                        state.isLoading ?
                          <AppStack.Screen name="ResolveAuth" component={ResolveAuthScreen}
                            options={{ headerTransparent: true, headerTitle: null }}
                          />
                          // FIXME: work without TOKEN!
                          : (state.authUser === null)
                            ? <AppStack.Screen name="authStack" component={Auth}
                              headerMode="none"
                              options={{ headerTransparent: true, headerTitle: null }}
                            />
                            : <AppStack.Screen name="mainFlow" component={App} />
                      }
                    </AppStack.Navigator>
                  </NavigationContainer>
                </SafeAreaProvider>
              </PaperProvider>
            </TagProvider>
          </ContactProvider>
        </RoseProvider>
      </AuthContext.Provider>
    </ErrorBoundary>
  )
}
