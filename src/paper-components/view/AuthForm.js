import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { theme } from '../../core/theme';
import { MyButton, MyTextInput } from '../../paper-components/memo';

const AuthForm = ({ headerText, errorMessage, isApiLoading, onSubmit, submitButtonText, passwordError, navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');

    let Body = '';
    switch (headerText) {
        case 'Enter your email':
            Body =
                (<>
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
                    <MyButton
                        mode="contained"
                        onPress={() => onSubmit({ email, password })}
                    >
                        {submitButtonText}
                    </MyButton>
                </>);
            break;
        case 'Enter your number':
            Body =
                (<>
                    <MyButton
                        mode="contained"
                        style={{ width: '10%' }}
                        onPress={() => onSubmit({ email, password })}
                    >
                        {'+1'}
                    </MyButton>
                    <MyTextInput label="Number"
                        value={email}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        onChangeText={setNumber}
                        autoCorrect={false}
                        returnKeyType={"done"}
                    />
                    <MyButton
                        mode="contained"
                        onPress={() => onSubmit({ number })}
                    >
                        {submitButtonText}
                    </MyButton>
                </>)
            break;
        // default:
    }

    return (
        <>
            {/* <Logo /> */}
            {/* <MyHeader>
                {headerText}
            </MyHeader> */}
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
            {Body}
            {/* {(errorMessage) ? <Text style={styles.errorMessage}> {errorMessage} </Text> : null} */}
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
            {/* <View style={styles.row}>
                <Text style={styles.label}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('PhoneConfirmation')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View> */}
        </>);
}

const styles = StyleSheet.create({
    errorMessage: {
        color: 'red',
        margin: 10
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

export default AuthForm;

