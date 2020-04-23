import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Spacer from './Spacer';

const RoseForm = ({ headerText, submitButtonText, onSubmit, onCancel }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    // const [placeMetAt, setPlace] = useState({
    //     timestamp: 0,
    //     placeName: '',
    //     coords: {
    //         latitude: 0,
    //         longitude: 0,
    //     },
    // });
    const [placeName, setPlace] = useState('');
    const [coords, setCoords] = useState({ latitude: -369, longitude: -369 })
    // const [dateMet, setDateMet] = useState(Date.now())
    const [picture, setPicture] = useState('');

    const placeMetAt = {
        placeName,
        coords,
    };

    const dateMet = Date.now();
    return (
        <>
            <Spacer>
                <Spacer>
                    <Text h3> {headerText} </Text>
                </Spacer>
                <Spacer>
                    <Input label="Name"
                        value={name}
                        onChangeText={setName}
                        autoCorrect={false}
                    />
                </Spacer>
                <Spacer>
                    <Input label="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCorrect={false}
                    />
                </Spacer>
                <Spacer>
                    <Input label="Place Met At"
                        value={placeName}
                        onChangeText={setPlace}
                    />
                </Spacer>
                {/* <Spacer>
                     <Input label="Date Met"
                        value={dateMet}
                        // textContentType={""}
                        onChangeText={setDateMet}
                    />
                </Spacer> */}
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
                        onPress={() => onSubmit({ name, email, picture, placeMetAt, dateMet })}
                    />
                </Spacer>
                <Spacer>
                    <Button
                        title="Cancel"
                        onPress={() => onCancel()}
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

export default RoseForm;

