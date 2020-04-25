import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import AuthForm from '../components/AuthForm';
import Spacer from '../components/Spacer';
import { AuthContext } from '../context/AuthContext';
import Background from '../paper-components/Background';
import { theme } from '../core/theme';

const SigninScreen = ({ navigation }) => {

    const { state: { errorMessage }, signin, clearErrorMessage } = useContext(AuthContext);
    useEffect(() => navigation.addListener('focus', () => {
        clearErrorMessage();
    }), []);

    return (
        <Background>
            <AuthForm
                headerText="Sign in"
                submitButtonText="Sign In"
                errorMessage={errorMessage}
                onSubmit={signin}
                passwordError={"Password length must be greater than 6 characters"}
            />
            <View style={styles.row}>
                <Text style={styles.label}>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
            <Spacer />
            {/* TODO: Remove */}
            <Button
                title="Mock sign in "
                onPress={() => navigation.navigate('mainFlow')}
            />
        </Background>
    )
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     justifyContent: 'center'
    // },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

export default SigninScreen;