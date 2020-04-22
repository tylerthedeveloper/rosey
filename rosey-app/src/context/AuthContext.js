// import createDataContext from './createDataContext';
// import roseyApi from '../api/roseyApi';
// import { AsyncStorage } from 'react-native';
// import * as RootNavigation from '../../RootNavigation';

// // Reducer
// const authReducer = (state, action) => {
//     switch (action.type) {
//         case 'add_error':
//             return { ...state, errorMessage: action.payload };
//         case 'signup':
//         case 'signin':
//             return { errorMessage: '', token: action.payload, isLoading: false };
//         case 'clear_error_message':
//             return { ...state, errorMessage: '' };
//         case 'signout':
//             return { errorMessage: '', token: null };
//         default:
//             return state;
//     }
// }

// // List of action functions
// const signup = (dispatch) => async ({ email, password }) => {
//     try {
//         const response = await roseyApi.post('/signup', { email, password });
//         const token = response.data.token;
//         console.log(token);
//         await AsyncStorage.setItem('token', token);
//         dispatch({ type: 'sign_up', payload: token });
//         RootNavigation.navigate('Account');
//     } catch (err) {
//         console.log(err.message);
//         dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
//     }
// }

// const signin = (dispatch) => async ({ email, password }) => {
//     try {
//         const response = await roseyApi.post('/signin', { email, password });
//         const token = response.data.token;
//         await AsyncStorage.setItem('token', token);
//         dispatch({ type: 'signin', payload: token });
//         RootNavigation.navigate('Account');
//         // navigate('drawerFlow');
//     } catch (err) {
//         console.log(err.message);
//         dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
//     }
// };

// const tryLocalSignin = (dispatch) => async () => {
//     const token = await AsyncStorage.getItem('token');
//     if (token) {
//         console.log(token);
//         dispatch({ type: 'signin', payload: token });
//         RootNavigation.navigate('Account');
//     } else {
//         RootNavigation.navigate('AuthStack');
//     }
// };

// const clearErrorMessage = (dispatch) => () => {
//     dispatch({ type: 'clear_error_message' });
// };

// const signout = (dispatch) => async () => {
//     await AsyncStorage.removeItem('token');
//     dispatch({ type: 'signout' });
//     // navigate('loginFlow');
// };

// //Main
// export const { Context, Provider } = createDataContext(
//     authReducer, // reducer
//     { signin, signout, signup, clearErrorMessage, tryLocalSignin }, //list of action functions
//     { isLoading: true, token: null, errorMessage: '' } //default state values
// );

import React from "react";

export const AuthContext = React.createContext();
// export const AuthContext = React.createContext({ isLoading: true, token: null, errorMessage: '' });
