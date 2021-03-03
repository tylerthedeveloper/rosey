import React, { useContext, useEffect, useState } from 'react';
import { Share, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { RoseHeader } from './partial';
import { RoseForm, RoseView } from './view';
import Constants from '../constants';
import { MyShadowCard } from './memo';
import { AuthContext } from '../context/AuthContext';
import { Context as RoseContext } from '../context/RoseContext';


// TODO: Clean props!
// navigation, props, view_updateFunction, form_secondFunction
const RoseViewContainer = ({
    user, isApiLoading, errorMessage,
    view_updateFunctionText, view_secondFunction, view_secondFunctionText,
    view_updateFunction_callback,
    form_updateFunction, form_updateFunctionText, form_secondFunctionText,
    form_updateFunction_callback
}) => {

    const { homeLocation, name, picture, phoneNumber, email } = user || {};
    const { homeCity, homeState, homeCountry } = homeLocation || {};

    const [editing, setEditing] = useState(false);
    const _setEditing = (editing) => setEditing(editing);
    const isUserContactCard = (view_updateFunctionText === 'Update your contact card');

    // const { updateContactCard } = useContext(AuthContext);
    // const { addRose } = useContext(RoseContext);
    // const functionToSaveCardForUserOrRose = (isUserContactCard) ? updateContactCard : addRose;
    // const headerToContainer = () => alert('aaaaaa')

    // const [_user, set_user] = useState(user)
    // useEffect(() => {
    //     console.log(_user.name)
    // }, [_user])

    const callForm_updateFunction_callback = (obj) => {
        if (!form_updateFunction_callback) {
            setEditing(false);
        } else {
            form_updateFunction_callback(obj);
            setEditing(false);
        }
    };

    const callFormUpdateFunction = (obj) => {
        form_updateFunction({ roseObj: obj, callback: () => callForm_updateFunction_callback(obj) });
    }

    return (
        <>
            {/* <MyShadowCard> */}
            {/* <RoseHeader {...{
                name, picture, homeCity, homeState, homeCountry, isUserContactCard, editing, _setEditing, shareProfile: () => Constants._shareProfile(user._id),
                phoneNumber, email, //headerToContainer
            }} /> */}
            {/* </MyShadowCard> */}
            {
                (!editing)
                    ? <RoseView
                        {...{
                            // view_updateFunction, seconf... TODO:
                            user, isApiLoading, view_updateFunction: () => setEditing(true), view_updateFunctionText,
                            view_secondFunction, view_secondFunctionText, view_updateFunction_callback,
                            editing, _setEditing
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
                        // childStateUserHandler={set_user}
                        // form_updateFunction_callback
                        form_updateFunction_callback={(obj) => {
                            if (!form_updateFunction_callback) {
                                setEditing(false);
                            } else {
                                form_updateFunction_callback(obj);
                                setEditing(false);
                            }
                        }}
                        saveOrSubmitPassedDownAction={callFormUpdateFunction}
                        {...{ editing, _setEditing }}
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
        marginVertical: 20,
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 1,
    }
})

export default RoseViewContainer;