import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Text } from 'react-native-elements';
import Spacer from './Spacer';
import MyButton from '../paper-components/MyButton';
import MyTextInput from '../paper-components/MyTextInput';
import MyHeader from '../paper-components/MyHeader';
import Logo from '../paper-components/Logo';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText, passwordError }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let secondTextInput;

    return (
        <>
            <Logo />

            <MyHeader >
                {headerText}
            </MyHeader>
            <MyTextInput label="Email"
                value={email}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                onChangeText={setEmail}
                autoCorrect={false}
                onSubmitEditing={() => { secondTextInput.focus(); }}
                returnKeyType={"next"}
            />
            <MyTextInput label="Password"
                value={password}
                onChangeText={setPassword}
                autoCorrect={false}
                secureTextEntry
                ref={(input) => { secondTextInput = input; }}
            />
            {(errorMessage) ? <Text style={styles.errorMessage}> {errorMessage} </Text> : null}
            {(password.length < 6)
                ? <Text style={styles.errorMessage}> {passwordError} </Text>
                : null
            }
            <MyButton
                mode="contained"
                onPress={() => onSubmit({ email, password })}
                disabled={password.length < 6}
            >
                {submitButtonText}
            </MyButton>
            <Spacer />
        </>);
}

const styles = StyleSheet.create({
    container: {
        // padding: 15,
        // width: '100%',
        // maxWidth: 340,
        // alignSelf: 'center',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    errorMessage: {
        color: 'red',
        margin: 10
    }
});

export default AuthForm;

