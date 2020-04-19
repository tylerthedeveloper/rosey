import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';


// import {
//   MapScreen,
//   ResolveAuthScreen,
//   SigninScreen,
//   SignupScreen
// }
//   from './src/screens';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import MapScreen from './src/screens/MapScreen';
import FriendListScreen from './src/screens/FriendListScreen';
import FriendDetailScreen from './src/screens/FriendDetailScreen';

const loginFlow = createStackNavigator({
  Signup: SignupScreen,
  Signin: SigninScreen
});

const mainTabFlow = createBottomTabNavigator({
  Map: MapScreen,
  List: createStackNavigator({
    List: FriendListScreen,
    FriendDetail: FriendDetailScreen 
  })
});

const drawerFlow = createDrawerNavigator({
  mainTabFlow
});

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow,
  drawerFlow
},
{
  initialRouteName: 'ResolveAuth'
}
);

const App = createAppContainer(switchNavigator);

// TODO: Test without function call
export default () => {
  return (
    <App />
  )
}
