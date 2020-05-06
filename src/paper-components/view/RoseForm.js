import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Button, Card, TextInput, Divider, Paragraph } from 'react-native-paper';
import Spacer from '../../components/Spacer';
import { GOOGLE_API_KEY } from "react-native-dotenv";

import PlacesInput from 'react-native-places-input';


const RoseForm = ({ user, props,
    form_updateFunction, form_updateFunctionText,
    form_secondFunction, form_secondFunctionText,
    form_updateFunction_callback
}) => {

    // console.log(GOOGLE_API_KEY);

    const { birthday, email, homeLocation, name, nickName, phoneNumber, placeMetAt, picture, tags, work, roseId
    } = user || {};

    const { homeCity, homeState, homeCountry } = homeLocation || {};

    const [updated_birthday, setBirthday] = useState(birthday);
    const [updated_email, setEmail] = useState(email);
    const [updated_tags, setTags] = useState(tags);
    const [updated_work, setWork] = useState(work);
    const [updated_name, setName] = useState(name);
    const [updated_nickName, setNickName] = useState(nickName);
    const [updated_phoneNumber, setPhone] = useState(phoneNumber);

    /* -------------------------------------------------------------------------- */
    // Home Location //
    // const [updated_homeLocation, setHomeLocation] = useState(homeLocation);
    const [updated_homeCity, setHomeCity] = useState(homeCity);
    const [updated_homeState, setHomeState] = useState(homeState);
    const [updated_homeCountry, setHomeCountry] = useState(homeCountry);
    /* -------------------------------------------------------------------------- */

    // ────────────────────────────────────────────────────────────────────────────────
    // NOT YET USED //
    const [updated_placeMetAt, setPlaceMetAt] = useState(placeMetAt);
    const [updated_picture, setPicture] = useState(picture);
    // ────────────────────────────────────────────────────────────────────────────────

    // ────────────────────────────────────────────────────────────────────────────────
    // This is to test location API
    const [updated_homeLocation_TEST, setUpdated_homeLocation_TEST] = useState({});
    console.log(updated_homeLocation_TEST);
    // ────────────────────────────────────────────────────────────────────────────────

    const _makeLocationObject = (locationObject, locationSetter) => {
        // console.log(locationObject);
        const { geometry: { location }, formatted_address, name } = locationObject;
        console.log(location);
        console.log(formatted_address);
        console.log(name);
        locationSetter({ location, formatted_address, name });
    }

    const updatedUser = {
        birthday: updated_birthday || '',
        email: updated_email || '',
        /* -------------------------------------------------------------------------- */
        // homeLocation: updated_homeLocation || '',
        homeLocation: updated_homeLocation_TEST || {
            location: { latitude: -369, longitude: -369 }, 
            formatted_address: '',
            name: ''
        },
        /* -------------------------------------------------------------------------- */
        name: updated_name || '',
        nickName: updated_nickName || '',
        phoneNumber: updated_phoneNumber || '',
        placeMetAt: updated_placeMetAt || '',
        picture: updated_picture || '',
        tags: updated_tags || '',
        work: updated_work || '',
        roseId: roseId || ''
    };

    console.log(updatedUser);

    const formRows = [
        {
            value: updated_name, subtitle: 'name',
            left: "account",
            rightIcon: "account-plus",
            editFunc: setName
        },
        {
            value: updated_nickName, subtitle: 'nickname',
            left: "account",
            rightIcon: "account-plus",
            editFunc: setNickName
        },
        {
            value: updated_phoneNumber, subtitle: 'phone',
            left: "phone",
            rightIcon: "phone",
            editFunc: setPhone
        },
        {
            value: updated_email, subtitle: 'email',
            left: "email",
            rightIcon: "email",
            editFunc: setEmail
        },
        {
            value: updated_homeCity, subtitle: 'city',
            left: "city",
            rightIcon: "city",
            editFunc: setHomeCity
        },
        {
            value: updated_homeState, subtitle: 'state',
            left: "drag-variant",
            rightIcon: "drag-variant",
            editFunc: setHomeState
        },
        {
            value: updated_homeCountry, subtitle: 'country',
            left: "crosshairs-gps",
            rightIcon: "crosshairs-gps",
            editFunc: setHomeCountry
        },
        {
            value: updated_work, subtitle: 'occupation',
            left: "briefcase-account",
            rightIcon: "briefcase-plus",
            editFunc: setWork
        },
        {
            // TODO: WHEN array
            // value: (updated_tags && updated_tags.length > 0) ? updated_tags.join(',') : '(Add some Tags!)', subtitle: 'tag',
            value: updated_tags, subtitle: 'Add tags (by commas) ',
            left: "tag",
            rightIcon: "tag",
            editFunc: setTags
        },
        {
            value: updated_birthday, subtitle: 'birthday',
            left: "calendar",
            rightIcon: "calendar-heart",
            editFunc: setBirthday
        },
    ];

    // const placeMetAt = {
    //     placeName,
    //     coords,
    // };

    /* -------------------------------------------------------------------------- */
    /*                                Date Section                                */
    /* -------------------------------------------------------------------------- */
    // const [dateMet, setDate] = useState(new Date(Date.now()));
    // const [mode, setMode] = useState('date');

    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || dateMet;
    //     // setShow(Platform.OS === 'ios');
    //     setDate(currentDate);
    // };
    /* -------------------------------------------------------------------------- */

    // console.log(JSON.stringify(user) === JSON.stringify(updatedUser));
    const _clearFormData = () => formRows.map(row => row.editFunc(''));

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={80}
            style={{ flex: 1 }}
        >
            <ScrollView keyboardShouldPersistTaps="always">
                {
                    formRows.map(({ left, subtitle, value, editFunc }) => (
                        <Card.Actions style={styles.cardContent} key={subtitle}>
                            <Avatar.Icon {...props} icon={left} size={40} style={{ marginRight: 20 }} />
                            <TextInput mode="outlined"
                                label={subtitle}
                                style={styles.textInput}
                                // placeholder={value}
                                value={value}
                                autoCapitalize="none"
                                autoComplete={false}
                                autoCorrect={false}
                                autoCompleteType={"off"}
                                onChangeText={editFunc}
                            />
                        </Card.Actions>
                    ))
                }
                <Divider />
                <Paragraph> Location Stuff (please select below)</Paragraph>
                {/* <Paragraph style={{ fontSize: 10 }}> Home Location </Paragraph> */}
                <Card.Actions style={styles.cardContent}>
                    <Avatar.Icon {...props} icon={'crosshairs-gps'} size={40} style={{ marginRight: 10 }} />
                    <PlacesInput
                        googleApiKey={GOOGLE_API_KEY}
                        onSelect={place => _makeLocationObject(place.result, setUpdated_homeLocation_TEST)}
                        placeHolder={"Home location"}
                        language={"en-US"}
                        stylesContainer={{
                            position: 'relative',
                            alignSelf: 'center',
                            margin: 0,
                            width: '80%',
                            shadowOpacity: 0,
                            borderColor: '#dedede',
                            borderWidth: 1,
                            marginBottom: 10
                        }}
                    />
                </Card.Actions>
                <Button disabled={JSON.stringify(user) === JSON.stringify(updatedUser)}
                    onPress={() => {
                        form_updateFunction({ roseObj: updatedUser, callback: () => form_updateFunction_callback(updatedUser) })
                    }}>
                    {form_updateFunctionText || 'Save'}
                </Button>
                <Button
                    onPress={() => {
                        _clearFormData();
                        form_secondFunction();
                    }}
                    style={{}}
                >
                    {form_secondFunctionText}
                </Button>
            </ScrollView>
            <Spacer />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    cardContent: {
        paddingLeft: 22,
        paddingRight: 20,
        marginTop: 3,
        marginLeft: 2,
        width: '100%',
        marginBottom: 5
    },
    // TODO:
    textInput: {
        //width: '70%',
        minWidth: '70%',
        maxWidth: '90%'
    }
});

export default RoseForm;

