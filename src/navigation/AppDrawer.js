/* -------------------------------------------------------------------------- */
/*                               Drawer Section                               */
/* -------------------------------------------------------------------------- */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackNavigator } from './RootStack';
// TODO:
import ProfileScreen from '../screens/ProfileScreen';
const Drawer = createDrawerNavigator();
export const App = () => {
    return (
        <Drawer.Navigator initialRouteName="Main" drawerType="slide" >
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Main" component={RootStackNavigator} />
        </Drawer.Navigator >
    );
}
/* -------------------------------------------------------------------------- */

