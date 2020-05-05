import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { RoseHeader } from './partial';
import { RoseForm, RoseView } from './view';

// TODO: Clean props!
// navigation, props, view_updateFunction, form_secondFunction
const RoseViewContainer = ({
    user,
    view_updateFunctionText, view_secondFunction, view_secondFunctionText,
    view_updateFunction_callback,
    form_updateFunction, form_updateFunctionText, form_secondFunctionText,
    form_updateFunction_callback
}) => {

    const {
        homeLocation, name, picture, tags
    } = user || {};

    const { homeCity, homeState, homeCountry } = homeLocation || {};

    const [editing, setEditing] = useState(false);

    return (
        <>
            <Card style={styles.card}>
                <RoseHeader {...{ name, picture, homeCity, homeState, homeCountry }} />
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
                                setEditing(false);
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
    }
})

export default RoseViewContainer;