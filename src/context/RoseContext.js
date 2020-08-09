
// FIXME: 
// 1. try to separate fetch all roses and fetch initial roses
// chagne this to only PULL from local when needed 

import { AsyncStorage } from 'react-native';
import shortid from 'shortid';
import createDataContext from './createDataContext';
import Constants from '../constants';
import { getAllRosesFromFirebase, addRoseToFirebase } from '../api/firebaseApi';
import firebase from 'firebase'

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
        const uid = firebase.auth().currentUser.uid;
        const response = await addRoseToFirebase(uid, roseObj);
        const didIReviewApp = await AsyncStorage.getItem('didIReviewApp');
        // FIXME: This is inefficient!!!!
        // FIXME: This is inefficient!!!!
        // MAYBE CAN STORE 'LENGTH IN FIRESTORE... at collection root
        // FIXME: This is inefficient!!!!A
        const length = (await getAllRosesFromFirebase(uid)).length
        dispatch({ type: "add_rose", payload: roseObj });
        if (didIReviewApp === null && length !== 10 && (length % 5 === 0 || length % 12 === 0)) {
            Constants._askForFeedbackReview();
        }
        callback(roseObj);
    } catch (err) {
        console.log(err.message);
        dispatch({ type: "add_error_message", payload: err.message });
    }
}

const _extractContactToRose = (contact) => {
    const { company, emails, name, nickname, phoneNumbers } = contact;
    let email = (emails && emails.length > 0) ? emails[0]['email'] : '';
    const newRose = Constants._generateUser({ name, email });
    // if (name) newRose.name = name;
    if (nickname) newRose.nickName = nickname;
    if (company) newRose.work = company;
    // FIXME: get work for android?
    // FIXME: get birthday?
    // FIXME: what else...
    if (phoneNumbers && phoneNumbers.length > 0 && phoneNumbers[0] && phoneNumbers[0].number) {
        // FIXME: Country code
        // TODO: do i need if for country code?
        // const countryCode = someLookUpForCountryCode(newRose.phoneNumbers[0].countryCode);
        // newRose.phoneNumber = `+${countryCode} + ${phoneNumbers[0].digits}`;
        newRose.phoneNumber = phoneNumbers[0].number;
    }
    newRose.roseId = (contact.name) ? shortid.generate(contact.name) : shortid.generate();
    return newRose;
}

const batch_addRoses = (dispatch) => async ({ contactList, callback }) => {
    try {
        /* -------------------------------------------------------------------------- */
        // const response = await roseyApi.post('/roses', roseData);
        // const newRose = response.data.rose;
        /* -------------------------------------------------------------------------- */
        const newContactsConveretedToRoses = contactList.map(ct => _extractContactToRose(ct));
        const roses = await AsyncStorage.getItem('roses')
            .then(req => JSON.parse(req));
        const updatedRoseList = [...(roses || []), ...newContactsConveretedToRoses];
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
        const roses = await AsyncStorage.getItem('roses')
            .then(req => JSON.parse(req));
        const updatedRoseList = roses.map(rose => {
            // console.log(rose.name, roseObj.roseId, rose.roseId)
            if (rose.roseId && roseObj.roseId === rose.roseId) {
                return roseObj
            }
            return rose;
        });
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
        const uid = firebase.auth().currentUser.uid;
        const roses = await getAllRosesFromFirebase(uid);
        if (roses && roses.length) {
            dispatch({ type: "fetch_roses", payload: [...(roses || [])] });
        } else {
            const response = await addRoseToFirebase(uid, Constants.my_personal_card);
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
