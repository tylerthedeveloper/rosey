import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { Logo, MyButton, MyHeader, MyTextInput } from '../../paper-components/memo';
import { ActivityIndicator, Colors } from 'react-native-paper';
import firebase from '../../../config/firebase'
import { theme } from '../../core/theme';

const PhoneConfirmationScreen = ({ navigation }) => {

    const [code, setCode] = useState();

    return (
        <>
            <MyHeader>
                Enter Code
            </MyHeader>
            <View style={styles.buttons}>
                <MyTextInput
                    label="Code"
                    autoCapitalize="none"
                    autoCompleteType="email"
                    onChangeText={setCode}
                    autoCorrect={false}
                    returnKeyType={"next"}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Didnt get a code?? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('PhoneConfirmation')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </>);
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
});

export default PhoneConfirmationScreen;
