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
import RoseListScreen from './src/screens/RoseListScreen';
import RoseDetailScreen from './src/screens/RoseDetailScreen';
import AddRoseScreen from './src/screens/AddRoseScreen';
import AccountScreen from './src/screens/AccountScreen';

import { MultiBar, MultiBarToggle } from 'react-native-multibar';
import { FontAwesome } from '@expo/vector-icons';
import MainPlusButton from './src/components/MainPlusButton';
import Icon from '@expo/vector-icons/FontAwesome';

// PROVIDERS
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as RoseProvider } from './src/context/RoseContext';

import { setNavigator } from "./navigationRef";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, AsyncStorage } from 'react-native';

const loginFlow = createStackNavigator({
  Signup: SignupScreen,
  Signin: SigninScreen
});

const listFlow = createStackNavigator({
  RoseList: RoseListScreen,
  RoseDetail: RoseDetailScreen
});

listFlow.navigationOptions = {
  title: '',
  tabBarIcon: <FontAwesome name="list" size={20} />,
  header: { visible: false },
};

const Routes = {
  Map: 'MapScreen',
  Add: 'AddRoseScreen',
  List: 'listFlow'
};

const _mainTabFlow = createBottomTabNavigator({
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
        navigation.navigate('AddRose')
      }
    }),
  },
  listFlow
});

const mainTabFlow = createBottomTabNavigator({
  [Routes.Map]: {
    screen: MapScreen,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="map"
          color={tintColor}
          size={24}
        />
      )
    })
  },
  MultiBar: {
    screen: () => null,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: () => (
        <MultiBarToggle
          navigation={navigation}
          actionSize={30}
          routes={[
            {
              routeName: Routes.Map,
              color: '#FF8360',
              icon: (
                <Icon
                  name="map"
                  color="#333333"
                  size={15}
                />
              )
            },
            {
              routeName: 'Account',
              color: '#E8E288',
              icon: (
                <Icon
                  name="plus"
                  color="#333333"
                  size={15}
                />
              )
            },
            {
              routeName: Routes.List,
              color: '#7DCE82',
              icon: (
                <Icon
                  name="list"
                  color="#333333"
                  size={15}
                />
              )
            },
          ]}
          icon={(
            <Icon
              name="plus"
              color="#FFFFFF"
              size={24}
            />
          )}
        />
      )
    }),
    params: {
      // navigationDisabled: true
    }
  },
  [Routes.List]: {
    screen: listFlow,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="list"
          color={tintColor}
          size={24}
        />
      )
    })
  },
},
  {
    tabBarComponent: MultiBar,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#F8F8F8',
      inactiveTintColor: '#586589',
      style: {
        backgroundColor: '#171F33'
      },
      tabStyle: {}
    }
  });



// TODO: add signout here?
const drawerFlow = createDrawerNavigator({
  mainTabFlow,
  Account: AccountScreen,
  AddRose: AddRoseScreen,
  // FIXME: this is now how to handle logout!!!
  Logout: {
    label: "lag",
    screen: () => {
      return (
        <TouchableOpacity onPress={async () => {
          await AsyncStorage.removeItem('token')
          console.log(await AsyncStorage.getItem('token'))
        }} >
          <Text> Logout </Text>
        </TouchableOpacity >
      )
    }
  }
},
  {
    // FIXME: initialRouteName: mainTabFlow,
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => {
        return (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 20 }}>
            <FontAwesome name="list" size={20} />
          </TouchableOpacity >
        )
      },
      title: '',
    }),
  }
);

// TODO: test putting navigation options here
const fullAppFlow = createStackNavigator({
  drawerFlow
});

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
      <RoseProvider>
        {/* https://reactnavigation.org/docs/navigating-without-navigation-prop/ */}
        <App ref={(navigator) => setNavigator(navigator)} />
      </RoseProvider>
    </AuthProvider>
  )
}
