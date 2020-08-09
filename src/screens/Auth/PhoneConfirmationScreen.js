import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { Logo, MyButton, MyHeader, MyTextInput } from '../../paper-components/memo';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { theme } from '../../core/theme';
import * as firebase from "firebase";
import Clipboard from "@react-native-community/clipboard";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { createnewFirebaseAccount } from '../../api/firebaseApi';

// FIXME: do i need signinWithFirebase?

const PhoneConfirmationScreen = ({ navigation, route }) => {

    const { verificationId } = route.params;
    console.log('verificationId', verificationId)

    const [verificationCode, setVerificationCode] = useState('');
    const [message, setMessage] = useState('');

    const submitValidationCode = async (code) => {
        try {
            console.log(verificationCode)
            if (verificationCode.length === 6) {
                const credential = firebase.auth.PhoneAuthProvider.credential(
                    verificationId,
                    verificationCode
                );
                console.log('credential', credential);
                await firebase.auth().signInWithCredential(credential)
                    .then(async (res) => {
                        const { phoneNumber, uid } = res.user;
                        // await firebase
                        //     .firestore()
                        //     .collection('users')
                        //     .doc(uid)
                        //     .set({ phoneNumber, uid })
                        await createnewFirebaseAccount({uid, phoneNumber})
                            .then(() => signinWithFirebase({ email, uid, phoneNumber }))
                    });
            }
        } catch (err) {
            console.log(err.message)
            setMessage({ text: `Error: ${err.message}`, color: "red" });
        }
    };

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
                    onCodeFilled={(code => {
                        if (code.length === 6) {
                            submitValidationCode(code);
                        }
                    })}
                />
                {(message !== '') && <Text style={styles.label}></Text>}
            </View>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => submitValidationCode()}>
                    <Text style={styles.link}>Submit</Text>
                </TouchableOpacity>
                <Text style={styles.label}>Didnt get a code?? </Text>
                <TouchableOpacity onPress={() => null}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
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
