import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Text, } from 'react-native-elements';
import Spacer from './Spacer';
import DateTimePicker from '@react-native-community/datetimepicker';

const RoseForm = ({ headerText, submitButtonText, onSubmit, onCancel }) => {

    const [name, setName] = useState('');
    const [nickName, setNickName] = useState('');
    const [email, setEmail] = useState('');
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
    // console.log(dateMet.getTime());
    /* -------------------------------------------------------------------------- */

    return (
        <ScrollView>
            <KeyboardAvoidingView>
                <Spacer>
                    <Spacer>
                        <Text h3 style={styles.headerText}> {headerText} </Text>
                    </Spacer>
                    {
                        inputList.map(({ label, value, onChangeText, autoCorrect, keyboardType, returnKeyType, textContentType, key }, index) => {
                            return (
                                <View key={index.toString()} >
                                    <Input label={label}
                                        value={value}
                                        onChangeText={onChangeText}
                                        autoCorrect={autoCorrect}
                                        keyboardType={keyboardType || "default"}
                                        returnKeyType={returnKeyType}
                                        style={styles.inputStyle}
                                        textContentType={textContentType}
                                    />
                                    <Spacer />
                                </View>
                            )
                        })
                    }
                    <Spacer>
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={dateMet}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    </Spacer>
                    <Spacer>
                        <Input label="Picture"
                            value={picture}
                            onChangeText={setPicture}
                            autoCorrect={false}
                        />
                    </Spacer>
                    <Spacer>
                        <Button
                            title={submitButtonText}
                            onPress={() => onSubmit({ name, email, picture, placeMetAt, dateMet: dateMet.getTime(), phoneNumber })}
                        />
                    </Spacer>
                    <Spacer>
                        <Button
                            title="Cancel"
                            onPress={() => onCancel()}
                        />
                    </Spacer>
                </Spacer>
            </KeyboardAvoidingView>
        </ScrollView>
    );
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
    },
    inputStyle: {
        margin: 15,
    },
    headerText: {
        alignSelf: 'center'
    }
});

export default RoseForm;

