
// FIXME: 
// 1. try to separate fetch all roses and fetch initial roses
// chagne this to only PULL from local when needed 

import { AsyncStorage } from 'react-native';
import shortid from 'shortid';
import createDataContext from './createDataContext';
import Constants from '../constants';

const roseReducer = (state, action) => {
    const { payload } = action;
    switch (action.type) {
        case 'fetch_roses':
            return { ...state, roses: payload };
        case 'add_rose':
            return { ...state, roses: [...state.roses, payload] };
        case 'edit_rose':
            return { ...state, roses: payload };
        case 'add_batch_roses':
            return { ...state, roses: [...state.roses, ...payload] };
        case 'delete_rose':
            return { ...state, roses: payload };
        case 'add_error_message':
            return { ...state, errorMessage: payload };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        default:
            return state;
    }
}

const addRose = (dispatch) => async ({ roseObj, callback }) => {
    try {
        /* -------------------------------------------------------------------------- */
        // const response = await roseyApi.post('/roses', roseData);
        // const newRose = response.data.rose;
        /* -------------------------------------------------------------------------- */
        const roseId = (roseObj.name) ? shortid.generate(roseObj.name) : shortid.generate();
        roseObj.roseId = roseId;
        // console.log('added rose', roseObj)
        // FIXME: PULL FROM CURRENT STATE???
        const roses = await AsyncStorage.getItem('roses')
            .then(req => JSON.parse(req));
        // console.log('roses from added', roses);
        const updatedRoseList = [...(roses || []), roseObj];
        // console.log(' updatedRoseList', updatedRoseList);
        await AsyncStorage.setItem('roses', JSON.stringify(updatedRoseList));
        dispatch({ type: "add_rose", payload: roseObj });
        callback(roseObj);
    } catch (err) {
        console.log(err.message);
        dispatch({ type: "add_error_message", payload: err.message });
    }
}

const _extractContactToRose = (contact) => {
    // console.log('contact', contact)
    const { email, name, nickName, phoneNumbers } = contact;
    const newRose = Constants._generateUser({ name, email });
    if (name) newRose.name = name;
    if (email) newRose.email = email;
    if (nickName) newRose.nickName = nickName;
    // FIXME: get work?
    // FIXME: get birthday?
    // FIXME: what else...
    if (phoneNumbers && phoneNumbers.length > 0 && phoneNumbers[0] && phoneNumbers[0].digits) {
        // FIXME: Country code
        // TODO: do i need if for country code?
        // const countryCode = someLookUpForCountryCode(newRose.phoneNumbers[0].countryCode);
        // newRose.phoneNumber = `+${countryCode} + ${phoneNumbers[0].digits}`;
        newRose.phoneNumber = phoneNumbers[0].digits;
    }
    newRose.roseId = (contact.name) ? shortid.generate(contact.name) : shortid.generate();
    // console.log(newRose);
    return newRose;
}

const batch_addRoses = (dispatch) => async ({ contactList, callback }) => {
    try {
        /* -------------------------------------------------------------------------- */
        // const response = await roseyApi.post('/roses', roseData);
        // const newRose = response.data.rose;
        /* -------------------------------------------------------------------------- */
        // console.log('contactList', contactList)
        const newContactsConveretedToRoses = contactList.map(ct => _extractContactToRose(ct));
        console.log('newContactsConveretedToRoses', newContactsConveretedToRoses);
        const roses = await AsyncStorage.getItem('roses')
            .then(req => JSON.parse(req));
        const updatedRoseList = [...(roses || []), ...newContactsConveretedToRoses];
        // console.log(' updatedRoseList', updatedRoseList);
        await AsyncStorage.setItem('roses', JSON.stringify(updatedRoseList));
        dispatch({ type: "add_batch_roses", payload: newContactsConveretedToRoses });
        callback();
    } catch (err) {
        console.log(err.message);
        dispatch({ type: "add_error_message", payload: err.message });
    }
}

const editRose = (dispatch) => async ({ roseObj, callback }) => {
    try {
        /* -------------------------------------------------------------------------- */
        // const response = await roseyApi.post('/roses', roseData);
        // const newRose = response.data.rose;
        /* -------------------------------------------------------------------------- */
        // console.log('current rose', roseObj);
        const roses = await AsyncStorage.getItem('roses')
            .then(req => JSON.parse(req));
        // console.log('roses', roses);
        const updatedRoseList = roses.map(rose => {
            // console.log(rose.name, roseObj.roseId, rose.roseId)
            if (rose.roseId && roseObj.roseId === rose.roseId) {
                return roseObj
            }
            return rose;
        });
        // console.log('updatedRoseList', updatedRoseList);
        await AsyncStorage.setItem('roses', JSON.stringify(updatedRoseList));
        dispatch({ type: "edit_rose", payload: updatedRoseList });
        callback(roseObj);
    } catch (err) {
        console.log(err.message);
        dispatch({ type: "add_error_message", payload: err.message });
    }
}

const fetchAllRoses = (dispatch) => async () => {
    try {
        /* -------------------------------------------------------------------------- */
        // const response = await roseyApi.get('/roses');
        // const roses = response.data.roses;
        // dispatch({ type: "fetch_roses", payload: roses });
        /* -------------------------------------------------------------------------- */
        const roseStringArray = await AsyncStorage.getItem('roses');
        if (roseStringArray) {
            //
            // ───  ────────────────────────────────────────────────────────────
            // FIXME: This experimental when needed to reset cache
            // await AsyncStorage.removeItem('roses');
            // ────────────────────────────────────────────────────────────────────────────────
            const roses = JSON.parse(roseStringArray);
            dispatch({ type: "fetch_roses", payload: [...(roses || [])] });
        } else {
            await AsyncStorage.setItem('roses', JSON.stringify([Constants.my_personal_card]));
            dispatch({ type: "fetch_roses", payload: [Constants.my_personal_card] });
        }
    } catch (err) {
        console.log(err.message);
        dispatch({ type: "add_error_message", payload: err.message });
    }
}

const deleteRose = (dispatch) => async ({ roseId, callback }) => {
    try {
        /* -------------------------------------------------------------------------- */
        // const response = await roseyApi.delete('/roses', roseId);
        /* -------------------------------------------------------------------------- */
        // FIXME: PULL FROM CURRENT STATE???
        const roses = await AsyncStorage.getItem('roses')
            .then(req => JSON.parse(req));
        const updatedRoseList = roses.filter(rose => rose.roseId !== roseId);
        await AsyncStorage.setItem('roses', JSON.stringify(updatedRoseList));
        dispatch({ type: "delete_rose", payload: updatedRoseList });
        callback();
    } catch (err) {
        console.log(err.message);
        dispatch({ type: "add_error_message", payload: err.message });
    }
}

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'clear_error_message' });
};

export const { Context, Provider } = createDataContext(
    roseReducer, // reducer
    { fetchAllRoses, clearErrorMessage, addRose, editRose, deleteRose, batch_addRoses }, //list of action functions
    {
        roses: [], errorMessage: ''
    } //default state values
);
