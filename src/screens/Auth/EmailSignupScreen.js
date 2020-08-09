import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, ActivityIndicator, View, KeyboardAvoidingView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { theme } from '../../core/theme';
import { Background, MyButton, MyTextInput } from '../../paper-components/memo';
import firebase from 'firebase'
import { YellowBox } from 'react-native';

const EmailSignupScreen = ({ navigation }) => {

    YellowBox.ignoreWarnings([
        'Setting a timer',
        'Setting a timer for a long period of time'
    ]);

    const { state: { errorMessage, isApiLoading }, signup, clearErrorMessage, signinWithFirebase } = useContext(AuthContext);

    //  TODO: catch invalid email early?
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const _createUserWithEmailAndPassword = async () => {
        setIsLoading(true)
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (response) => {
                const { email, uid } = response.user;
                await firebase
                    .firestore()
                    .collection('users')
                    .doc(uid)
                    .set({ email: email, uid: uid })
                    .then(() => signinWithFirebase({ email, uid }))
            })
            // .then(() => userSignin())
            .catch((error) => {
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('A user with that email does not exist. Try signing up.');
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
                if (response) {
                    const { email, uid } = response.user;
                    signinWithFirebase({ email, uid });
                }
            } catch (error) {
                // if (isLoading) { setIsLoading(false) }
                setIsLoading(false);
                console.log(error.message)
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('That email/password combo does not exist. Try again or signing up.');
                        break;
                    case 'auth/invalid-email':
                        alert('Please enter a valid email address.');
                        break;
                }
            }
        }
    }

    const isDisabled = (isLoading || email.length === 0 || password.length < 6)

    // const passRef = React.createRef(null);

    return (
        // <Background>
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
                // onBlur={() => passRef.current.focus()}
                // onKeyUp={() => passRef.current.focus()}
                // onSubmitEditing={() => passRef.current._root.focus()}

                />
                <MyTextInput label="Password"
                    value={password}
                    onChangeText={setPassword}
                    autoCorrect={false}
                    secureTextEntry
                // ref={input => { passRef.current = input; }}
                // ref={passRef}

                />
                {(errorMessage) ? <Text style={styles.errorMessage}> {errorMessage} </Text> : null}
                {(password.length < 6)
                    ? <Text style={styles.errorMessage}> Password must be at least 6 characters </Text>
                    : null
                }
                {(isLoading) && <ActivityIndicator animating={true} size={'large'} />}
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
        // </Background>
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
