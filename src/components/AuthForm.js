import React, { useState, createRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Text } from 'react-native-elements';
import Spacer from './Spacer';
import { Logo, MyHeader, MyTextInput, MyButton } from '../paper-components';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText, passwordError }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [shouldBeDisabled, setShouldBeDisabled] = useState(email.length === 0 || name.length === 0);

    return (
        <>
            <Logo />

            <MyHeader >
                {headerText}
            </MyHeader>
            {
                (headerText === 'Register')
                    ? <MyTextInput label="Name"
                        value={name}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        onChangeText={setName}
                        autoCorrect={false}
                        // onSubmitEditing={() => { secondTextInput.focus(); }}
                        returnKeyType={"next"}
                    /> : null
            }

            <MyTextInput label="Email"
                value={email}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                onChangeText={setEmail}
                autoCorrect={false}
                // onSubmitEditing={() => { secondTextInput.focus(); }}
                returnKeyType={"next"}
            />
            {/* <MyTextInput label="Password"
                value={password}
                onChangeText={setPassword}
                autoCorrect={false}
                secureTextEntry
            /> */}
            {(errorMessage) ? <Text style={styles.errorMessage}> {errorMessage} </Text> : null}
            {/* {(password.length < 6)
                ? <Text style={styles.errorMessage}> {passwordError} </Text>
                : null
            } */}
            {
                // TODO: PWD?
                (headerText === 'Register')
                    ? <MyButton
                        mode="contained"
                        onPress={() => onSubmit({ name, email })}
                        // disabled={password.length < 6}
                        disabled={name.length === 0 || email.length === 0}
                    >
                        {submitButtonText}
                    </MyButton>
                    : <MyButton
                        mode="contained"
                        onPress={() => onSubmit({ email })}
                        // disabled={password.length < 6}
                        disabled={email.length === 0}
                    >
                        {submitButtonText}
                    </MyButton>
            }
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

