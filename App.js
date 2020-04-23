import React, { useEffect, useContext, useMemo, useReducer } from 'react';

// React Nav
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
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

// import { BlurView } from 'expo-blur';

export default () => {

  const AppStack = createStackNavigator();

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'add_error':
        return { ...state, errorMessage: action.payload };
      case 'signup':
      case 'signin':
        return { errorMessage: '', token: action.payload, isLoading: false };
      case 'clear_error_message':
        return { ...state, errorMessage: '' };
      case 'signout':
        return { errorMessage: '', token: null, isLoading: false };
      case 'need_to_signin':
        return { ...state, isLoading: false };
      default:
        return state;
    }
  },
    { isLoading: true, token: null, errorMessage: '' }
  );

  const authContext = useMemo(() => {
    return {
      signup: async ({ email, password }) => {
        try {
          const response = await roseyApi.post('/signup', { email, password });
          const token = response.data.token;
          console.log(token);
          await AsyncStorage.setItem('token', token);
          dispatch({ type: 'sign_up', payload: token });
          RootNavigation.navigate('Account');
        } catch (err) {
          console.log(err.message);
          dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
        }
      },
      signin: async ({ email, password }) => {
        try {
          const response = await roseyApi.post('/signin', { email, password });
          const token = response.data.token;
          await AsyncStorage.setItem('token', token);
          dispatch({ type: 'signin', payload: token });
          RootNavigation.navigate('Account');
          // navigate('drawerFlow');
        } catch (err) {
          console.log(err.message);
          dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
        }
      },
      tryLocalSignin: async () => {
        console.log('tryLocalSignin');
        const token = await AsyncStorage.getItem('token');
        if (token) {
          console.log(token);
          dispatch({ type: 'signin', payload: token });
          // RootNavigation.navigate('Account');
        } else {
          // RootNavigation.navigate('AuthStack');
          dispatch({ type: 'need_to_signin' });
        }
      },
      clearErrorMessage: () => {
        dispatch({ type: 'clear_error_message' });
      },
      signout: async () => {
        console.log('signout')
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'signout' });
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

  console.log(state);

  return (
    <AuthContext.Provider value={{ state, ...authContext }}>
      <RoseProvider>
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
                  ? <AppStack.Screen name="authStack" component={authStackScreen} />
                  : <AppStack.Screen name="mainFlow" component={App}
                    options={({ navigation, route }) => ({ headerTitle: null,
headerLeft: () => {
                        return <View style={{ flexDirection: 'row' }}>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.dispatch(DrawerActions.toggleDrawer());
                            }}>
                            <Feather name="menu" size={24} style={{ padding: 5 }} />
                          </TouchableOpacity>
                        </View>
                      }
                    })}
                  />
            }
          </AppStack.Navigator>
        </NavigationContainer>
      </RoseProvider>
    </AuthContext.Provider>
  )
}
