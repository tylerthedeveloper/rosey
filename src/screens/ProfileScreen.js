import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import RoseView from '../paper-components/RoseView';

const ProfileScreen = () => {

    const { state: { user }, updateProfile, signout } = useContext(AuthContext);
    return (
        <RoseView {...{
            user, updateFunction: updateProfile, updateFunctionText: "Update your profile",
            secondFunction: signout, secondFunctionText: "Logout"
        }} />
    )
}

export default ProfileScreen;