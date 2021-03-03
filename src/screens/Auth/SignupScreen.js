import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { theme } from '../../core/theme';
import { AuthForm } from '../../paper-components/view';
import { Background } from '../../paper-components/memo';

const SignupScreen = ({ navigation }) => {

    const { state: { errorMessage, isApiLoading }, signup, clearErrorMessage } = useContext(AuthContext);
    useEffect(() => navigation.addListener('focus', clearErrorMessage), []);

    return (
        <Background>
            <AuthForm
                headerText="Register"
                submitButtonText="Sign up"
                errorMessage={errorMessage}
                onSubmit={signup}
                passwordError={"Password length must be greater than 6 characters"}
                isApiLoading={isApiLoading}
            />
            <View style={styles.row}>
                <Text style={styles.label}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
            {(errorMessage) ? <Text style={styles.errorMessage}> {errorMessage} </Text> : null}
            {/* {(password.length < 6)
                ? <Text style={styles.errorMessage}> {passwordError} </Text>
                : null
            } */}
            {(isApiLoading) && <ActivityIndicator animating={true} size={'large'} />}
        </Background>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    bg: {
        flex: 1,
        width: '100%',
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

export default SignupScreen