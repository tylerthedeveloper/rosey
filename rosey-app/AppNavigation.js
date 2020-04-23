import React, { useEffect, useContext, useMemo, useReducer } from 'react';
import { FlatList, StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';

const AuthStack = createStackNavigator();
export const authStackScreen = () => {
    return (
        <AuthStack.Navigator headerMode="none">
            <AuthStack.Screen name="Signup" component={SignupScreen} />
            <AuthStack.Screen name="Signin" component={SigninScreen} />
        </AuthStack.Navigator>
    );
}

import RoseListScreen from './src/screens/RoseListScreen';
import RoseDetailScreen from './src/screens/RoseDetailScreen';

const ListStack = createStackNavigator();
export const listStack = () => {
    return (
        <ListStack.Navigator headerMode="none">
            <ListStack.Screen name="RoseList" component={RoseListScreen} />
            <ListStack.Screen name="RoseDetail" component={RoseDetailScreen} />
        </ListStack.Navigator>
    );
}

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './src/screens/MapScreen';
// import { MultiBar, MultiBarToggle } from 'react-native-multibar';

const Tabs = createBottomTabNavigator();
const TabNavigator = () => {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name="Map" component={MapScreen} />
            <Tabs.Screen name="RoseListStack" component={listStack} />
        </Tabs.Navigator>
    )
};

import { createDrawerNavigator } from '@react-navigation/drawer';
import AccountScreen from './src/screens/AccountScreen';
import AddRoseScreen from './src/screens/AddRoseScreen';

const Drawer = createDrawerNavigator();
export const App = () => {
    return (
        <Drawer.Navigator initialRouteName="Main">
            <Drawer.Screen name="Account" component={AccountScreen} />
            <Drawer.Screen name="AddRose" component={AddRoseScreen} />
            <Drawer.Screen name="Main" component={TabNavigator} />
        </Drawer.Navigator >
    );
}

// const DrawerStack = createStackNavigator();
// export const App = () => {
//     return (
//         <DrawerStack.Navigator
//         >
//             <DrawerStack.Screen
//                 component={DrawerNavigator}
//                 name="App"
//                 options={({ navigation, route }) => ({
//                     headerTitle: null,
//                     // headerTransparent: true,
//                     // headerBackground: () => (
//                     //   <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
//                     // ),
//                     headerLeft: () => {
//                         return <View style={{ flexDirection: 'row' }}>
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     navigation.dispatch(DrawerActions.toggleDrawer());
//                                 }}>
//                                 <Text>Open</Text>
//                                 {/* <Image source={require('./assets/images/icons/drawer.png')} /> */}
//                             </TouchableOpacity>
//                         </View>
//                     }
//                 })}
//             />
//         </DrawerStack.Navigator>
//     );
// }


