import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import RoseViewContainer from '../../paper-components/RoseViewContainer';
import { Alert } from 'react-native';

const ContactCardScreen = () => {

    const { state: { user, isApiLoading, errorMessage }, updateContactCard, signout } = useContext(AuthContext);
    
    // TODO:P
    // console.log(user.uid)
    
    
    const tryToLogOut = () => {
        Alert.alert('Logout',
            'Are you sure you want to logout?',
            [
                { text: "Cancel", style: "destructive" },
                { text: "Logout", onPress: signout },
            ],
            { cancelable: true },
        )
    }

    return (
        <RoseViewContainer {...{
            user, isApiLoading, errorMessage,
            view_updateFunctionText: "Update your contact card",
            view_secondFunction: tryToLogOut, view_secondFunctionText: "Logout",
            form_updateFunction: updateContactCard, form_updateFunctionText: "Save contact card",
            form_secondFunctionText: "Cancel"
        }} />
    )
}

export default ContactCardScreen;