import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import Spacer from '../components/Spacer';

const RoseForm = ({ user, props,
    form_updateFunction, form_updateFunctionText,
    form_secondFunction, form_secondFunctionText,
    form_updateFunction_callback
}
) => {

    const { birthday, email, homeLocation, name, nickName, phoneNumber, placeMetAt, picture, tags, work, roseId
    } = user || {};

    let city, state, country;
    if (homeLocation) {
        city = homeLocation.city;
        state = homeLocation.state;
        country = homeLocation.country;
    }
    // else {
    //     city = "city";
    //     state = "state";
    //     country = "country";
    // };

    const [updated_birthday, setBirthday] = useState(birthday);
    const [updated_email, setEmail] = useState(email);
    /* -------------------------------------------------------------------------- */
    // const [updated_homeLocation, setHomeLocation] = useState(homeLocation);
    const [updated_homeCity, setHomeCity] = useState();
    const [updated_homeState, setHomeState] = useState();
    const [updated_homeCountry, setHomeCountry] = useState();
    /* -------------------------------------------------------------------------- */
    const [updated_name, setName] = useState(name);
    const [updated_nickName, setNickName] = useState(nickName);
    const [updated_phoneNumber, setPhone] = useState(phoneNumber);
    const [updated_placeMetAt, setPlaceMetAt] = useState(placeMetAt);
    const [updated_picture, setPicture] = useState(picture);
    const [updated_tags, setTags] = useState(tags);
    const [updated_work, setWork] = useState(work);

    const updatedUser = {
        birthday: updated_birthday || '',
        email: updated_email || '',
        // homeLocation: updated_homeLocation || '',
        /* -------------------------------------------------------------------------- */
        homeLocation: {
            homeCity: updated_homeCity || '',
            homeState: updated_homeState || '',
            homeCountry: updated_homeCountry || '',
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

    // TODO: CLEAR AFTER LEAVE?
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
            left: "place",
            rightIcon: "place",
            editFunc: setHomeState
        },
        {
            value: updated_homeCountry, subtitle: 'country',
            left: "location-on",
            rightIcon: "location-on",
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

    console.log(JSON.stringify(user) === JSON.stringify(updatedUser));
    const _clearFormData = () => formRows.map(row => row.editFunc(''));

    return (
        <KeyboardAvoidingView behavior={'padding'}
            keyboardVerticalOffset={10}
            style={{ flex: 1 }}
        >
            <ScrollView >
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
                <Button disabled={JSON.stringify(user) === JSON.stringify(updatedUser)}
                    onPress={() => {
                        form_updateFunction({ roseObj: updatedUser, callback: () => form_updateFunction_callback(updatedUser) })
                        _clearFormData();
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
        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    cardContent: {
        paddingLeft: 22,
        paddingRight: 20,
        marginTop: 3,
        marginLeft: 2,
        // width: '100%',
        marginBottom: 5
    },
    textInput: {
        width: '70%',
        minWidth: '70%'
    }
});

export default RoseForm;

