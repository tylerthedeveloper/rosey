import React, { useEffect, useContext, useMemo, useReducer } from 'react';

import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
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

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MapScreen from './src/screens/MapScreen';
// import RoseListScreen from './src/screens/RoseListScreen';
// import RoseDetailScreen from './src/screens/RoseDetailScreen';
// import AddRoseScreen from './src/screens/AddRoseScreen';

// import { MultiBar, MultiBarToggle } from 'react-native-multibar';

// const Drawer = createDrawerNavigator();
// export const drawerNavigator = () => {
//     return (
//         <Drawer.Navigator initialRouteName="Account">
//             <Drawer.Screen name="Account" component={AccountScreen} />
//         </Drawer.Navigator>
//     );
// }


import { createDrawerNavigator } from '@react-navigation/drawer';
import AccountScreen from './src/screens/AccountScreen';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Account"
            options={{
                headerMode: () => null,
                HeaderTitle: "Rosey",
                hideStatusBar: true,
                title: "aa",
                Title: "ab",
            }}
        >
            <Drawer.Screen name="Account" component={AccountScreen}
                options={{
                    title: "_account"
                }}
            />
        </Drawer.Navigator >
    );
}

const DrawerStack = createStackNavigator();
export const App = () => {
    return (
        <DrawerStack.Navigator
            screenOptions={{
                // headerStyle: {
                //     backgroundColor: '#f4511e',
                // },
                // headerTintColor: '#fff',
                // headerTitleStyle: {
                //     fontWeight: 'bold',
                // },
            }}
            headerMode="none"
        >
            <DrawerStack.Screen
                options={{
                    headerMode: () => null,
                    HeaderTitle: "Rosey",
                    hideStatusBar: true,
                    // title: "aa",
                }}
                component={DrawerNavigator}
                name="App"
            />
        </DrawerStack.Navigator>
    );
}


