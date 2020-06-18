import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Logo, MyButton, MyHeader, MyTextInput } from '../../paper-components/memo';
import { ActivityIndicator, Colors } from 'react-native-paper';

const AuthForm = ({ headerText, errorMessage, isApiLoading, onSubmit, submitButtonText, passwordError }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Logo />
            <MyHeader>
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
            <MyTextInput label="Password"
                value={password}
                onChangeText={setPassword}
                autoCorrect={false}
                secureTextEntry
            />
            {(errorMessage) ? <Text style={styles.errorMessage}> {errorMessage} </Text> : null}
            {/* {(password.length < 6)
                ? <Text style={styles.errorMessage}> {passwordError} </Text>
                : null
            } */}
            {(isApiLoading) && <ActivityIndicator animating={true} size={'large'} />}
            <View style={styles.buttons}>
                {
                    // TODO: PWD?
                    (headerText === 'Register')
                        ? <MyButton
                            mode="contained"
                            onPress={() => onSubmit({ name, email, password })}
                            // disabled={password.length < 6}
                            disabled={name.length === 0 || email.length === 0 ||
                                password.length === 0 || isApiLoading}
                        >
                            {submitButtonText}
                        </MyButton>
                        : <MyButton
                            mode="contained"
                            onPress={() => onSubmit({ email, password })}
                            // disabled={password.length < 6}
                            disabled={email.length === 0 || password.length === 0 || isApiLoading}
                        >
                            {submitButtonText}
                        </MyButton>
                }
            </View>
        </>);
}

const styles = StyleSheet.create({
    errorMessage: {
        color: 'red',
        margin: 10
    }
});

export default AuthForm;

