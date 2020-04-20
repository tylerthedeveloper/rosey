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
// SCREENS
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import MapScreen from './src/screens/MapScreen';
import FriendListScreen from './src/screens/FriendListScreen';
import FriendDetailScreen from './src/screens/FriendDetailScreen';
import AddFriendScreen from './src/screens/AddFriendScreen';
import AccountScreen from './src/screens/AccountScreen';

import { FontAwesome } from '@expo/vector-icons';
import MainPlusButton from './src/components/MainPlusButton';

// PROVIDERS
import { Provider as AuthProvider } from './src/context/AuthContext';

import { setNavigator } from "./navigationRef";
import { TouchableOpacity } from 'react-native-gesture-handler';

const loginFlow = createStackNavigator({
  Signup: SignupScreen,
  Signin: SigninScreen
});

const listFlow = createStackNavigator({
  FriendList: FriendListScreen,
  FriendDetail: FriendDetailScreen
});

listFlow.navigationOptions = {
  title: '',
  tabBarIcon: <FontAwesome name="list" size={20} />,
  header: { visible: false },
  // headerLeft: () => <FontAwesome name="list" size={20} />
};

const mainTabFlow = createBottomTabNavigator({
  Map: {
    screen: MapScreen,
  },
  Plus: {
    screen: () => null,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: <MainPlusButton />,
      tabBarLabel: () => null,
      tabBarOnPress: (event) => {
        event.preventDefault();
        console.log('pplus pushed')
        navigation.navigate('AddFriend')
      }
    }),
  },
  listFlow
},
);

const drawerFlow = createDrawerNavigator({
  mainTabFlow,
  AddFriend: AddFriendScreen,
  Account: AccountScreen,
},
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => {
        return (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{marginLeft: 20}}>
            <FontAwesome name="list" size={20} />
          </TouchableOpacity >
        )
      },
      title: '',
    })
  }
);

// TODO: test putting navigation options here
const fullAppFlow = createStackNavigator({
  drawerFlow
}
);

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow,
  fullAppFlow
},
  {
    initialRouteName: 'ResolveAuth'
  }
);

const App = createAppContainer(switchNavigator);

// TODO: Test without function call
export default () => {
  return (
    <AuthProvider>
      {/* https://reactnavigation.org/docs/navigating-without-navigation-prop/ */}
      <App ref={(navigator) => setNavigator(navigator)} />
    </AuthProvider>
  )
}
