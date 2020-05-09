import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, TextInput, Divider, Chip, Paragraph, Title } from 'react-native-paper';
import Spacer from '../../components/Spacer';

import { GOOGLE_API_KEY } from "react-native-dotenv";
import PlacesInput from 'react-native-places-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const RoseForm = ({ user, props,
    form_updateFunction, form_updateFunctionText,
    form_secondFunction, form_secondFunctionText,
    form_updateFunction_callback
}) => {

    const { birthday, dateMet, email, homeLocation, name, nickName, notes, phoneNumber, placeMetAt, picture, tags, work, roseId
    } = user || {};

    const [updated_birthday, setBirthday] = useState(birthday || new Date(Date.now()));
    const [updated_dateMet, setDateMet] = useState(dateMet || new Date(Date.now()));
    const [updated_email, setEmail] = useState(email);
    const [updated_tags, setTags] = useState(tags);
    const [updated_work, setWork] = useState(work);
    const [updated_name, setName] = useState(name);
    const [updated_notes, setNotes] = useState(notes);
    const [updated_nickName, setNickName] = useState(nickName);
    const [updated_phoneNumber, setPhone] = useState(phoneNumber);
    const [updated_homeLocation, setUpdated_homeLocation] = useState(homeLocation);
    const [updated_placeMetAt, setUpdated_placeMetAt] = useState(placeMetAt);

    // ────────────────────────────────────────────────────────────────────────────────
    // TODO: NOT YET USED //
    const [updated_picture, setPicture] = useState(picture);
    // ────────────────────────────────────────────────────────────────────────────────

    const updatedUser = {
        birthday: updated_birthday || Date.now(),
        dateMet: updated_dateMet || new Date(Date.now()),
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
        notes: updated_notes || '',
        nickName: updated_nickName || '',
        phoneNumber: updated_phoneNumber || '',
        picture: updated_picture || '',
        tags: updated_tags || '',
        work: updated_work || '',
        roseId: roseId || ''
    };

    // console.log('updatedUser', updatedUser.homeLocation, updatedUser.placeMetAt);

    const formRows = [
        {
            value: updated_name, subtitle: 'name',
            left: "account",
            rightIcon: "account-plus",
            editFunc: setName,
            autoCapitalize: "words"
        },
        {
            value: updated_nickName, subtitle: 'nickname',
            left: "account",
            rightIcon: "account-plus",
            editFunc: setNickName,
            autoCapitalize: "words"
        },
        {
            value: updated_phoneNumber, subtitle: 'phone',
            left: "phone",
            rightIcon: "phone",
            keyboardType: 'phone-pad',
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
            editFunc: setWork,
            autoCapitalize: "words"
        },
        {
            // TODO: WHEN array
            // value: (updated_tags && updated_tags.length > 0) ? updated_tags.join(',') : '(Add some Tags!)', subtitle: 'tag',
            value: updated_tags, subtitle: 'Add tags (by commas) ',
            left: "tag",
            rightIcon: "tag",
            editFunc: setTags,
            autoCapitalize: "words"
        },
        {
            value: updated_notes, subtitle: 'notes',
            left: "note",
            rightIcon: "note",
            editFunc: setNotes,
            multiline: true,
            autoCapitalize: "sentences"
        }
    ];

    /* -------------------------------------------------------------------------- */
    /*                                Functions                                   */
    /* -------------------------------------------------------------------------- */

    // TODO: MOVE OUT?
    const _clearFormData = () => formRows.map(row => row.editFunc(''));

    const _onChangeDate = (event, field, selectedDate) => {
        const currentDate = selectedDate || date;
        field(currentDate);
    };
    const [birth_datePicker, setBirth_datePicker] = useState(false);
    const [datemet_Picker, setDatemet_Picker] = useState(false);

    const _openDate = (ref, open) => {

    }

    const _makeLocationObject = (locationObject, locationType, locationSetter) => {
        const { geometry: { location: { lat, lng } }, formatted_address, name } = locationObject;
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

    const contactCardRowsToIgnore = ['notes', 'date met']
    const isUserContactCard = (form_updateFunctionText === 'Save contact card');

    if (isUserContactCard) {
        updatedUser.dateMet = undefined;
        console.log(updatedUser.dateMet)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={80}
            style={{ flex: 1 }}
        >
            <ScrollView keyboardShouldPersistTaps="always"
                ref={scrollRef}
                onContentSizeChange={(contentHeight) => setContentHeight(contentHeight)}
            >
                {
                    formRows.map(({ left, subtitle, value, editFunc, keyboardType, autoCapitalize, multiline }) => (
                        ((isUserContactCard && !contactCardRowsToIgnore.includes(subtitle) || !isUserContactCard))
                            ? <Card.Actions style={styles.cardContent} key={subtitle} >
                                <Avatar.Icon {...props} icon={left} size={40} style={{ marginRight: 20 }} />
                                <TextInput mode="outlined"
                                    label={subtitle}
                                    style={styles.textInput}
                                    // placeholder={value}
                                    value={value}
                                    autoCapitalize={autoCapitalize || "none"}
                                    autoComplete={false}
                                    autoCorrect={false}
                                    autoCompleteType={"off"}
                                    onChangeText={editFunc}
                                    multiline={multiline}
                                    keyboardType={keyboardType}
                                />
                            </Card.Actions>
                            : null
                    ))
                }
                <Paragraph> Date Info </Paragraph>
                {
                    (!isUserContactCard)
                        ? <View style={{ alignItems: 'center' }}>
                            <Card.Actions style={styles.cardContent}>
                                <TouchableOpacity onPress={() => setDatemet_Picker(!datemet_Picker)}>
                                    <Avatar.Icon {...props} icon={'calendar'} size={40} style={{ marginRight: 20 }} />
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.textInput}
                                    disabled={true}
                                    onTouchStart={() => setDatemet_Picker(!datemet_Picker)}
                                    value={moment(new Date(updated_dateMet)).format('MMM DD, YYYY')}
                                />
                            </Card.Actions>
                            {
                                (datemet_Picker)
                                    ? <>
                                        <Paragraph> Date Met </Paragraph>
                                        <DateTimePicker
                                            value={updated_dateMet}
                                            display="default"
                                            style={{ width: '70%', alignSelf: 'center' }}
                                            onChange={(e, date) => _onChangeDate(e, setDateMet, date)}
                                        />
                                    </>
                                    : null
                            }
                        </View>
                        : null
                }
                <View style={{ alignItems: 'center' }}>
                    <Card.Actions style={styles.cardContent}>
                        <TouchableOpacity onPress={() => setBirth_datePicker(!birth_datePicker)}>
                            <Avatar.Icon {...props} icon={'calendar'} size={40} style={{ marginRight: 20 }} />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.textInput}
                            disabled={true}
                            onTouchStart={() => setBirth_datePicker(!birth_datePicker)}
                            value={moment(new Date(updated_birthday)).format('MMM DD, YYYY')}
                        />
                    </Card.Actions>
                    {
                        (birth_datePicker)
                            ? <>
                                <Paragraph> Birthday </Paragraph>
                                <DateTimePicker
                                    value={updated_birthday}
                                    display="default"
                                    style={{ width: '66%', alignSelf: 'center' }}
                                    onChange={(e, date) => _onChangeDate(e, setBirthday, date)}
                                />
                            </>
                            : null
                    }
                </View>
                {/* TODO: preset location.... */}
                <Paragraph> Location Stuff (please select below)</Paragraph>
                <Card.Actions style={styles.cardContent}>
                    <Avatar.Icon {...props} icon={'crosshairs-gps'} size={40} style={{ marginRight: 10 }} />
                    <PlacesInput
                        googleApiKey={GOOGLE_API_KEY}
                        onSelect={place => _makeLocationObject(place.result, 'home', setUpdated_homeLocation)}
                        placeHolder={(homeLocation && homeLocation.homeFormatted_address) ? homeLocation.homeFormatted_address : "Home location"}
                        language={"en-US"}
                        textInputProps={{
                            autoCorrect: false
                        }}
                        stylesContainer={{
                            position: 'relative',
                            alignSelf: 'center',
                            margin: 0,
                            width: '80%',
                            marginBottom: 10
                        }}
                        //onChangeText={() => scrollRef.current?.scrollTo({ y: 2 * contentHeight, animated: true })}
                        onChangeText={() => scrollRef.current?.scrollToEnd()}
                    />
                </Card.Actions>
                {
                    (!isUserContactCard)
                        ? <Card.Actions style={styles.cardContent}>
                            <Avatar.Icon {...props} icon={'crosshairs-gps'} size={40} style={{ marginRight: 10 }} />
                            <PlacesInput
                                googleApiKey={GOOGLE_API_KEY}
                                onSelect={place => _makeLocationObject(place.result, 'place_met', setUpdated_placeMetAt)}
                                placeHolder={(placeMetAt && placeMetAt.placeMetAtFormatted_address) ? placeMetAt.placeMetAtFormatted_address : "Place you met!"}
                                language={"en-US"}
                                value={placeMetAt}
                                onChangeText={() => scrollRef.current?.scrollToEnd()}
                                textInputProps={{
                                    autoCorrect: false
                                }}
                                stylesContainer={{
                                    position: 'relative',
                                    alignSelf: 'center',
                                    margin: 0,
                                    width: '80%',
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
{/* //dateContainer: {
        maxWidth: '80%',
        alignSelf: 'center',
        flexDirection: 'row'
    }, */}
export default RoseForm;

