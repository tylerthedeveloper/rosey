import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AuthForm from '../components/AuthForm';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';

const SigninScreen = ({ navigation }) => {

    const { state: { errorMessage }, signin, clearErrorMessage } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <NavigationEvents onWillFocus={() => clearErrorMessage()} />
            <AuthForm
                headerText="Sign in for Rosey"
                submitButtonText="Sign In"
                errorMessage={errorMessage}
                onSubmit={signin}
            />
            <Button
                title="Not yet registed, go to signup"
                onPress={() => navigation.navigate('Signup')}
            />
            <Spacer />
            <Button
                title="Mock sign in "
                onPress={() => navigation.navigate('drawerFlow')}
            />
        </View>
    )
}

SigninScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default SigninScreen;