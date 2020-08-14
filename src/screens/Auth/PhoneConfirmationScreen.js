import OTPInputView from '@twotalltotems/react-native-otp-input';
import * as firebase from "firebase";
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { theme } from '../../core/theme';
import { MyButton, MyHeader } from '../../paper-components/memo';
import { ActivityIndicator } from 'react-native-paper';

// FIXME: do i need signinWithFirebase?

const PhoneConfirmationScreen = ({ navigation, route }) => {

    const { verificationId } = route.params;

    const [verificationCode, setVerificationCode] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // FIXME: CHECK IF account already exists?
    const submitValidationCode = async (code) => {
        if (verificationCode.length === 6) {
            setIsLoading(true);
            try {
                const credential = firebase.auth.PhoneAuthProvider.credential(
                    verificationId,
                    verificationCode
                );
                // console.log('credential', credential);
                await firebase.auth().signInWithCredential(credential)
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                firebaseErrorHandler(error);
            }
        };
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
            case 'auth/code-expired':
                alert('That code has expired, please resend below');
                break;
            default:
                alert('There was an unexpected problem with signup.');
                break;
        }
        setIsLoading(false);
        console.log('Error signing user up with ' + error.code + ': ' + error.message);
    }

    const resendCode = () => { }

    const isDisabled = (isLoading || verificationCode.length === 0 || verificationId.length < 6)

    return (
        <View style={styles.container}>
            <MyHeader>
                Enter Code
            </MyHeader>
            <View>
                <OTPInputView
                    style={{ width: '80%', height: 150 }}
                    pinCount={6}
                    //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    // code={verificationId} 
                    onCodeChanged={setVerificationCode}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.codeInputFieldStyle}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={(code) => submitValidationCode(verificationCode)}
                // onCodeFilled={(code) => (verificationCode.length === 6) ? submitValidationCode(verificationCode) : null}
                />
                {(message !== '') && <Text style={styles.label}></Text>}
            </View>
            {(isLoading) && <ActivityIndicator animating={true} size={'large'} color={theme.colors.primary} />}
            <MyButton
                mode="contained"
                onPress={submitValidationCode}
                disabled={isDisabled}
            >
                Continue
            </MyButton>
            {/* <MyButton
                mode="contained"
                onPress={resendCode}
                disabled={isDisabled}
            >
                Resend code
            </MyButton> */}
        </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 10,
        alignItems: 'center',
        // width: '80%'
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    codeInputFieldStyle: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: theme.colors.secondary
    },
    underlineStyleHighLighted: {
        borderColor: theme.colors.secondary
    }
});

export default PhoneConfirmationScreen;
