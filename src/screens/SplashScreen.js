import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { theme } from '../core/theme';
import { Logo, MyButton, MyHeader } from '../paper-components';
import Background from '../paper-components/Background';
import { privacyUrl } from '../api/landingApi';

const SplashScreen = ({ navigation }) => {

    return (
        <Background style={styles.container}>
            <Logo />
            <MyHeader> Welcome to Rozy </MyHeader>
            <Text style={styles.text}> Never forget a connection, no matter when, no matter where</Text>
            <MyButton
                mode="contained"
                onPress={() => navigation.navigate('Signup')}
            >
                Register
            </MyButton>
            <MyButton
                mode="outlined"
                onPress={() => navigation.navigate('Signin')}
            >
                Login
            </MyButton>
            <TouchableOpacity
                onPress={() => Linking.openURL(privacyUrl).catch((err) => console.error('An error occurred', err))}
            >
                <Text style={styles.link}>
                    Privacy policy
                </Text>
            </TouchableOpacity>
        </Background >
    )
}

const styles = StyleSheet.create({
    container: {
    },
    text: {
        lineHeight: 26,
        textAlign: 'center',
        marginBottom: 14,
    },
    link: {
        fontWeight: 'bold',
        marginTop: 10,
        color: theme.colors.primary,
    },
});

export default SplashScreen;