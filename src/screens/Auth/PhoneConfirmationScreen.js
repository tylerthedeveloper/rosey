import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { Logo, MyButton, MyHeader, MyTextInput } from '../../paper-components/memo';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { theme } from '../../core/theme';
import firebase from 'firebase'
import Clipboard from "@react-native-community/clipboard";
import OTPInputView from '@twotalltotems/react-native-otp-input'

const PhoneConfirmationScreen = ({ navigation, route }) => {

    const { verificationToken } = route.params;
    console.log(verificationToken)

    const [code, setCode] = useState();

    const submitValidationCode = async () => {
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationToken,
                verificationCode
            );
            await firebase.auth().signInWithCredential(credential)
                .then(res => console.log(res));
        } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: "red" });
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
                    // code={verificationToken} 
                    onCodeChanged={setCode}
                    autoFocusOnLoad
                    // codeInputFieldStyle={styles.underlineStyleBase}
                    // codeInputHighlightStyle={styles.underlineStyleHighLightecd}
                    onCodeFilled={(code => {
                        console.log(`Code is ${code}, you are good to go!`)
                        // submitValidationCode();
                    })}
                />
            </View>
            <View style={styles.row}>
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
});

export default PhoneConfirmationScreen;
