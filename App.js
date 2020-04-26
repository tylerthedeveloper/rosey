import React, { useEffect, useContext, useMemo, useReducer } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

// React Nav
import { NavigationContainer, DrawerActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, AsyncStorage, View, TouchableOpacity } from 'react-native';
import { navigationRef, isMountedRef } from './RootNavigation';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { authStackScreen, App } from "./AppNavigation";

import { MultiBar, MultiBarToggle } from 'react-native-multibar';
import { Feather } from '@expo/vector-icons';

// Context and PROVIDERS
import { AuthContext } from './src/context/AuthContext';
import { Provider as RoseProvider } from './src/context/RoseContext';
import roseyApi from './src/api/roseyApi';
import theme from './src/core/theme';

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
      case 'update_profile':
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

  // FIXME: work without API
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
          console.log('singup', name, email, password)
          const user = {
            name, email,
            // Defaults:
            birthday: '', homeLocation: { city: '', state: '', country: '' },
            nickName: '', phoneNumber: '',
            placeMetAt: {
              placeName: '',
              coords: {
                latitude: -369,
                longitude: -369
              }
            },
            picture: '',
            tags: '',
            work: ''
          };
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
          dispatch({ type: 'signin', payload: JSON.parse(user) });
        } catch (err) {
          dispatch({ type: 'add_error', payload: 'Something went wrong with sign in' });
        }
      },
      // FIXME: work without API
      updateProfile: async ({updatedUserObj, callback}) => {
        // console.log(userData);
        try {
          /* -------------------------------------------------------------------------- */
          // const response = await roseyApi.post('/profile', userData);
          // const updatedUserObj = response.data;
          // console.log('updatProfile:', updatedUserObj)
          /* -------------------------------------------------------------------------- */
          // console.log('updatedUserObj', callback, updatedUserObj);
          await AsyncStorage.setItem('user', JSON.stringify(updatedUserObj));
          dispatch({ type: 'update_profile', payload: updatedUserObj });
          if (callback) {
            callback();
          }
        } catch (err) {
          dispatch({ type: 'add_error', payload: 'Something went wrong with sign in' });
        }
      },
      // TODO: what about if token exists and user doesnt?
      tryLocalSignin: async () => {
        console.log('tryLocalSignin');
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
          const user = await AsyncStorage.getItem('user');
          if (user) {
            dispatch({ type: 'signin', payload: JSON.parse(user) });
          }
        } catch (err) {
          dispatch({ type: 'add_error', payload: 'Something went wrong with sign in' });
        }
      },
      clearErrorMessage: () => {
        dispatch({ type: 'clear_error_message' });
      },
      signout: async () => {
        console.log('signout')
        try {
          /* -------------------------------------------------------------------------- */
          // await AsyncStorage.removeItem('token'); // TODO: And user?
          // await AsyncStorage.multiRemove(['token', 'user']);
          /* -------------------------------------------------------------------------- */
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

  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  return (
    <AuthContext.Provider value={{ state, ...authContext }
    }>
      <RoseProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer ref={navigationRef}>
            {/* https://reactnavigation.org/docs/navigating-without-navigation-prop/ */}
            {/* <App ref={(navigator) => setNavigator(navigator)} /> */}
            <AppStack.Navigator initialRouteName="ResolveAuth">
              {
                state.isLoading ?
                  <AppStack.Screen name="ResolveAuth" component={ResolveAuthScreen}
                    options={{ headerTransparent: true, headerTitle: null }}
                  />
                  : (state.token === null)
                    ? <AppStack.Screen name="authStack" component={authStackScreen}
                      headerMode="none"
                      options={{ headerTransparent: true, headerTitle: null }}
                    />
                    : <AppStack.Screen name="mainFlow" component={App}
                      options={({ navigation, route }) => ({
                        headerTitle: null,
                        headerLeft: () => {
                          return <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                              onPress={() => {
                                navigation.dispatch(DrawerActions.toggleDrawer());
                              }}>
                              <Feather name="menu" size={24} style={{ marginLeft: 10 }} />
                            </TouchableOpacity>
                          </View>
                        }
                      })}
                    />
              }
            </AppStack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </RoseProvider>
    </AuthContext.Provider >
  )
}
