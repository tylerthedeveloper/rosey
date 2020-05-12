import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { GOOGLE_API_KEY } from "react-native-dotenv";
import { Avatar, Button, Card, Paragraph, TextInput } from 'react-native-paper';
import PlacesInput from 'react-native-places-input';
import Spacer from '../../components/Spacer';
import useCurrentLocation from '../../hooks/useCurrentLocation';

const RoseForm = ({ user, props,
    form_updateFunction, form_updateFunctionText,
    form_secondFunction, form_secondFunctionText,
    form_updateFunction_callback
}) => {

    const { birthday, dateMet, email, homeLocation, name, nickName, notes, phoneNumber, placeMetAt, picture, tags, work, roseId
    } = user || {};

    const { currentLocation, geoCodedLocation } = useCurrentLocation();

    const [updated_birthday, setBirthday] = useState(birthday || new Date(Date.now()));
    const [updated_dateMet, setDateMet] = useState(dateMet || new Date(Date.now()));
    const [updated_email, setEmail] = useState(email);
    const [updated_tags, setTags] = useState(tags);
    const [updated_work, setWork] = useState(work);
    const [updated_name, setName] = useState(name);
    const [updated_notes, setNotes] = useState(notes);
    const [updated_nickName, setNickName] = useState(nickName);
    const [updated_phoneNumber, setPhone] = useState(phoneNumber);
    const [updated_homeLocation, setUpdated_homeLocation] = useState(homeLocation || {});
    const [updated_placeMetAt, setUpdated_placeMetAt] = useState(placeMetAt || {});

    // ────────────────────────────────────────────────────────────────────────────────
    // TODO: NOT YET USED //
    const [updated_picture, setPicture] = useState(picture);
    // ────────────────────────────────────────────────────────────────────────────────

    // TODO: Convert to one user object?
    const updatedUser = {
        birthday: updated_birthday || new Date(Date.now()),
        dateMet: updated_dateMet || new Date(Date.now()),
        email: updated_email || '',
        /* -------------------------------------------------------------------------- */
        homeLocation: updated_homeLocation || {
            homeLocationCoords: { latitude: -369, longitude: -369 },
            homeFormatted_address: '',
            homeLocationName: ''
        },
        placeMetAt: updated_placeMetAt
        ,
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

    const [birth_datePicker, setBirth_datePicker] = useState(false);
    const [datemet_Picker, setDatemet_Picker] = useState(false);

    const _makeLocationObject = (locationObject, locationType, locationSetter) => {
        if (locationType.includes('default')) {
            const { location: { latitude, longitude }, formatted_address, name } = locationObject;
            if (locationType === 'default_home') {
                locationSetter({
                    homeLocationCoords: { latitude, longitude },
                    homeFormatted_address: formatted_address,
                    homeLocationName: name
                });
            } else if (locationType === 'default_place_met') {
                locationSetter({
                    placeMetAtLocationCoords: { latitude, longitude },
                    placeMetAtFormatted_address: formatted_address,
                    placeMetAtName: name
                });
            }
        } else {
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
    }

    const _setPlaceMet = () => {
        if (!Object.keys(updatedUser.placeMetAt).length > 0) {
            updatedUser.placeMetAt = {
                placeMetAtFormatted_address: geoCodedLocation,
                placeMetAtLocationCoords: {
                    latitude: currentLocation.latitude || -369,
                    longitude: currentLocation.longitude || -369,
                },
                placeMetAtName: "",
            }
        } else {
            console.log('set me!');
        }
    }
    /* -------------------------------------------------------------------------- */

    const [contentHeight, setContentHeight] = useState();
    const scrollRef = React.createRef();

    const contactCardRowsToIgnore = ['notes', 'date met']
    const isUserContactCard = (form_updateFunctionText === 'Save contact card');

    if (isUserContactCard) {
        updatedUser.dateMet = undefined;
        updatedUser.notes = undefined;
        updatedUser.tags = undefined;
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
                <Paragraph style={styles.sectionTitle}> Date Info </Paragraph>
                {
                    (!isUserContactCard)
                        ? <View style={{ alignItems: 'center' }}>
                            <Card.Actions style={styles.cardContent}>
                                <TouchableOpacity onPress={() => setDatemet_Picker(!datemet_Picker)}>
                                    <Avatar.Icon {...props} icon={'calendar'} size={40} style={{ marginRight: 20 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setDatemet_Picker(!datemet_Picker)}
                                    style={styles.textInput}
                                >
                                    <TextInput
                                        disabled={true}
                                        onTouchStart={() => setDatemet_Picker(!datemet_Picker)}
                                        value={moment(new Date(updated_dateMet)).format('MMM DD, YYYY')}
                                    />
                                </TouchableOpacity>
                            </Card.Actions>
                            {
                                (datemet_Picker)
                                    ?
                                    (Platform.OS === "ios")
                                        ? <>
                                            <Paragraph> Date Met </Paragraph>
                                            <DateTimePicker
                                                value={updated_dateMet}
                                                display="default"
                                                style={{ width: '70%', alignSelf: 'center' }}
                                                onChange={(event, date) => setDateMet(date)
                                                }
                                            />
                                        </>
                                        : <DateTimePicker
                                            value={updated_dateMet}
                                            display="default"
                                            style={{ width: '70%', alignSelf: 'center' }}
                                            onChange={(event, value) => {
                                                setDatemet_Picker(false);
                                                setDateMet(value || updated_dateMet || new Date(Date.now()));
                                            }}
                                        />
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
                        <TouchableOpacity
                            onPress={() => setBirth_datePicker(!birth_datePicker)}
                            style={styles.textInput}>
                            <TextInput
                                onTouchStart={() => setBirth_datePicker(!birth_datePicker)}
                                disabled={true}
                                value={moment(new Date(updated_birthday)).format('MMM DD, YYYY')}
                            />
                        </TouchableOpacity>
                    </Card.Actions>
                    {
                        (birth_datePicker)
                            ? (Platform.OS === "ios")
                                ? <>
                                    <Paragraph> Birthday </Paragraph>
                                    <DateTimePicker
                                        value={updated_birthday}
                                        display="default"
                                        style={{ width: '70%', alignSelf: 'center' }}
                                        onChange={(e, date) => setBirthday(date)}
                                    />
                                </>
                                : <DateTimePicker
                                    value={updated_birthday}
                                    display="default"
                                    style={{ width: '70%', alignSelf: 'center' }}
                                    onChange={(e, value) => {
                                        setBirth_datePicker(false);
                                        setBirthday(value || updated_birthday || new Date(Date.now()));
                                    }}
                                />
                            : null
                    }
                </View>
                {/* TODO: preset location.... */}
                <Paragraph style={styles.sectionTitle}> Location Stuff (please select below)</Paragraph>
                <TouchableOpacity
                    onPress={() => _makeLocationObject({
                        location: currentLocation, formatted_address: geoCodedLocation, name: ""
                    }, "default_home", setUpdated_homeLocation)}>
                    <Paragraph style={{ alignSelf: 'center', color: 'blue' }}>
                        Use current location for home
                    </Paragraph>
                </TouchableOpacity>
                <Card.Actions style={styles.cardContent}>
                    <Avatar.Icon {...props} icon={'crosshairs-gps'} size={40} style={{ marginRight: 10 }} />
                    <PlacesInput
                        googleApiKey={GOOGLE_API_KEY}
                        onSelect={place => _makeLocationObject(place.result, 'home', setUpdated_homeLocation)}
                        placeHolder={(updated_homeLocation && updated_homeLocation.homeFormatted_address) ? updated_homeLocation.homeFormatted_address : "Home location"}
                        language={"en-US"}
                        textInputProps={{
                            autoCorrect: false,
                            fontWeight: 'bold'
                        }}
                        stylesContainer={{
                            position: 'relative',
                            alignSelf: 'center',
                            fontWeight: 'bold',
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
                        ? <>
                            <TouchableOpacity
                                onPress={() => _makeLocationObject({
                                    location: currentLocation, formatted_address: geoCodedLocation, name: ""
                                }, "default_place_met", setUpdated_placeMetAt)}>
                                <Paragraph style={{ alignSelf: 'center', color: 'blue' }}>
                                    Use current location for place met
                                </Paragraph>
                            </TouchableOpacity>
                            <Card.Actions style={styles.cardContent}>
                                {/* TODO: SET NAME??? */}
                                <Avatar.Icon {...props} icon={'crosshairs-gps'} size={40} style={{ marginRight: 10 }} />
                                <PlacesInput
                                    googleApiKey={GOOGLE_API_KEY}
                                    onSelect={place => _makeLocationObject(place.result, 'place_met', setUpdated_placeMetAt)}
                                    placeHolder={(updated_placeMetAt.placeMetAtFormatted_address) ? updated_placeMetAt.placeMetAtFormatted_address : "Place you met!"}
                                    language={"en-US"}
                                    value={updated_placeMetAt}
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
                        </>
                        : null
                }
                <Button disabled={JSON.stringify(user) === JSON.stringify(updatedUser)}
                    onPress={() => {
                        _setPlaceMet();
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
            </ScrollView >
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
        width: '100%',
        marginBottom: 5
    },
    // TODO:
    textInput: {
        //width: '70%',
        minWidth: '70%',
        maxWidth: '90%'
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginVertical: 10
    }
});

export default RoseForm;