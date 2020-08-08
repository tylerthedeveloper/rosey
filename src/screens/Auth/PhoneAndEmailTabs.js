import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import EmailSignupScreen from './EmailSignupScreen';
import PhoneSignupScreen from './PhoneSignupScreen';

const Tab = createMaterialTopTabNavigator();

export const PhoneAndEmailTabs = (props) => {
    return (
        // <React.Fragment>
        <Tab.Navigator >
            <Tab.Screen name="PhoneSignup" component={PhoneSignupScreen}
                options={{
                    title: 'Phone'
                }}
            />
            <Tab.Screen name="EmailSignup" component={EmailSignupScreen}
                options={{
                    title: 'Email'
                }}
            />
        </Tab.Navigator>
        // </React.Fragment>
    );
}
