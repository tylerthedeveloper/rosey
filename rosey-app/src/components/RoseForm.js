import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Spacer from './Spacer';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Form } from '@secullum/react-native-autofocus'

const RoseForm = ({ headerText, submitButtonText, onSubmit, onCancel }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [placeName, setPlace] = useState('');
    const [coords, setCoords] = useState({ latitude: -369, longitude: -369 })
    const [picture, setPicture] = useState('');
    const placeMetAt = {
        placeName,
        coords,
    };

    /* -------------------------------------------------------------------------- */
    /*                                Date Section                                */
    /* -------------------------------------------------------------------------- */
    const [dateMet, setDate] = useState(Date.now());
    const [mode, setMode] = useState('date');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateMet;
        // setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    console.log(Date.parse(dateMet));
    /* -------------------------------------------------------------------------- */

    return (
        <ScrollView>
            <Form focusOn={[TextInput]}>
            <Spacer>
                <Spacer>
                    <Text h3> {headerText} </Text>
                </Spacer>
                <Spacer>
                    <TextInput label="Name"
                        value={name}
                        onChangeText={setName}
                        autoCorrect={false}
                        returnKeyType={"next"}
                    />
                </Spacer>
                <Spacer>
                    <TextInput label="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCorrect={false}
                        keyboardType={"email-address"}
                    />
                </Spacer>
                <Spacer>
                    <TextInput label="Phone Number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType={"phone-pad"}
                    />
                </Spacer>
                <Spacer>
                    <Input label="Place Met At"
                        value={placeName}
                        onChangeText={setPlace}
                        autoCorrect={false}                        
                    />
                </Spacer>
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
                        onPress={() => onSubmit({ name, email, picture, placeMetAt, dateMet, phoneNumber })}
                    />
                </Spacer>
                <Spacer>
                    <Button
                        title="Cancel"
                        onPress={() => onCancel()}
                    />
                </Spacer>
            </Spacer>
            </Form>
        </ScrollView>);
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

export default RoseForm;

