import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';
import { Logo, MyButton, MyHeader } from '../paper-components';
import Background from '../paper-components/Background';

const SplashScreen = ({ navigation }) => {

    return (
        <Background style={styles.container}>
            <Logo />
            <MyHeader> Welcome to Rosey </MyHeader>
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
        </Background>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'space-evenly'
    },
    // link: {
    //     fontWeight: 'bold',
    //     color: theme.colors.primary,
    // },
    text: {
        fontSize: 16,
        lineHeight: 26,
        color: theme.colors.secondary,
        textAlign: 'center',
        marginBottom: 14,
    }
});

export default SplashScreen;