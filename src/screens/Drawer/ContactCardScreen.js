import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import RoseViewContainer from '../../paper-components/RoseViewContainer';

const ContactCardScreen = () => {

    const { state: { user, isApiLoading, errorMessage }, updateContactCard, signout } = useContext(AuthContext);
    console.log('user', user)
    return (
        <RoseViewContainer {...{
            user, isApiLoading, errorMessage,
            view_updateFunctionText: "Update your contact card",
            view_secondFunction: signout, view_secondFunctionText: "Logout",
            form_updateFunction: updateContactCard, form_updateFunctionText: "Save contact card",
            form_secondFunctionText: "Cancel"
        }} />
    )
}

export default ContactCardScreen;