import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText, passwordError }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // console.log('errorMessage', errorMessage)
    let secondTextInput;

    return (
        <>
            <Spacer>
                <Spacer>
                    <Text h3> {headerText} </Text>
                </Spacer>
                <Spacer>
                    <Input label="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCorrect={false}
                        onSubmitEditing={() => { secondTextInput.focus(); }}
                        returnKeyType = { "next" }
                    />
                </Spacer>
                <Spacer>
                    <Input label="Password"
                        value={password}
                        onChangeText={setPassword}
                        autoCorrect={false}
                        secureTextEntry
                        ref={(input) => { secondTextInput = input; }}
                    />
                </Spacer>
                {(errorMessage) ? <Text style={styles.errorMessage}> {errorMessage} </Text> : null}
                {(password.length < 6)
                    ? <Text style={styles.errorMessage}> {passwordError} </Text>
                    : null
                }
                <Spacer>
                    <Button
                        title={submitButtonText}
                        onPress={() => onSubmit({ email, password })}
                        disabled={password.length < 6}
                    />
                </Spacer>
            </Spacer>
        </>);
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // marginBottom: 200
    },
    errorMessage: {
        color: 'red',
        margin: 10
    }
});

export default AuthForm;

