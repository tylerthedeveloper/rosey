import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import RoseCardField from '../paper-components/RoseCardField';
import RoseHeader from '../paper-components/RoseHeader';

// TODO: get better colored background
const RoseView = ({
    navigation, props, user, updateFunction, updateFunctionText,
    secondFunction, secondFunctionText
}) => {

    const { email, tags, name, nickName, birthday, phoneNumber, picture,
        homeLocation, work
    } = user;
    // console.log('roseview: ', user)

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

    const [updated_phoneNumber, setPhone] = useState(phoneNumber);
    const [updated_email, setEmail] = useState(email);

    // TODO:
    const updatedUser = {
        phoneNumber: updated_phoneNumber,
        email: updated_email
    };

    const rows = [
        {
            title: name || '(No-Name?)', subtitle: 'name',
            left: "account",
            rightIcon: "account-plus",
            rightFunc: () => { }
        },
        {
            title: phoneNumber || '(123456789)', subtitle: 'phone',
            left: "phone",
            rightIcon: "phone",
            rightFunc: () => { setPhone('321') }
        },
        {
            title: email || '(someone@...)', subtitle: 'email',
            left: "email",
            rightIcon: "email",
            rightFunc: () => { setEmail('new email') }
        },
        {
            title: (tags && tags.length > 0) ? tags : '(Add some Tags!)', subtitle: 'tag',
            left: "tag",
            rightIcon: "tag",
            rightFunc: () => { }
        },
        {
            title: birthday || '(Enter Birthday!)', subtitle: 'birthday',
            left: "calendar",
            rightIcon: "calendar-heart",
            rightFunc: () => { }
        },
        {
            title: work || '(Add Occupation!)', subtitle: 'occupation',
            left: "briefcase-account",
            rightIcon: "briefcase-plus",
            rightFunc: () => { }
        },
    ];

    const [editing, setEditing] = useState(false);
    console.log('user before', user)
    console.log('updatedUser', updatedUser)

    return (
        <>
            <Card style={styles.card}>
                <RoseHeader {...{ name, picture, city, state, country }} />
            </Card >
            {/* <KeyboardAvoidingView behavior={'padding'} style={{ marginBottom: 20}}> */}
            <View style={{ flex: 1   }}>
                <ScrollView 
                    // style={{ position: 'absolute' }}
                    // contentContainerStyle={{ flex: 0 }}
                >
                    {
                        (!editing)
                            ? rows.map(({ title, subtitle, left, rightIcon, rightFunc }) => (
                                <RoseCardField
                                    key={title}
                                    title={title}
                                    subtitle={subtitle}
                                    left={left}
                                    rightIcon={rightIcon}
                                    rightFunc={rightFunc}
                                />
                            ))
                            // TODO: need to figure out form....
                            : rows.map(({ title, subtitle, left, rightFunc }) => (
                                <Card.Actions style={styles.cardContent} key={title}>
                                    <Avatar.Icon {...props} icon={left} size={40}
                                        style={{ marginRight: 20 }}
                                    />
                                    <TextInput mode="outlined"
                                        label={subtitle}
                                        value={title}
                                        style={styles.tI}
                                        autoCapitalize="none"
                                        autoComplete={false}
                                        autoCorrect={false}
                                        autoCompleteType={"off"}
                                    />
                                </Card.Actions>
                            ))
                    }
                    {
                        (!editing)
                            ? <Button onPress={() => setEditing(true)}>
                                {updateFunctionText}
                            </Button>
                            : <Button onPress={() => {
                                console.log("going to update profile");
                                // updateProfile({ name: "new Name2" })
                                { updateFunction() }
                                // setTimeout(() => setEditing(false), 3000);
                                setEditing(false);
                                console.log("updated profile");
                            }}>
                                Save
                    </Button>
                    }
                    <Button
                        title={secondFunctionText}
                        onPress={secondFunction}
                    >
                        {secondFunctionText}
                    </Button>
                </ScrollView>
            </View>
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
    tI: {
        width: '70%'
    }
})

export default RoseView;