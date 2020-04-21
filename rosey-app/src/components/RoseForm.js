import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Spacer from './Spacer';

const RoseForm = ({ headerText, submitButtonText, onSubmit }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [picture, setPicture] = useState('');

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
                    <Input label="Picture"
                        value={picture}
                        onChangeText={setPicture}
                        autoCorrect={false}
                    />
                </Spacer>
                <Spacer>
                    <Button
                        title={submitButtonText}
                        onPress={() => onSubmit({ name, email, picture })}
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

