import React, { useState, Fragment } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
// import RoseCardField from './RoseCardField';
import RoseHeader from './RoseHeader';
import RoseView from './RoseView';
import RoseForm from './RoseForm';

// TODO: get better colored background
const RoseViewContainer = ({
    navigation, props, user,
    view_updateFunction, view_updateFunctionText, view_secondFunction, view_secondFunctionText,
    view_updateFunction_callback,
    form_updateFunction, form_updateFunctionText, form_secondFunction, form_secondFunctionText,
    form_updateFunction_callback
}) => {

    const {
        birthday, email, homeLocation, name, nickName, phoneNumber, placeMetAt, picture, tags, work
    } = user || {} //;

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

    const [editing, setEditing] = useState(false);
    // console.log('user before', user)
    // console.log('updatedUser', updatedUser)

    return (
        <>
            <Card style={styles.card}>
                <RoseHeader {...{ name, picture, city, state, country }} />
            </Card >
            {
                (!editing)
                    ? <RoseView
                        {...{
                            // view_updateFunction, seconf... TODO:
                            user, view_updateFunction: () => setEditing(true), view_updateFunctionText,
                            view_secondFunction, view_secondFunctionText, view_updateFunction_callback
                        }}
                    />
                    : <RoseForm
                        user={user}
                        form_updateFunction={form_updateFunction}
                        form_updateFunctionText={form_updateFunctionText}
                        form_secondFunction={() => setEditing(false)}
                        form_secondFunctionText={form_secondFunctionText}
                        // form_updateFunction_callback
                        form_updateFunction_callback={(obj) => {
                            if (!form_updateFunction_callback) {
                                setEditing(false)
                            } else {
                                form_updateFunction_callback(obj);
                            }
                        }}
                    />
            }
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
        // flex: 1
    },
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
        alignSelf: 'flex-end'
    }
})

export default RoseViewContainer;