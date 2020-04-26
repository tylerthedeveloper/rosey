import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import RoseViewContainer from '../paper-components/RoseViewContainer';

const ProfileScreen = () => {

    const { state: { user }, updateProfile, signout } = useContext(AuthContext);
    return (
        <RoseViewContainer {...{
            user, 
            view_updateFunctionText: "Update your profile",
            view_secondFunction: signout, view_secondFunctionText: "Logout",
            form_updateFunction: updateProfile, form_updateFunctionText: "Save profile",
            form_secondFunctionText: "Cancel"
        }} />
    )
}

export default ProfileScreen;