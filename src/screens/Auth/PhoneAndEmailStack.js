import React from 'react';
/* -------------------------------------------------------------------------- */
/*                                List Section                                */
/* -------------------------------------------------------------------------- */
import { createStackNavigator } from '@react-navigation/stack';
import PhoneConfirmationScreen from './PhoneConfirmationScreen';
import { PhoneAndEmailTabs } from './PhoneAndEmailTabs';

const AuthStack = createStackNavigator();
const PhoneAndEmailStack = ({ navigation }) => {
    return (
        <AuthStack.Navigator screenOptions={{ headerTitle: 'Login or Signup'}}>
            <AuthStack.Screen name="PhoneAndEmailTabs" component={PhoneAndEmailTabs} />
            <AuthStack.Screen name="PhoneConfirmation" component={PhoneConfirmationScreen} options={{ headerTitle: '' }} />
        </AuthStack.Navigator>
    );
}
export default PhoneAndEmailStack;
/* -------------------------------------------------------------------------- */
