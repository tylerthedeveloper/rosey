import React, { useState, createRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Text } from 'react-native-elements';
import Spacer from './Spacer';
import { Logo, MyHeader, MyTextInput, MyButton } from '../paper-components';

const RoseForm = ({ headerText, errorMessage, onSubmit, submitButtonText, rowConfigList }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [nickName, setNickName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [placeName, setPlace] = useState('');
    const [coords, setCoords] = useState({ latitude: -369, longitude: -369 })
    const [picture, setPicture] = useState('');
    const placeMetAt = {
        placeName,
        coords,
    };

    const inputList = [
        { label: "Name", value: name, onChangeText: setName, autoCorrect: false, keyboardType: "default", returnKeyType: "next" },
        { label: "Nickname", value: nickName, onChangeText: setNickName, autoCorrect: false, keyboardType: "default", returnKeyType: "next" },
        { label: "Email", value: email, onChangeText: setEmail, autoCorrect: false, keyboardType: "email-address", returnKeyType: "next" },
        { label: "Phone Number", value: phoneNumber, onChangeText: setPhoneNumber, autoCorrect: false, keyboardType: "phone-pad", returnKeyType: "done", dataDetectorTypes: "phoneNumber" },
        { label: "Place Name", value: placeName, onChangeText: setPlace, autoCorrect: false, keyboardType: "default", returnKeyType: "next" },
    ];


    /* -------------------------------------------------------------------------- */
    /*                                Date Section                                */
    /* -------------------------------------------------------------------------- */
    const [dateMet, setDate] = useState(new Date(Date.now()));
    const [mode, setMode] = useState('date');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateMet;
        // setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    /* -------------------------------------------------------------------------- */

    return (
        <>
            {/* <ScrollView>
            {
                rows.map(({ title, subtitle, left, rightIcon, rightFunc }) => (
                    <Card.Actions style={styles.cardRow} key={title}>
                        <Card.Title
                            title={title}
                            subtitle={subtitle}
                            left={(props) => <Avatar.Icon icon={left}  {...props} />}
                            right={(props) => <IconButton icon={rightIcon} {...props} onPress={rightFunc} />}
                        />
                    </Card.Actions>
                ))
            }
        </ScrollView> */}

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
                onPress={() => console.log("Submitting somethhing")}
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

export default RoseForm;

