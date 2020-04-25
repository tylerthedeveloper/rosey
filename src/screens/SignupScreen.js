import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Button, KeyboardAvoidingView } from 'react-native';
import AuthForm from '../components/AuthForm';
// import Spacer from '../components/Spacer';
import { AuthContext } from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {

    const { state: { errorMessage }, signup, clearErrorMessage } = useContext(AuthContext);
    useEffect(() => navigation.addListener('focus', clearErrorMessage), []);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <AuthForm
                headerText="Sign up for Rosey"
                submitButtonText="Sign up"
                errorMessage={errorMessage}
                onSubmit={signup}
                passwordError={"Password length must be greater than 6 characters"}
            />
            <Button
                title="Already registed, go to signin"
                onPress={() => navigation.navigate('Signin')}
            />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default SignupScreen;