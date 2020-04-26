import React, { useState, Fragment } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import RoseCardField from '../paper-components/RoseCardField';
import RoseHeader from '../paper-components/RoseHeader';
import RoseForm from '../paper-components/RoseForm';

// TODO: get better colored background
const RoseView = ({
    navigation, props, user, updateFunction, updateFunctionText,
    secondFunction, secondFunctionText
}) => {

    const { birthday, email, homeLocation, name, nickName, phoneNumber, placeMetAt, picture, tags, work } = user;

    // TODO: Parse objects...

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

    const rows = [
        {
            value: name || '(No-Name?)', subtitle: 'name',
            left: "account",
            rightIcon: "account-plus",
            rightFunc: () => { },
            editFunc: setName
        },
        {
            value: nickName || '(No-nickName?)', subtitle: 'nickname',
            left: "account",
            rightIcon: "account-plus",
            rightFunc: () => { },
            editFunc: setNickName
        },
        {
            value: phoneNumber || '(123456789)', subtitle: 'phone',
            left: "phone",
            rightIcon: "phone",
            rightFunc: () => { },
            editFunc: setPhone
        },
        {
            value: updated_email, subtitle: 'email',
            left: "email",
            rightIcon: "email",
            rightFunc: () => { },
            editFunc: setEmail
        },
        {
            value: work || '(Add Occupation!)', subtitle: 'occupation',
            left: "briefcase-account",
            rightIcon: "briefcase-plus",
            rightFunc: () => { },
            editFunc: setWork
        },
        {
            value: (tags && tags.length > 0) ? tags : '(Add some Tags!)', subtitle: 'tag',
            left: "tag",
            rightIcon: "tag",
            rightFunc: () => { },
            editFunc: setTags
        },
        {
            value: birthday || '(Enter Birthday!)', subtitle: 'birthday',
            left: "calendar",
            rightIcon: "calendar-heart",
            rightFunc: () => { },
            editFunc: setBirthday
        },
    ];

    const [editing, setEditing] = useState(false);
    // console.log('user before', user)
    console.log('updatedUser', updatedUser)

    return (
        <>
            <Card style={styles.card}>
                <RoseHeader {...{ name, picture, city, state, country }} />
            </Card >
            {/* <View style={{ flex: 1, marginBottom: 20 }}> */}
            <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1, }}
                keyboardVerticalOffset={100}
            >
                <ScrollView >
                    {/* VIEW */}
                    {
                        (!editing)
                            ? rows.map(({ value, subtitle, left, rightIcon, rightFunc }) => (
                                <RoseCardField
                                    key={value}
                                    value={value}
                                    subtitle={subtitle}
                                    left={left}
                                    rightIcon={rightIcon}
                                    rightFunc={rightFunc}
                                />
                            ))
                            :
                            rows.map((row) => (
                                <Card.Actions style={styles.cardContent} key={row.subtitle}>
                                    <Avatar.Icon {...props} icon={row.left} size={40} style={{ marginRight: 20 }} />
                                    <TextInput mode="outlined"
                                        label={row.subtitle}
                                        // placeholder={value}
                                        style={styles.tI}
                                        autoCapitalize="none"
                                        autoComplete={false}
                                        defaultValue={row.value}
                                        autoCorrect={false}
                                        autoCompleteType={"off"}
                                        onChangeText={row.editFunc}
                                    />
                                </Card.Actions>
                            ))
                    }
                    {/* First Button */}
                    {
                        (!editing)
                            ? <Button onPress={() => setEditing(true)}> {updateFunctionText} </Button>
                            : <Button onPress={() => {
                                console.log("going to update profile");
                                // updateProfile({ name: "new Name2" })
                                // { updateFunction() }
                                // setTimeout(() => setEditing(false), 3000);
                                setEditing(false);
                                console.log("updated profile");
                            }}>
                                Save
                            </Button>
                    }
                    <Button title={secondFunctionText} onPress={secondFunction} > {secondFunctionText} </Button>
                </ScrollView>
            </KeyboardAvoidingView>
            {/* </View> */}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'flex-start',
    },
    card: {
        // borderWidth: 1,
        // paddingBottom: 10,
    },
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 22,
        paddingRight: 20,
        marginTop: 3,
        marginLeft: 2,
        marginBottom: 5
    },
    textInput: {
        width: '70%'
    }
})

export default RoseView;