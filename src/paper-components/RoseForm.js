import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Card, TextInput, Button } from 'react-native-paper';
import Spacer from '../components/Spacer';

const RoseForm = ({ user, rows, props, errorMessage, onSubmit, submitButtonText, updateFunction,
    updateFunctionText, secondFunction, secondFunctionText }
) => {

    const { birthday, email, homeLocation, name, nickName, phoneNumber, placeMetAt, picture, tags, work
    } = user;

    let city, state, country;
    if (homeLocation) {
        city = homeLocation.city;
        state = homeLocation.state;
        country = homeLocation.country;
    } else {
        city = "city";
        state = "state";
        country = "country";
    };


    const [updated_birthday, setBirthday] = useState(email);
    const [updated_email, setEmail] = useState(email);
    const [updated_homeLocation, setHomeLocation] = useState(homeLocation);
    const [updated_name, setName] = useState(name);
    const [updated_nickName, setNickName] = useState(nickName);
    const [updated_phoneNumber, setPhone] = useState(phoneNumber);
    const [updated_placeMetAt, setPlaceMetAt] = useState(placeMetAt);
    const [updated_picture, setPicture] = useState(picture);
    const [updated_tags, setTags] = useState(tags);
    const [updated_work, setWork] = useState(work);

    // TODO:
    const updatedUser = {
        birthday: updated_birthday,
        email: updated_email,
        homeLocation: updated_homeLocation,
        name: updated_name,
        nickName: updated_nickName,
        phoneNumber: updated_phoneNumber,
        placeMetAt: updated_placeMetAt,
        picture: updated_picture,
        tags: updated_tags,
        work: updated_work,
    };


    // const placeMetAt = {
    //     placeName,
    //     coords,
    // };


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


    console.log(updated_email)
    return (
        <>
            {
                rows.map((row) => (
                    <Card.Actions style={styles.cardContent} key={row.subtitle}>
                        <Avatar.Icon {...props} icon={row.left} size={40} style={{ marginRight: 20 }} />
                        <TextInput mode="outlined"
                            label={row.subtitle}
                            // placeholder={value}
                            style={styles.textInput}
                            autoCapitalize="none"
                            autoComplete={false}
                            defaultValue={updated_email}
                            autoCorrect={false}
                            autoCompleteType={"off"}
                            onChangeText={(text) => {
                                // let temp = { ...email }
                                // temp = text;
                                row.value = text;
                                setEmail(text);
                            }}
                        // onChangeText={row.editFunc}
                        // onChangeText={text => console.log(text)}
                        // onSubmitEditing={text => console.log('DONE:', text)}
                        />
                    </Card.Actions>
                ))
            }
            <Button onPress={() => {
                console.log("going to update profile");
                // updateProfile({ name: "new Name2" })
                // { updateFunction() }
                // setTimeout(() => setEditing(false), 3000);
                setEditing(false);
                console.log("updated profile");
            }}>
                Save
            </Button>
            <Button
                title={secondFunctionText}
                onPress={secondFunction}
            >
                {secondFunctionText}
            </Button>
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
    // errorMessage: {
    //     color: 'red',
    //     margin: 10
    // },
    textInput: {
        width: '70%',
        minWidth: '70%'
    }
});

export default RoseForm;

