import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {SigninScreen, SignupScreen, SplashScreen} from '../screens';

/* -------------------------------------------------------------------------- */
/*                                Auth Section                                */
/* -------------------------------------------------------------------------- */
const AuthStack = createStackNavigator();
export const Auth = () => {
    return (
        <AuthStack.Navigator headerMode="none">
            <AuthStack.Screen name="Splash" component={SplashScreen} />
            <AuthStack.Screen name="Signup" component={SignupScreen} />
            <AuthStack.Screen name="Signin" component={SigninScreen} />
        </AuthStack.Navigator>
    );
}
/* -------------------------------------------------------------------------- */
