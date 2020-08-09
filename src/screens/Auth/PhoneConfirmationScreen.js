import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { Logo, MyButton, MyHeader, MyTextInput } from '../../paper-components/memo';
import { ActivityIndicator, Colors } from 'react-native-paper';
import firebase from '../../../config/firebase'
import { theme } from '../../core/theme';
import Clipboard from "@react-native-community/clipboard";
import OTPInputView from '@twotalltotems/react-native-otp-input'

const PhoneConfirmationScreen = ({ navigation, route }) => {

    const { verificationToken } = route.params;
    console.log(verificationToken)

    const [code, setCode] = useState();

    return (
        <View style={styles.container}>
            <MyHeader>
                Enter Code
            </MyHeader>
            <View>
                <OTPInputView
                    style={{ width: '80%', height: 200 }}
                    pinCount={4}
                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    // onCodeChanged = {code => { this.setState({code})}}
                    autoFocusOnLoad
                    // codeInputFieldStyle={styles.underlineStyleBase}
                    // codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={(code => {
                        console.log(`Code is ${code}, you are good to go!`)
                    })}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Didnt get a code?? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('PhoneConfirmation')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // width: '80%'
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

export default PhoneConfirmationScreen;
