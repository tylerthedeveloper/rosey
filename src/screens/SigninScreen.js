import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AuthForm from '../components/AuthForm';
import Spacer from '../components/Spacer';
import { AuthContext } from '../context/AuthContext';

// import { NavigationActions } from '@react-navigation/compat';

const SigninScreen = ({ navigation }) => {

    const { state: { errorMessage }, signin, clearErrorMessage } = useContext(AuthContext);
    useEffect(() => navigation.addListener('focus', () => {
        clearErrorMessage();
    }), []);
    return (
        <View style={styles.container}>
            <AuthForm
                headerText="Sign in for Rosey"
                submitButtonText="Sign In"
                errorMessage={errorMessage}
                onSubmit={signin}
                passwordError={"Password length must be greater than 6 characters"}
            />
            <Button
                title="Not yet registed, go to signup"
                onPress={() => navigation.navigate('Signup')}
            />
            <Spacer />
            {/* TODO: Remove */}
            <Button
                title="Mock sign in "
                onPress={() => navigation.navigate('mainFlow')}
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