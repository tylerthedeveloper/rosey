import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { theme } from '../../core/theme';
import { AuthForm } from '../../paper-components/view';
import { Background } from '../../paper-components/memo';

const PhoneSignupScreen = ({ navigation }) => {

    const { state: { errorMessage, isApiLoading }, signup, clearErrorMessage } = useContext(AuthContext);
    useEffect(() => navigation.addListener('focus', clearErrorMessage), []);

    return (
        <Background>
            <AuthForm
                headerText="Enter your number"
                submitButtonText="Send Code"
                errorMessage={errorMessage}
                onSubmit={signup}
                isApiLoading={isApiLoading}
            />
            <View style={styles.row}>
                <Text style={styles.label}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.push('PhoneConfirmation')}>
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

export default PhoneSignupScreen;
