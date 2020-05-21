import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useMemo, useReducer, useContext } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Auth } from "./src/navigation/Auth";
import { App } from "./src/navigation/AppDrawer";
import { isMountedRef, navigationRef } from './RootNavigation'; // TODO: Move into navigation
// Context and PROVIDERS
import { AuthContext } from './src/context/AuthContext';
import { Provider as TagProvider } from './src/context/TagContext';
import { Provider as RoseProvider } from './src/context/RoseContext';
import theme from './src/core/theme';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import ErrorBoundary from 'react-native-error-boundary'

import * as Location from 'expo-location';

export default () => {

  const AppStack = createStackNavigator();

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'add_error':
        return { ...state, errorMessage: action.payload };
      case 'signup':
      case 'signin':
        /* -------------------------------------------------------------------------- */
        // const { token, user } = action.payload;
        // return { errorMessage: '', token, user, isLoading: false };
        /* -------------------------------------------------------------------------- */
        return { errorMessage: '', user: action.payload, isLoading: false };
      case 'update_contact_card':
        return { ...state, user: action.payload };
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
    { isLoading: true, token: null, errorMessage: '', user: {} }
  );

  const _generateUser = ({ name, email }) => {
    return {
      birthday: new Date(Date.now()),
      email: email || '',
      homeLocation: {
        homeLocationCoords: { latitude: -369, longitude: -369 },
        homeFormatted_address: '',
        homeLocationName: ''
      },
      name: name || '',
      nickName: '', phoneNumber: '',
      // placeMetAt: {
      //   placeMetAtLocationCoords: { latitude: -369, longitude: -369 },
      //   placeMetAtFormatted_address: '',
      //   placeMetAtName: ''
      // },
      picture: '',
      socialProfiles: {
        facebook: '',
        linkedin: '',
        instagram: '',
        medium: '',
        snapchat: '',
        twitter: '',
        whatsapp: ''
      },
      // tags: '',
      work: ''
    };
  }

  const authContext = useMemo(() => {
    return {
      signup: async ({ name, email, password }) => {
        try {
          /* -------------------------------------------------------------------------- */
          // const response = await roseyApi.post('/signup', { email, password });
          // const { token, user } = response.data;
          // await AsyncStorage.multiSet([['token', token], ['user', JSON.stringify(user)]]);
          // dispatch({ type: 'signup', payload: { token, user } });
          /* -------------------------------------------------------------------------- */
          // console.log('singup', name, email)
          const user = _generateUser({ name, email });
          // console.log('sign up user', user);
          await AsyncStorage.setItem('user', JSON.stringify(user));
          dispatch({ type: 'signup', payload: user });
          // const newUser = await AsyncStorage.getItem('user');
          // console.log('newUser', newUser);
          // console.log('newUser', JSON.parse(newUser));
        } catch (err) {
          // console.log('RESPONSE', err.response.data.message);
          // const { message } = err.response.data;
          dispatch({ type: 'add_error', payload: err.message || 'Something went wrong with sign up' });
        }
      },
      signin: async ({ email, password }) => {
        // FIXME: work without API
        try {
          /* -------------------------------------------------------------------------- */
          // const response = await roseyApi.post('/signin', { email, password });
          // const { token, user } = response.data;
          // console.log('signin:', token, user)
          // await AsyncStorage.multiSet([['token', token], ['user', JSON.stringify(user)]]);
          // dispatch({ type: 'signin', payload: { token, user } });
          /* -------------------------------------------------------------------------- */
          const user = await AsyncStorage.getItem('user');
          if (!user) {
            const _user = _generateUser({ email });
            // console.log('sign in user', _user);
            dispatch({ type: 'signin', payload: _user });
          } else {
            // console.log('sign in user', user);
            dispatch({ type: 'signin', payload: JSON.parse(user) });
          }
        } catch (err) {
          dispatch({ type: 'add_error', payload: 'Something went wrong with sign in' });
        }
      },
      updateContactCard: async ({ roseObj, callback }) => {
        // console.log(userData);
        try {
          /* -------------------------------------------------------------------------- */
          // const response = await roseyApi.post('/contact_card', userData);
          // const updatedUserObj = response.data;
          // console.log('updateContactCard:', roseObj)
          /* -------------------------------------------------------------------------- */
          // console.log('roseObj', callback, roseObj);
          await AsyncStorage.setItem('user', JSON.stringify(roseObj));
          dispatch({ type: 'update_contact_card', payload: roseObj });
          if (callback) {
            callback();
          }
        } catch (err) {
          dispatch({ type: 'add_error', payload: 'Something went wrong with sign in' });
        }
      },
      // TODO: what about if token exists and user doesnt?
      tryLocalSignin: async () => {
        // console.log('tryLocalSignin');
        try {
          /* -------------------------------------------------------------------------- */
          // const storageArr = await AsyncStorage.multiGet(['token', 'user']);
          // if (storageArr) {
          //   const token = storageArr[0][1];
          //   const user = storageArr[1][1];
          //   // console.log('tryLocalSignin', JSON.parse(user).user)
          //   // FIXME: will this fail if user never flushed to data cache?
          //   if (token && user) {
          //     dispatch({ type: 'signin', payload: { token, user: JSON.parse(user).user } });
          //   } else {
          //     dispatch({ type: 'need_to_signin' });
          //   }
          // }
          /* -------------------------------------------------------------------------- */
          // await AsyncStorage.removeItem('user');
          const user = await AsyncStorage.getItem('user');
          if (user) {
            // console.log(user)
            dispatch({ type: 'signin', payload: JSON.parse(user) });
          } else {
            // console.log('need_to_signin')
            dispatch({ type: 'need_to_signin' });
          }
        } catch (err) {
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
          // await AsyncStorage.removeItem('token'); // TODO: And user?
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

  // FIXME:???
  useEffect(() => {
    tryLocalSignin();
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

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


  // useEffect(() => {
  //   getInitialTags();
  // }, []);


  const errorHandler = (error, stackTrace) => {
    /* Log the error to an error reporting service */
    console.log(error);
    // console.error(stackTrace);
  }

  return (
    <ErrorBoundary onError={errorHandler}>
      <AuthContext.Provider value={{ state, ...authContext }}>
        <TagProvider>
          <RoseProvider>
            <PaperProvider theme={theme}>
              {/* https://reactnavigation.org/docs/navigating-without-navigation-prop/ */}
              {/* <App ref={(navigator) => setNavigator(navigator)} /> */}
              <NavigationContainer ref={navigationRef}>
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
          </RoseProvider>
        </TagProvider>
      </AuthContext.Provider>
    </ErrorBoundary>
  )
}
