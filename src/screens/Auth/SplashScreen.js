import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { privacyUrl } from '../../api/landingApi';
import { theme } from '../../core/theme';
import { Background, Logo, MyButton, MyHeader } from '../../paper-components/memo';

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
                <Text textBreak="simple" style={styles.link}>
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
        marginTop: 10,
        color: theme.colors.primary,
        fontWeight: 'bold',
        fontFamily: 'System'
    },
});

export default SplashScreen;