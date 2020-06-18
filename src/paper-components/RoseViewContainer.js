import React, { useState } from 'react';
import { Share, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { RoseHeader } from './partial';
import { RoseForm, RoseView } from './view';

// TODO: Clean props!
// navigation, props, view_updateFunction, form_secondFunction
const RoseViewContainer = ({
    user, isApiLoading, errorMessage,
    view_updateFunctionText, view_secondFunction, view_secondFunctionText,
    view_updateFunction_callback,
    form_updateFunction, form_updateFunctionText, form_secondFunctionText,
    form_updateFunction_callback
}) => {

    const { homeLocation, name, picture, tags } = user || {};
    const { homeCity, homeState, homeCountry } = homeLocation || {};

    const [editing, setEditing] = useState(false);
    const _setEditing = (editing) => setEditing(editing);
    const isUserContactCard = (view_updateFunctionText === 'Update your contact card');

    // let redirectUrl = `http://localhost:3000/users/app'?userID=${user._id}`;
    const redirectUrl = `https://rosey-server.herokuapp.com/users/app?userID=${user._id}`;

    const shareProfile = async () => {
        try {
            // const result =
            await Share.share({
                title: 'App link',
                message: 'Share your contact card with existing friends',
                url: redirectUrl
            });
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <>
            <Card style={styles.card}>
                <RoseHeader {...{ name, picture, homeCity, homeState, homeCountry, isUserContactCard, editing, _setEditing, shareProfile }} />
            </Card >
            {
                (!editing)
                    ? <RoseView
                        {...{
                            // view_updateFunction, seconf... TODO:
                            user, isApiLoading, view_updateFunction: () => setEditing(true), view_updateFunctionText,
                            view_secondFunction, view_secondFunctionText, view_updateFunction_callback
                        }}
                    />
                    : <RoseForm
                        user={user}
                        isApiLoading={isApiLoading}
                        errorMessage={errorMessage}
                        form_updateFunction={form_updateFunction}
                        form_updateFunctionText={form_updateFunctionText}
                        form_secondFunction={() => setEditing(false)}
                        form_secondFunctionText={form_secondFunctionText}
                        // form_updateFunction_callback
                        form_updateFunction_callback={(obj) => {
                            if (!form_updateFunction_callback) {
                                setEditing(false);
                            } else {
                                form_updateFunction_callback(obj);
                                setEditing(false);
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
    }
})

export default RoseViewContainer;