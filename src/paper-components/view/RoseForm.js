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

    // TODO: Need to use preset location
    const { birthday, email, homeLocation, name, nickName, phoneNumber, placeMetAt, picture, tags, work, roseId
    } = user || {};

    const [updated_birthday, setBirthday] = useState(birthday);
    const [updated_email, setEmail] = useState(email);
    const [updated_tags, setTags] = useState(tags);
    const [updated_work, setWork] = useState(work);
    const [updated_name, setName] = useState(name);
    const [updated_nickName, setNickName] = useState(nickName);
    const [updated_phoneNumber, setPhone] = useState(phoneNumber);
    const [updated_homeLocation, setUpdated_homeLocation] = useState({});
    const [updated_placeMetAt, setUpdated_placeMetAt] = useState({});

    // ────────────────────────────────────────────────────────────────────────────────
    // TODO: NOT YET USED //
    const [updated_picture, setPicture] = useState(picture);
    // ────────────────────────────────────────────────────────────────────────────────

    const updatedUser = {
        birthday: updated_birthday || '',
        email: updated_email || '',
        /* -------------------------------------------------------------------------- */
        homeLocation: updated_homeLocation || {
            homeLocationCoords: { latitude: -369, longitude: -369 },
            homeFormatted_address: '',
            homeLocationName: ''
        },
        placeMetAt: updated_placeMetAt || {
            placeMetAtLocationCoords: { latitude: -369, longitude: -369 },
            placeMetAtFormatted_address: '',
            placeMetAtName: ''
        },
        /* -------------------------------------------------------------------------- */
        name: updated_name || '',
        nickName: updated_nickName || '',
        phoneNumber: updated_phoneNumber || '',
        picture: updated_picture || '',
        tags: updated_tags || '',
        work: updated_work || '',
        roseId: roseId || ''
    };

    console.log('updatedUser', updatedUser);

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


    /* -------------------------------------------------------------------------- */
    /*                                Functions                                   */
    /* -------------------------------------------------------------------------- */

    // TODO: MOVE OUT?
    const _clearFormData = () => formRows.map(row => row.editFunc(''));

    const _makeLocationObject = (locationObject, locationType, locationSetter) => {
        const { geometry: { location: { lat, lng} }, formatted_address, name } = locationObject;
        if (locationType === 'home') {
            locationSetter({
                homeLocationCoords: { latitude: lat, longitude: lng },
                homeFormatted_address: formatted_address,
                homeLocationName: name
            });
        } else if (locationType === 'place_met') {
            locationSetter({
                placeMetAtLocationCoords: { latitude: lat, longitude: lng },
                placeMetAtFormatted_address: formatted_address,
                placeMetAtName: name
            });
        }
    }
    /* -------------------------------------------------------------------------- */

    const [contentHeight, setContentHeight] = useState();
    const scrollRef = React.createRef();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={80}
            style={{ flex: 1 }}
        >
            <ScrollView keyboardShouldPersistTaps="always"
                ref={scrollRef}
                onContentSizeChange={(contentHeight) => {
                    setContentHeight(contentHeight);
                }}
            >
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
                {/* TODO: preset location.... */}
                <Paragraph> Location Stuff (please select below)</Paragraph>
                {/* <Paragraph style={{ fontSize: 10 }}> Home Location </Paragraph> */}
                <Card.Actions style={styles.cardContent}>
                    <Avatar.Icon {...props} icon={'crosshairs-gps'} size={40} style={{ marginRight: 10 }} />
                    <PlacesInput
                        googleApiKey={GOOGLE_API_KEY}
                        onSelect={place => _makeLocationObject(place.result, 'home', setUpdated_homeLocation)}
                        placeHolder={"Home location"}
                        language={"en-US"}
                        //onChangeText={() => scrollRef.current?.scrollToEnd()}
                        textInputProps={{
                            autoCorrect: false
                        }}
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
                        onChangeText={() => scrollRef.current?.scrollTo({ y: 2 * contentHeight, animated: true })}
                    />
                </Card.Actions>
                {
                    (form_updateFunctionText !== 'Save profile')
                        ? <Card.Actions style={styles.cardContent}>
                            <Avatar.Icon {...props} icon={'crosshairs-gps'} size={40} style={{ marginRight: 10 }} />
                            <PlacesInput
                                googleApiKey={GOOGLE_API_KEY}
                                onSelect={place => _makeLocationObject(place.result, 'place_met', setUpdated_placeMetAt)}
                                placeHolder={"Place you met!"}
                                language={"en-US"}
                                //onChangeText={() => scrollRef.current?.scrollToEnd()}
                                onChangeText={() => scrollRef.current?.scrollTo({ y: 2 * contentHeight, animated: true })}
                                textInputProps={{
                                    autoCorrect: false
                                }}
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
                        : null
                }
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

