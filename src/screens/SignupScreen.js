import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthForm } from '../components';
import { AuthContext } from '../context/AuthContext';
import { theme } from '../core/theme';
import Background from '../paper-components/Background';

const SignupScreen = ({ navigation }) => {

    const { state: { errorMessage }, signup, clearErrorMessage } = useContext(AuthContext);
    useEffect(() => navigation.addListener('focus', clearErrorMessage), []);

    return (
        <Background>
            <AuthForm
                headerText="Register"
                submitButtonText="Sign up"
                errorMessage={errorMessage}
                onSubmit={signup}
                passwordError={"Password length must be greater than 6 characters"}
            />
            <View style={styles.row}>
                <Text style={styles.label}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
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

export default SignupScreen;