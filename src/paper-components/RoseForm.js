import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import Spacer from '../components/Spacer';

const RoseForm = ({ user, props,
    form_updateFunction, form_updateFunctionText,
    form_secondFunction, form_secondFunctionText,
    callback }
) => {

    const { birthday, email, homeLocation, name, nickName, phoneNumber, placeMetAt, picture, tags, work
    } = user || {};

    // console.log('rosform', user);

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

    const [updated_birthday, setBirthday] = useState(birthday);
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

    const formRows = [
        {
            value: updated_name || '(No-Name?)', subtitle: 'name',
            left: "account",
            rightIcon: "account-plus",
            editFunc: setName
        },
        {
            value: updated_nickName || '(No-nickName?)', subtitle: 'nickname',
            left: "account",
            rightIcon: "account-plus",
            editFunc: setNickName
        },
        {
            value: updated_phoneNumber || '(123456789)', subtitle: 'phone',
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
            value: updated_work || '(Add Occupation!)', subtitle: 'occupation',
            left: "briefcase-account",
            rightIcon: "briefcase-plus",
            editFunc: setWork
        },
        {
            // TODO: WHEN array
            // value: (updated_tags && updated_tags.length > 0) ? updated_tags.join(',') : '(Add some Tags!)', subtitle: 'tag',
            value: updated_tags || '(Add some Tags!)', subtitle: 'tag',
            left: "tag",
            rightIcon: "tag",
            editFunc: setTags
        },
        {
            value: updated_birthday || '(Enter Birthday!)', subtitle: 'birthday',
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

    // console.log(updatedUser)

    return (
        <KeyboardAvoidingView behavior={'padding'}
            keyboardVerticalOffset={50}
            style={{ flex: 1 }}
        >
            <ScrollView >
                {
                    formRows.map((row) => (
                        <Card.Actions style={styles.cardContent} key={row.subtitle}>
                            <Avatar.Icon {...props} icon={row.left} size={40} style={{ marginRight: 20 }} />
                            <TextInput mode="outlined"
                                label={row.subtitle}
                                // placeholder={value}
                                style={styles.textInput}
                                value={row.value}
                                autoCapitalize="none"
                                autoComplete={false}
                                autoCorrect={false}
                                autoCompleteType={"off"}
                                onChangeText={row.editFunc}
                            />
                        </Card.Actions>
                    ))
                }
                <Button onPress={() => {
                    // console.log(`going to update ${form_updateFunctionText}`);
                    form_updateFunction({updatedUserObj: updatedUser, callback})
                    // console.log(`updated ${form_updateFunctionText}`);
                }}>
                    {form_updateFunctionText || 'Save'}
                </Button>
                <Button onPress={form_secondFunction} >
                    {form_secondFunctionText}
                </Button>
            </ScrollView>
            <Spacer />
        </KeyboardAvoidingView>
    );
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
    cardContent: {
        // alignItems: 'stretch',
        // flex: 1,
        // flexDirection: 'row',
        // alignSelf: 'stretch',
        // alignItems: 'center',
        // justifyContent: 'flex-start',
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

