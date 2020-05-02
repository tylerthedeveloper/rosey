/* -------------------------------------------------------------------------- */
/*                               Drawer Section                               */
/* -------------------------------------------------------------------------- */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackNavigator } from './RootStack';
import DrawerContent from './drawerContent';

const Drawer = createDrawerNavigator();
export const App = () => {
    return (
        <Drawer.Navigator initialRouteName="Main" drawerType="slide" drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Main" component={RootStackNavigator} />
        </Drawer.Navigator >
    );
}
/* -------------------------------------------------------------------------- */

