import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import RoseCardField from '../paper-components/RoseCardField';
import RoseHeader from '../paper-components/RoseHeader';
// import RoseForm from '../paper-components/RoseForm';

// TODO: get better colored background
const RoseView = ({
    navigation, props, user, updateFunction, updateFunctionText,
    secondFunction, secondFunctionText
}) => {

    const { birthday, email, homeLocation, name, nickName, phoneNumber, placeMetAt, picture, tags, work
    } = user;
    
    const [updated_email, setEmail] = useState(email);

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
            // rightFunc: () => setName(updated_name)
        },
        {
            value: nickName || '(No-nickName?)', subtitle: 'nickname',
            left: "account",
            rightIcon: "account-plus",
            // rightFunc: () => setName(updated_nickName)
        },
        {
            value: phoneNumber || '(123456789)', subtitle: 'phone',
            left: "phone",
            rightIcon: "phone",
            // rightFunc: () => { setPhone(updated_phoneNumber) }
        },
        {
            value: updated_email || '(someone@...)', subtitle: 'email',
            left: "email",
            rightIcon: "email",
            // rightFunc: () => { setEmail(updated_placeMetAt) }
        },
        {
            value: work || '(Add Occupation!)', subtitle: 'occupation',
            left: "briefcase-account",
            rightIcon: "briefcase-plus",
            // rightFunc: () => { setWork(updated_work) }
        },
        {
            value: (tags && tags.length > 0) ? tags : '(Add some Tags!)', subtitle: 'tag',
            left: "tag",
            rightIcon: "tag",
            // rightFunc: () => { }
        },
        {
            value: birthday || '(Enter Birthday!)', subtitle: 'birthday',
            left: "calendar",
            rightIcon: "calendar-heart",
            // rightFunc: () => { }
        },
    ];

    const [editing, setEditing] = useState(false);
    console.log('user before', user)
    // console.log('updatedUser', updatedUser)

    return (
        <>
            <Card style={styles.card}>
                <RoseHeader {...{ name, picture, city, state, country }} />
            </Card >
            {/* <KeyboardAvoidingView behavior={'padding'} style={{ marginBottom: 20}}> */}
            <View style={{ flex: 1 }}>
                <ScrollView
                // style={{ position: 'absolute' }}
                // contentContainerStyle={{ flex: 0 }}
                >
                    {
                        (!editing)
                            ? rows.map(({ value, subtitle, left, rightIcon, rightFunc }) => (
                                <RoseCardField
                                    key={value}
                                    title={value}
                                    subtitle={subtitle}
                                    left={left}
                                    rightIcon={rightIcon}
                                // rightFunc={rightFunc}
                                />
                            ))
                            // : <RoseForm {...{ rows, user }} 
                            // />
                            : rows.map(({ value, subtitle, left, rightIcon, rightFunc }) => (
                                <Card.Actions style={styles.cardContent} key={value}>
                                    <Avatar.Icon {...props} icon={left} size={40}
                                        style={{ marginRight: 20 }}
                                    />
                                    <TextInput mode="outlined"
                                        label={subtitle}
                                        value={value}
                                        style={styles.tI}
                                        autoCapitalize="none"
                                        autoComplete={false}
                                        autoCorrect={false}
                                        autoCompleteType={"off"}
                                        onChangeText={text => console.log(text)}
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
                                // { updateFunction() }
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