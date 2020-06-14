import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Linking } from 'expo';
import * as Location from 'expo-location';
import React, { useEffect, useMemo, useReducer } from 'react';
import { AsyncStorage } from 'react-native';
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

// const prefix = Linking.makeUrl('/');

export default () => {

  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  useEffect(() => {
    Linking.getInitialURL().then(url => {
      const { path, queryParams: { userID } } = Linking.parse(url);
      // console.log('path, user', path, userID);
      if (path === 'main/home/add' && (userID !== '' && userID !== undefined && userID !== null)) {
        setTimeout(() => navigate('AddRose', { shared: true, userID }), 0);
      }
    })
  }, [])

  const _handleOpenURL = (event) => {
    const { path, queryParams: { userID } } = Linking.parse(event.url);
    if (path === 'main/home/add' && (userID !== '' && userID !== undefined && userID !== null)) {
      navigate('AddRose', { shared: true, userID });
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
        return { ...state, errorMessage: '', token: null, isLoading: false };
      case 'need_to_signin':
        return { ...state, isLoading: false };
      default:
        return state;
    }
  },
    { isLoading: true, token: null, isApiLoading: false, errorMessage: '', user: {} }
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
        console.log('tryLocalSignin');
        // await AsyncStorage.removeItem('user');
        // await AsyncStorage.removeItem('token');
        // await AsyncStorage.removeItem('roses');
        try {
          /* -------------------------------------------------------------------------- */
          const storageArr = await AsyncStorage.multiGet(['token', 'user']);
          if (storageArr) {
            const token = storageArr[0][1];
            const userObj = storageArr[1][1];
            // FIXME: will this fail if user never flushed to data cache?
            if (token !== null && userObj !== null) {
              // console.log('token and user');
              dispatch({ type: 'signin', payload: { token, user: JSON.parse(userObj) } });
            } else {
              // console.log('THER IS NO token and user');
              dispatch({ type: 'need_to_signin' });
            }
          }
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
          await AsyncStorage.removeItem('token'); // FIXME: And user? maybe this is when i should definitely refetch...?
          // await AsyncStorage.multiRemove(['token', 'user']);
          /* -------------------------------------------------------------------------- */
          // await AsyncStorage.removeItem('user');
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
      if (status !== 'granted') {
        alert('Permission to access location was denied');
      }

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
                <NavigationContainer ref={navigationRef} >
                  <AppStack.Navigator initialRouteName="ResolveAuth" headerMode='none'>
                    {
                      state.isLoading ?
                        <AppStack.Screen name="ResolveAuth" component={ResolveAuthScreen}
                          options={{ headerTransparent: true, headerTitle: null }}
                        />
                        // FIXME: work without TOKEN!
                        : (state.token === null)
                          ? <AppStack.Screen name="authStack" component={Auth}
                            headerMode="none"
                            options={{ headerTransparent: true, headerTitle: null }}
                          />
                          : <AppStack.Screen name="mainFlow" component={App} />
                    }
                  </AppStack.Navigator>
                </NavigationContainer>
              </PaperProvider>
            </TagProvider>
          </ContactProvider>
        </RoseProvider>
      </AuthContext.Provider>
    </ErrorBoundary>
  )
}
