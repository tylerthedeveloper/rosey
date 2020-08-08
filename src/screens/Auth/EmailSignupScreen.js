import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { theme } from '../../core/theme';
import { Background, MyButton, MyTextInput } from '../../paper-components/memo';
import firebase from 'firebase'

const EmailSignupScreen = ({ navigation }) => {

    const { state: { errorMessage, isApiLoading }, signup, clearErrorMessage, signinWithFirebase } = useContext(AuthContext);
    // useEffect(() => navigation.addListener('focus', clearErrorMessage), []);

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [user, setUser] = useState({});

    //  TODO: catch invalid email early?

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
            })
            .then(() => userSignin())
            .catch((error) => {
                console.log('Error signing user up with email and password! '
                    + error.code + ': ' + error.message);
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('A user with that email does not exist. Try signing Up');
                        break;
                    case 'auth/invalid-email':
                        alert('Please enter a valid email address');
                        break;
                }
            });
    }

    const userSignin = async () => {
        if (email && password) {
            if (!isLoading) { setIsLoading(true) }
            try {
                const response = await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password);
                if (response) {
                    const { email, uid } = response.user;
                    setIsLoading(false);
                    signinWithFirebase({ email, uid });
                }
            } catch (error) {
                // this.setState({ isLoading: false });
                setIsLoading(false);
                console.log(error.message)
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('That email/password combo does not exist. Try again or signing Up');
                        break;
                    case 'auth/invalid-email':
                        alert('Please enter a valid email address');
                        break;
                }
            }
        }
    }

    const isDisabled = (isLoading || email.length === 0 || password.length < 6)

    return (
        <Background>
            <>
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
                    onChangeText={setPassword}
                    autoCorrect={false}
                    secureTextEntry
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
            </>
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
    errorMessage: {
        color: 'red',
        margin: 10
    },
});

export default EmailSignupScreen;
