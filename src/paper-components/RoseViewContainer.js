import React, { useState } from 'react';
import { Share, StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { RoseHeader } from './partial';
import { RoseForm, RoseView } from './view';
import { Linking } from 'expo';

// TODO: Clean props!
// navigation, props, view_updateFunction, form_secondFunction
const RoseViewContainer = ({
    user,
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

    let redirectUrl = Linking.makeUrl('main/home/add', { hello: 'world', goodbye: 'now' }); //, { hello: 'world', goodbye: 'now' });

    const shareProfile = async () => {
        try {
            // const result =
            await Share.share({
                title: 'App link',
                message: 'Share your contact card with existing friends',
                url: redirectUrl //'exp://ve-9ga.tcitrin.rosey-app.exp.direct:80/--/main/home/add'
            });
            /*
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                    // console.log(result)
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
            */
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
                            console.log('obj', obj)
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