import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, { useContext, useState, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { GOOGLE_API_KEY } from "react-native-dotenv";
import { ActivityIndicator, Avatar, Button, Card, Chip, HelperText, IconButton, Paragraph, Searchbar, TextInput } from 'react-native-paper';
import PlacesInput from 'react-native-places-input';
import Spacer from '../../components/Spacer';
import * as Constants from '../../constants';
import { Context as TagContext } from '../../context/TagContext';
import { theme } from '../../core/theme';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import { MyShadowCard, MyTextInput } from '../../paper-components/memo';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions } from "react-native";
import * as Permissions from 'expo-permissions';
import { RoseHeader } from '../partial';
import * as ImagePicker from 'expo-image-picker';
import { setProfilePhotoOnFirebase, setRoseProfilePhotoOnFirebase, setAndCreateRoseWithProfilePhotoOnFirebase, addRoseToFirebase } from '../../api/firebaseApi';
import firebase from 'firebase'
import * as FileSystem from 'expo-file-system';

const RoseForm = ({ user, isApiLoading, errorMessage, props,
    form_updateFunction, form_updateFunctionText,
    form_secondFunction, form_secondFunctionText,
    form_updateFunction_callback, saveOrSubmitPassedDownAction,
    editing, _setEditing
}) => {

    const {
        birthday, dateMet, email, homeLocation, name, nickName, notes, personalSite, phoneNumber,
        placeMetAt, picture, socialProfiles, tags, work, roseId, _id, uid
    } = user || {};

    // const uid = firebase.auth().currentUser.uid;
    const { currentLocation, geoCodedLocation } = useCurrentLocation();
    const { state: { tags: contextTags }, addTag } = useContext(TagContext);
    // console.log('birth1', birthday)
    const [updated_birthday, setBirthday] = useState(() => {
        if (birthday !== undefined && birthday) {
            if (birthday?.seconds) return birthday.toDate()
            else return birthday;
        } else {
            return new Date(Date.now())
        }
    });
    // console.log('birth2', updated_birthday)
    const [updated_dateMet, setDateMet] = useState(() => {
        if (dateMet !== undefined && dateMet) {
            if (dateMet?.seconds) return dateMet.toDate()
            else return dateMet;
        } else {
            return new Date(Date.now())
        }
    });


    const [updated_email, setEmail] = useState(email || '');
    const [updated_tags, setTags] = useState(tags || []);
    const [updated_work, setWork] = useState(work);
    const [updated_name, setName] = useState(name || '');
    const [updated_notes, setNotes] = useState(notes || '');
    const [updated_nickName, setNickName] = useState(nickName);
    const [updated_personalSite, setPersonalSite] = useState(personalSite || '');
    const [updated_phoneNumber, setPhone] = useState(phoneNumber || '');
    const [updated_homeLocation, setUpdated_homeLocation] = useState(homeLocation || {});
    const [updated_placeMetAt, setUpdated_placeMetAt] = useState(placeMetAt || {});

    const { facebook, linkedin, instagram, medium, snapchat, twitch, twitter, venmo, whatsapp } = socialProfiles || {};

    const [updated_facebook, setFacebook] = useState(facebook || '');
    const [updated_linkedin, setLinkedin] = useState(linkedin || '');
    const [updated_instagram, setInstagram] = useState(instagram || '');
    const [updated_medium, setMedium] = useState(medium || '');
    const [updated_snapchat, setSnapchat] = useState(snapchat || '');

    const [updated_twitch, setTwitch] = useState(twitch || '');
    const [updated_twitter, setTwitter] = useState(twitter || '');
    const [updated_venmo, setVenmo] = useState(venmo || '');

    const [updated_whatsapp, setWhatsapp] = useState(whatsapp || '');

    // ────────────────────────────────────────────────────────────────────────────────
    // TODO: NOT YET USED //
    const [updated_picture, setPicture] = useState(picture || '');
    // ────────────────────────────────────────────────────────────────────────────────

    const updatedUser = {
        birthday: updated_birthday,
        dateMet: updated_dateMet,
        email: updated_email || '',
        homeLocation: updated_homeLocation || {
            homeLocationCoords: { latitude: -369, longitude: -369 },
            homeFormatted_address: '',
            homeLocationName: ''
        },
        placeMetAt: updated_placeMetAt,
        name: updated_name || '',
        notes: updated_notes || '',
        nickName: updated_nickName || '',
        personalSite: updated_personalSite || '',
        phoneNumber: updated_phoneNumber || '',
        picture: updated_picture || '',
        socialProfiles: {
            facebook: updated_facebook,
            linkedin: updated_linkedin,
            instagram: updated_instagram,
            medium: updated_medium,
            snapchat: updated_snapchat,
            twitch: updated_twitch,
            twitter: updated_twitter,
            venmo: updated_venmo,
            whatsapp: updated_whatsapp
        },
        tags: updated_tags || [],
        work: updated_work || '',
        roseId: roseId || '',
        uid: uid || firebase.auth().currentUser.uid
    };

    // const [_updatedUser_Handler, set_updatedUser_Handler] = useState(updatedUser);

    // useFocusEffect(() => {
    //     childStateUserHandler(updatedUser)
    // }, [updated_name])

    const socialLinkedIcons = [
        { type: 'facebook', value: updated_facebook, setter: setFacebook },
        { type: 'linkedin', value: updated_linkedin, setter: setLinkedin },
        { type: 'instagram', value: updated_instagram, setter: setInstagram },
        { type: 'medium', value: updated_medium, setter: setMedium },
        { type: 'snapchat', value: updated_snapchat, setter: setSnapchat },
        { type: 'twitch', value: updated_twitch, setter: setTwitch },
        { type: 'twitter', value: updated_twitter, setter: setTwitter },
        { type: 'venmo', value: updated_venmo, setter: setVenmo },
        { type: 'whatsapp', value: updated_whatsapp, setter: setWhatsapp }
    ];

    /* -------------------------------------------------------------------------- */
    /*                         Bool checks                                        */
    /* -------------------------------------------------------------------------- */

    // Validations
    const isNameValid = !(updated_name.length > 0);
    const isPhoneValid = false;
    // const isPhoneValid = (updated_phoneNumber.length > 0 && updated_phoneNumber.length >= 8);
    const isEmailValid = (updated_email.length > 0 && (!updated_email.includes('@') || !updated_email.includes('.')));

    const rowIgnoreArr = ["__v", "_id"]
    const isUserNotEdited = Constants.default._areObjectsEqual(user, updatedUser, rowIgnoreArr);
    // console.log('isUserNotEdited', updated_birthday, isUserNotEdited, user, updatedUser)

    const addNewRoseRoute = (form_updateFunctionText === "Add new Rose");
    const canAddNewRose = (updated_name !== undefined && updated_name.length > 0);

    const [loading, setLoading] = useState(false);
    const [photoChanged, setPhotoChanged] = useState(false);
    // ────────────────────────────────────────────────────────────────────────────────

    const errorMessageDict = {
        email: 'This email seems invalid',
        name: 'A name is required to create a new rose',
        phone: 'A valid phone number must be at least 8 digits',
    }

    //
    // ─── Custom Buttons   ───────────────────────────────────────────────────────────────────────────
    //
    const addRoseAndDisabled = (!canAddNewRose || isPhoneValid);
    const editRoseAndDisabled = (!isUserNotEdited || isApiLoading || isPhoneValid)
    const SaveButton = () => {
        let bool = false;
        if (addNewRoseRoute) {
            bool = addRoseAndDisabled;
        } else { //if (editRoseAndDisabled) {
            bool = (isUserNotEdited || isApiLoading || isPhoneValid)
        }
        return (<TouchableOpacity onPress={saveFromHeader}
            disabled={bool}
        >
            <Paragraph style={{ ...styles.sectionTitleSaveButton, opacity: (bool) ? .5 : 1 }}> Save </Paragraph>
        </TouchableOpacity>)
    }

    const SectionHeader = ({ sectionHeaderText }) => (
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
            <Paragraph style={styles.sectionTitle}> {sectionHeaderText} </Paragraph>
            <SaveButton />
        </View >
    );


    const saveFromHeader = async () => {
        try {
            if (!isUserContactCard) _setPlaceMet();
            const uploadUri = Platform.OS === 'ios' ? updated_picture.replace('file://', '') : updated_picture;
            if (addNewRoseRoute && !addRoseAndDisabled) {
                setLoading(true);
                if (uploadUri && uploadUri.length > 0 && picture !== updated_picture) {
                    const response = await setAndCreateRoseWithProfilePhotoOnFirebase({ uid, photo: uploadUri, metadata: { title: 'profile_photo' } });
                    const { downloadUrl, roseId } = response;
                    updatedUser.picture = downloadUrl;
                    updatedUser.roseId = roseId;
                }
                // else {
                //     await addRoseToFirebase(uid, updatedUser);
                // }
                setLoading(false)
                // saveOrSubmitPassedDownAction(updatedUser);
                form_updateFunction({ roseObj: updatedUser, callback: () => form_updateFunction_callback(updatedUser) });
            } else if (!isUserNotEdited && !isApiLoading && !isPhoneValid && !loading) {
                setLoading(true);
                if (uploadUri && uploadUri.length > 0 && picture !== updated_picture) {
                    let profilePhotoDownloadUrl = '';
                    if (!isUserContactCard) {
                        profilePhotoDownloadUrl = await setRoseProfilePhotoOnFirebase({ uid, roseId, photo: uploadUri, metadata: { title: 'profile_image' } });
                    } else {
                        profilePhotoDownloadUrl = await setProfilePhotoOnFirebase({ uid, photo: uploadUri, metadata: { title: 'profile_image' } });
                    }
                    // setPicture(profilePhotoDownloadUrl)
                    updatedUser.picture = profilePhotoDownloadUrl;
                    // console.log(updatedUser)
                }
                saveOrSubmitPassedDownAction(updatedUser);
                setLoading(false)
            } else {
                setLoading(false);
            }
        } catch (err) {
            setLoading(false)
            console.log(err.message)
        }
    }
    // ────────────────────────────────────────────────────────────────────────────────

    const formRows = [
        {
            value: updated_name, subtitle: 'name',
            left: "account",
            rightIcon: "account-plus",
            editFunc: setName,
            autoCapitalize: "words",
            isError: isNameValid,
            rowErrorMessage: errorMessageDict.name
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
            editFunc: setPhone,
            isError: isPhoneValid,
            rowErrorMessage: errorMessageDict.phone
        },
        {
            value: updated_email, subtitle: 'email',
            left: "email",
            keyboardType: 'email-address',
            rightIcon: "email",
            editFunc: setEmail,
            isError: isEmailValid,
            rowErrorMessage: errorMessageDict.email
        },
        {
            value: updated_personalSite, subtitle: 'personal site',
            left: "web",
            keyboardType: 'url',
            rightIcon: "search-web",
            editFunc: setPersonalSite
        },
        {
            value: updated_work, subtitle: 'occupation',
            left: "briefcase-account",
            rightIcon: "briefcase-plus",
            editFunc: setWork,
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
    const [currentSocialEntry, setCurrentSocialEntry] = useState({
        editSocialEntry: false, type: '', setter: () => null
    });

    const _clearFormData = () => formRows.map(row => row.editFunc(''));

    const [birth_datePicker, setBirth_datePicker] = useState(false);
    const [datemet_Picker, setDatemet_Picker] = useState(false);

    const toggledSelected = (tag, color) => {
        if (updated_tags.findIndex(tg => tg.tag === tag) === -1) {
            setTags([...updated_tags, { tag, color }]);
        } else {
            const filteredTags = updated_tags.filter(tg => tg.tag !== tag);
            setTags(filteredTags);
        }
    }

    const _addTag = (newTag) => {
        const tagObj = { tag: newTag, color: Constants.default.COLORS[updated_tags.length % Constants.default.COLORS.length] };
        addTag(tagObj);
        setNewTag('')
        setTags([...updated_tags, tagObj]);
    }

    const [newTag, setNewTag] = useState('');

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
        }
    }

    const _setHelperText = (type) => {
        switch (type) {
            case 'facebook':
            case 'linkedin':
            case 'medium':
                return `${type} username`;
            case 'instagram':
            case 'snapchat':
            case 'twitch':
            case 'twitter':
            case 'venmo':
                return `${type} handle`;
            case 'whatsapp':
                return 'Include Country code';
            default:
                return `Enter value for ${type}`;
        }
    }

    const [contentHeight, setContentHeight] = useState();
    const scrollRef = React.createRef();
    const placeInputRef = React.createRef();
    const screenWidth = Math.floor(Dimensions.get('window').width);
    const screenHeight = Math.floor(Dimensions.get('screen').height);

    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                         User Card Specifics                                */
    /* -------------------------------------------------------------------------- */
    const contactCardRowsToIgnore = ['notes', 'date met']
    const isUserContactCard = (form_updateFunctionText === 'Save contact card');

    if (isUserContactCard) {
        // updatedUser.dateMet = null;
        // updatedUser.placeMetAt = null;
        // updatedUser.notes = null;
        // updatedUser.tags = null;
        // updatedUser.roseId = null;
        delete updatedUser.dateMet;
        delete updatedUser.placeMetAt;
        delete updatedUser.notes;
        delete updatedUser.tags;
        delete updatedUser.roseId;

    }
    // ────────────────────────────────────────────────────────────────────────────────

    const [noteFormHeight, setNoteFormHeight] = useState();

    const saveFunc = () => {
        saveFromHeader();
    }

    /* -------------------------------------------------------------------------- */
    /*                                Photo Section                               */
    /* -------------------------------------------------------------------------- */

    const [profileImage, setProfileImage] = useState('');

    const getPermissionAsync = async () => {
        if (Platform.OS === 'ios') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            // console.log(status)
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    const setProfilePhoto = () => {
        _pickImage();
    }

    const pickProfileImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                setPicture(result.uri)
                // console.log('result', result)
                // const uploadUri = Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri;
                // setProfileImage(uploadUri)
                setPhotoChanged(true);
                // let profilePhotoDownloadUrl = await setRoseProfilePhotoOnFirebase({ uid, roseId, photo: uploadUri, metadata: { title: 'profile_image' } });
                // console.log(profilePhotoDownloadUrl)
                // setPicture(profilePhotoDownloadUrl)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPermissionAsync();
    }, [])
    // ────────────────────────────────────────────────────────────────────────────────

    let typeOfView = '';
    switch (form_updateFunctionText) {
        case 'Save Rose':
            typeOfView = 'Rose';
            break;
        case 'Add new Rose':
            typeOfView = 'New';
            break;
        case 'Save contact card':
            typeOfView = 'User';
            break;
        default:
            return ''
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={85}
            style={{ flex: 1, flexDirection: "column", flexGrow: 1 }}
        >
            <RoseHeader {...{
                name, picture: updated_picture, homeLocationName: updated_homeLocation.homeLocationName, isUserContactCard,
                editing, _setEditing, phoneNumber, email, saveFunc, pickProfileImage, typeOfView
            }} />
            {(loading) && <ActivityIndicator size='large' color={theme.colors.primary}
                style={{
                    position: 'absolute',
                    // left: screenWidth / 2,
                    top: '50%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    zIndex: 3
                }}
            />}
            <ScrollView
                ref={scrollRef}
                onContentSizeChange={(contentHeight) => setContentHeight(contentHeight)}
                keyboardShouldPersistTaps="handled" //https://www.codegrepper.com/code-examples/fortran/react-native+on+screen+click+keyboard+dismiss+how+to+stop+it+from+dismussing
                // https://medium.com/@akshay.s.somkuwar/dismiss-hide-keyboard-on-tap-outside-of-textinput-react-native-b94016f35ff0
                // TODO: ? keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
                showsVerticalScrollIndicator={false}
            >
                {/* Social Section */}
                {/* <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                    <Paragraph style={styles.sectionTitle}> Social Media </Paragraph>
                <SaveButton />
            </View> */}
                <SectionHeader sectionHeaderText="Social Media" />
                <MyShadowCard>
                    <View style={styles.socialMediaSection}>
                        {
                            socialLinkedIcons.map(({ setter, type, value }) => (
                                <TouchableOpacity key={type} style={{ marginHorizontal: 10 }}
                                    onPress={() => {
                                        setCurrentSocialEntry({ setter, type, editSocialEntry: true })
                                    }}
                                >
                                    <IconButton
                                        style={{
                                            opacity: (value) ? 1 : .5,
                                            backgroundColor: theme.colors.primary
                                        }}
                                        color={'white'}
                                        icon={type}
                                        size={30}
                                    />
                                </TouchableOpacity>
                            ))}
                    </View>
                    {
                        // TODO: Different keyboards for whatsap??
                        // TODO: Combine whatsapp and phone?
                        (currentSocialEntry.editSocialEntry)
                            ? <>
                                {/* <Paragraph style={{ alignSelf: 'center' }}> Click here for help! {_setHelperText(currentSocialEntry.type)}</Paragraph> */}
                                <Searchbar
                                    placeholder={_setHelperText(currentSocialEntry.type)}
                                    style={{ marginHorizontal: 25, marginVertical: 10 }}
                                    icon={currentSocialEntry.type}
                                    onChangeText={currentSocialEntry.setter}
                                    keyboardType={(currentSocialEntry.type !== 'whatsapp') ? "default" : 'phone-pad'}
                                    returnKeyType={"done"}
                                    autoCompleteType={"off"}
                                    autoCorrect={false}
                                    autoCapitalize={"none"}
                                    value={(currentSocialEntry.type !== 'whatsapp') ? eval(`updated_${currentSocialEntry.type}`) : '+1'}
                                />
                            </>
                            : null
                    }
                </MyShadowCard>
                {/* Form Section */}
                <SectionHeader sectionHeaderText="Personal" />
                <MyShadowCard>
                    {
                        formRows.map(({ left, subtitle, value, editFunc, keyboardType, autoCapitalize, multiline, isError, rowErrorMessage }) => (
                            ((isUserContactCard && !contactCardRowsToIgnore.includes(subtitle) || !isUserContactCard))
                                ? <Card.Actions style={styles.cardContent} key={subtitle} >
                                    <Avatar.Icon {...props} icon={left} size={40} style={{ marginRight: 20, backgroundColor: theme.colors.text, marginTop: -10 }} />
                                    <View style={{ flexDirection: 'column', width: '100%' }}>
                                        <TextInput mode="outlined"
                                            label={subtitle}
                                            onContentSizeChange={(event) => setNoteFormHeight(event.nativeEvent.contentSize.height)}
                                            style={{
                                                ...styles.textInput,
                                                // height: (subtitle !== 'notes') ? 45 : Math.min(120, Math.max(60, noteFormHeight))
                                            }}
                                            // placeholder={value}
                                            value={value}
                                            autoCapitalize={autoCapitalize || "none"}
                                            autoComplete={false}
                                            autoCorrect={false}
                                            autoCompleteType={"off"}
                                            onChangeText={editFunc}
                                            multiline={multiline}
                                            scrollEnabled={false}
                                            disabled={subtitle === "email" && isUserContactCard}
                                            keyboardType={keyboardType}
                                        />
                                        <HelperText type="error" visible={isError} >{rowErrorMessage}</HelperText>
                                    </View>
                                </Card.Actions>
                                : null
                        ))
                    }
                </MyShadowCard>
                {/* Tag Section */}
                {
                    (!isUserContactCard)
                        ? <>
                            {/* <Paragraph style={styles.sectionTitle}> Tags (select below) </Paragraph> */}
                            <SectionHeader sectionHeaderText="Tags" />
                            <MyShadowCard>

                                <View style={styles.chips}>
                                    {
                                        contextTags.map(({ tag, color }, index) =>
                                            (<Chip mode="outlined" style={styles.chip}
                                                key={tag + index + color}
                                                icon={'tag'}
                                                selectedColor={'blue'}
                                                selected={updated_tags.findIndex(tagObj => tagObj.tag === tag) !== -1}
                                                onPress={() => toggledSelected(tag, color)}
                                            >
                                                {tag}
                                            </Chip>)
                                        )
                                    }
                                </View>
                                {/* TODO:  learn to center these*/}
                                <MyTextInput value={newTag} onChangeText={setNewTag} style={{ height: 50, marginLeft: 30, width: '100%', textAlign: 'center' }} />
                                <Button onPress={() => _addTag(newTag)} disabled={!newTag}>
                                    Add Tag
                                </Button>
                            </MyShadowCard>
                        </>
                        : null
                }
                {/*  DATE SECTION */}
                {/* <Paragraph style={styles.sectionTitle}> Date Info </Paragraph> */}
                <SectionHeader sectionHeaderText="Date Info" />
                <MyShadowCard>
                    {
                        (!isUserContactCard)
                            ? <View style={{ alignItems: 'center' }}>
                                <Card.Actions style={styles.cardContent}>
                                    <TouchableOpacity onPress={() => setDatemet_Picker(!datemet_Picker)}>
                                        <Avatar.Icon {...props} icon={'calendar'} size={40} style={{ marginRight: 20, backgroundColor: theme.colors.text }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setDatemet_Picker(!datemet_Picker)}
                                        style={styles.textInput}
                                    >
                                        <Paragraph style={{ fontStyle: 'italic' }}> Date Met </Paragraph>
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
                                        <DateTimePicker
                                            value={updated_dateMet}
                                            display="default"
                                            style={{ width: '70%', alignSelf: 'center' }}
                                            onChange={(event, value) => {
                                                setDateMet(value)
                                                // setTimeout(() => setDatemet_Picker(false), 2000);
                                                setDatemet_Picker(false)
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
                                <Avatar.Icon {...props} icon={'calendar'} size={40} style={{ marginRight: 20, backgroundColor: theme.colors.text }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setBirth_datePicker(!birth_datePicker)}
                                style={styles.textInput}>
                                <Paragraph style={{ fontStyle: 'italic' }}> Birthday </Paragraph>
                                <TextInput
                                    onTouchStart={() => setBirth_datePicker(!birth_datePicker)}
                                    disabled={true}
                                    value={moment(updated_birthday).format('MMM DD, YYYY')}
                                />
                            </TouchableOpacity>
                        </Card.Actions>
                        {
                            (birth_datePicker)
                                ? <DateTimePicker
                                    value={updated_birthday}
                                    display="default"
                                    style={{ width: '70%', alignSelf: 'center' }}
                                    onChange={(e, value) => {
                                        // console.log('birthday value', value, new Date(value).getTime(), Date.now())
                                        setBirthday(value)
                                        // if (value) setBirthday(value);
                                        // else if (!value && updated_birthday !== '') setBirthday(updated_birthday);
                                        // else setBirthday(Date.now());
                                        // setTimeout(() => setBirth_datePicker(false), 2000);
                                        setBirth_datePicker(false)
                                    }}
                                />
                                : null
                        }
                    </View>
                </MyShadowCard>
                {/* <Paragraph style={styles.sectionTitle}> Location Section (please select below)</Paragraph> */}
                <SectionHeader sectionHeaderText="Location Section (please select below)" />
                <MyShadowCard>
                    {/* Location Section */}
                    <TouchableOpacity
                        onPress={() => _makeLocationObject({
                            location: currentLocation, formatted_address: geoCodedLocation, name: ""
                        }, "default_home", setUpdated_homeLocation)}>
                        <Paragraph style={{ alignSelf: 'center', color: 'blue', marginTop: 10 }}>
                            (Use location for home)
                    </Paragraph>
                    </TouchableOpacity>
                    <Card.Actions style={styles.cardContent}>
                        <Avatar.Icon {...props} icon={'crosshairs-gps'} size={40} style={{ marginRight: 10, backgroundColor: theme.colors.text }} />
                        <PlacesInput
                            googleApiKey={GOOGLE_API_KEY}
                            onSelect={place => {
                                _makeLocationObject(place.result, 'home', setUpdated_homeLocation)
                            }}
                            placeHolder={(updated_homeLocation && updated_homeLocation.homeFormatted_address) ? updated_homeLocation.homeFormatted_address : "Home location"}
                            query={(updated_homeLocation && updated_homeLocation.homeFormatted_address) ? updated_homeLocation.homeFormatted_address : ""}
                            language={"en-US"}
                            textInputProps={{
                                autoCorrect: false,
                                fontWeight: 'bold'
                            }}
                            // clearQueryOnSelect={true}
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
                            ? <View style={{ marginBottom: 10 }}>
                                <TouchableOpacity
                                    onPress={() => _makeLocationObject({
                                        location: currentLocation, formatted_address: geoCodedLocation, name: ""
                                    }, "default_place_met", setUpdated_placeMetAt)}>
                                    <Paragraph style={{ alignSelf: 'center', color: 'blue' }}>
                                        (Use location for place met)
                                </Paragraph>
                                </TouchableOpacity>
                                <Card.Actions style={styles.cardContent}>
                                    {/* TODO: SET NAME??? */}
                                    <Avatar.Icon {...props} icon={'crosshairs-gps'} size={40} style={{ marginRight: 10, backgroundColor: theme.colors.text }} />
                                    <PlacesInput
                                        googleApiKey={GOOGLE_API_KEY}
                                        onSelect={place => {
                                            _makeLocationObject(place.result, 'place_met', setUpdated_placeMetAt)
                                            // console.log(place.result)
                                        }}
                                        placeHolder={updated_placeMetAt.placeMetAtFormatted_address || geoCodedLocation || "Place you met!"}
                                        language={"en-US"}
                                        onChangeText={() => scrollRef.current?.scrollToEnd()}
                                        textInputProps={{
                                            autoCorrect: false,
                                            fontWeight: 'bold',
                                        }}
                                        query={updated_placeMetAt.placeMetAtFormatted_address || geoCodedLocation}
                                        // clearQueryOnSelect={true}
                                        stylesContainer={{
                                            position: 'relative',
                                            alignSelf: 'center',
                                            margin: 0,
                                            width: '80%',
                                            marginBottom: 10
                                        }}
                                        ref={placeInputRef}
                                        stylesList={{
                                            position: 'absolute',
                                            bottom: (placeInputRef.current) ? placeInputRef.current.height : 0
                                        }}
                                    />
                                </Card.Actions>
                            </View>
                            : null
                    }
                </MyShadowCard>
                <View style={styles.errorSection}>
                    {(isApiLoading) && <ActivityIndicator animating={true} size={'large'} />}
                    {(!canAddNewRose) ? <Text style={styles.errorMessage}> You should enter a name for this Rose </Text> : null}
                    {(isPhoneValid) ? <Text style={styles.errorMessage}> Phone # must be at least 8 digits </Text> : null}
                    {(errorMessage) ? <Text style={styles.errorMessage}> {errorMessage} </Text> : null}
                    {/* <Button disabled={!canAddNewRose || isUserEdited || isApiLoading || isPhoneValid} */}
                </View>
                {
                    (addNewRoseRoute)
                        ? <Button disabled={!canAddNewRose || isPhoneValid}
                            // onPress={() => saveOrSubmitPassedDownAction(updatedUser)}
                            onPress={saveFromHeader}
                        >
                            {form_updateFunctionText || 'Add New'}
                        </Button>
                        : <Button disabled={isUserNotEdited || isApiLoading || isPhoneValid || loading}
                            onPress={saveFromHeader}
                        >
                            {form_updateFunctionText || 'Save Rose'}
                        </Button>
                }
                <Button
                    onPress={() => {
                        _clearFormData();
                        form_secondFunction();
                    }}
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
        width: '100%',
        marginBottom: 5
    },
    // TODO:
    textInput: {
        width: '70%',
        flex: 1
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 1,
        marginLeft: 8
    },
    sectionTitleSaveButton: {
        marginTop: 20,
        color: 'blue',
        marginBottom: 1,
        marginRight: 15
    },
    chips: {
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 10,
        flexWrap: 'wrap',
        paddingHorizontal: 5,
    },
    chip: {
        marginHorizontal: 5,
        marginVertical: 5
    },
    socialMediaSection: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
    },
    errorMessage: {
        color: 'red',
        margin: 10
    },
    errorSection: {
        alignItems: 'center'
    }
});

export default RoseForm;