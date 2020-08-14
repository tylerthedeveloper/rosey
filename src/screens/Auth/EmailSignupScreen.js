import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, ActivityIndicator, View, KeyboardAvoidingView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { theme } from '../../core/theme';
import { Background, MyButton, MyTextInput } from '../../paper-components/memo';
import firebase from 'firebase'
import { YellowBox } from 'react-native';
import { createnewFirebaseAccount } from '../../api/firebaseApi';
import { TextInput } from 'react-native-paper';

const EmailSignupScreen = ({ navigation }) => {

    YellowBox.ignoreWarnings([
        'Setting a timer',
        'Setting a timer for a long period of time'
    ]);

    const { state: { errorMessage, isApiLoading }, signup, clearErrorMessage } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    //  TODO: catch invalid email early?
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const _createUserWithEmailAndPassword = async () => {
        setIsLoading(true)
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (response) => {
                const { email, uid } = response.user;
                // await createnewFirebaseAccount({ uid, email });
            })
            .catch((error) => {
                setIsLoading(false);
                firebaseErrorHandler(error);
            });
    }

    const userSignin = async () => {
        if (email && password) {
            if (!isLoading) { setIsLoading(true) }
            try {
                const response = await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                firebaseErrorHandler(error);
            }
        }
    }

    // TODO: EXTRACT OUT TO FIREBASE UTILS?
    const firebaseErrorHandler = (error) => {
        switch (error.code) {
            case 'auth/user-not-found':
                alert('There is no user found with that email/password combination');
                break;
            case 'auth/invalid-email':
                alert('Please enter a valid email address.');
                break;
            case 'auth/email-already-in-use':
                alert('That email is already in use.');
                break;
            default:
                alert('There was an unexpected problem with signup.');
                break;
        }
        setIsLoading(false);
        console.log('Error signing user up with email and password! '
            + error.code + ': ' + error.message);
    }

    const isDisabled = (isLoading || email.length === 0 || password.length < 6)

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={styles.container}>
                <MyTextInput label="Email"
                    value={email}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    autoCorrect={false}
                    returnKeyType={"next"}

                />
                <MyTextInput label="Password"
                    value={password}
                    // onSubmitEditing={() => (!isDisabled) ? userSignin() : null}
                    onChangeText={setPassword}
                    autoCorrect={false}
                    secureTextEntry

                />
                {(errorMessage) ? <Text style={styles.errorMessage}> {errorMessage} </Text> : null}
                {(password.length < 6)
                    ? <Text style={styles.errorMessage}> Password must be at least 6 characters </Text>
                    : null
                }
                {(isLoading) && <ActivityIndicator animating={true} size={'large'} color={theme.colors.primary} />}
                <MyButton
                    mode="contained"
                    onPress={() => userSignin()}
                    disabled={isDisabled}
                >
                    Login
                </MyButton>
                <MyButton
                    mode="outlined"
                    onPress={() => _createUserWithEmailAndPassword()}
                    disabled={isDisabled}
                >
                    Signup
                </MyButton>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 20,
        alignItems: 'center'
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    errorMessage: {
        color: 'red',
        margin: 10
    },
});

export default EmailSignupScreen;
