import React, { useEffect, useContext, useMemo, useReducer } from 'react';
import { FlatList, StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native';
import { MultiBar, MultiBarToggle } from 'react-native-multibar';

/* -------------------------------------------------------------------------- */
/*                                Auth Section                                */
/* -------------------------------------------------------------------------- */
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';

const AuthStack = createStackNavigator();
export const authStackScreen = () => {
    return (
        <AuthStack.Navigator headerMode="none">
            <AuthStack.Screen name="Splash" component={SplashScreen} />
            <AuthStack.Screen name="Signup" component={SignupScreen} />
            <AuthStack.Screen name="Signin" component={SigninScreen} />
        </AuthStack.Navigator>
    );
}
/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */
/*                                List Section                                */
/* -------------------------------------------------------------------------- */
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
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                                 Tab Section                                */
/* -------------------------------------------------------------------------- */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './src/screens/MapScreen';
import { FontAwesome } from '@expo/vector-icons';

const Tabs = createBottomTabNavigator();
const TabNavigator = () => {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name="Map" component={MapScreen}
                options={{
                    tabBarLabel: 'Map',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome
                            name="map"
                            size={24}
                            style={{ marginBottom: -15 }}
                        />)
                }}
            />
            <Tabs.Screen name="RoseListStack" component={listStack}
                options={{
                    tabBarLabel: 'Roses',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome
                            name="list"
                            size={24}
                        />)
                }} />
        </Tabs.Navigator>
    )
};

// import { MultiBar, MultiBarToggle } from 'react-native-multibar';
// const TabNavigator = () => {
//     const Tabs = useMemo(() => createBottomTabNavigator(), []);

//     return (
//         <Tabs.Navigator
//             tabBar={MultiBar}
//             tabBarOptions={{
//                 showLabel: false,
//                 activeTintColor: '#F8F8F8',
//                 inactiveTintColor: '#586589',
//                 style: {
//                     backgroundColor: '#171F33'
//                 },
//                 tabStyle: {}
//             }}
//         >
//             <Tabs.Screen
//                 name="Map"
//                 component={MapScreen}
//                 options={{
//                     tabBarIcon: ({ tintColor }) => (
//                         <Icon
//                             name="bookmark"
//                             color={tintColor}
//                             size={24}
//                         />
//                     )
//                 }}
//             />
//             <Tabs.Screen
//                 name="MultiBar"
//                 component={() => <View />}
//                 options={({ navigation, route }) => ({
//                     tabBarIcon: () => (
//                         <MultiBarToggle
//                             navigation={navigation}
//                             route={route}
//                             actionSize={30}
//                             routes={[
//                                 {
//                                     routeName: Routes.OtherScreen,
//                                     color: '#FF8360',
//                                     icon: (
//                                         <Icon
//                                             name="rocket"
//                                             color="#333333"
//                                             size={15}
//                                         />
//                                     )
//                                 },
//                                 {
//                                     routeName: Routes.OtherScreen,
//                                     color: '#E8E288',
//                                     icon: (
//                                         <Icon
//                                             name="dashboard"
//                                             color="#333333"
//                                             size={15}
//                                         />
//                                     )
//                                 },
//                                 {
//                                     routeName: Routes.OtherScreen,
//                                     color: '#7DCE82',
//                                     icon: (
//                                         <Icon
//                                             name="gears"
//                                             color="#333333"
//                                             size={15}
//                                         />
//                                     )
//                                 }
//                             ]}
//                             icon={(
//                                 <Icon
//                                     name="plus"
//                                     color="#FFFFFF"
//                                     size={24}
//                                 />
//                             )}
//                         />
//                     )
//                 })}
//             />
//             <Tabs.Screen
//                 name="RoseListStack"
//                 component={listStack}
//                 options={{
//                     tabBarIcon: ({ tintColor }) => (
//                         <Icon
//                             name="lock"
//                             color={tintColor}
//                             size={24}
//                         />
//                     )
//                 }}
//             />
//         </Tabs.Navigator>
//     );
// };




/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */
/*                               Drawer Section                               */
/* -------------------------------------------------------------------------- */
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from './src/screens/ProfileScreen';
import AddRoseScreen from './src/screens/AddRoseScreen';

const Drawer = createDrawerNavigator();
export const App = () => {
    return (
        <Drawer.Navigator initialRouteName="Profile">
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="AddRose" component={AddRoseScreen}
                options={{
                    title: "Add new Rose"
                }}
            />
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
                                // {/* <Image source={require('./assets/images/icons/drawer.png')} /> */}
//                             </TouchableOpacity>
//                         </View>
//                     }
//                 })}
//             />
//         </DrawerStack.Navigator>
//     );
// }
/* -------------------------------------------------------------------------- */


