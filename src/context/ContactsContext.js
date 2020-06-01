import createDataContext from './createDataContext';
import { AsyncStorage } from 'react-native';

// Reducer
const ContactReducer = (state, action) => {
    const { payload } = action;
    switch (action.type) {
        case 'get_imported_contacts':
            return { ...state, contactsImported: payload || {} };
        case 'add_new_contacts':
            return { ...state, contactsImported: { ...state.contactsImported, ...payload } };
        case 'set_contacts':
            return { ...state, _contacts: payload };
        default:
            return state;
    }
}
// ────────────────────────────────────────────────────────────────────────────────

// List of action functions

const getImportedContacts = (dispatch) => async () => {
    try {
        /* -------------------------------------------------------------------------- */
        // API Section here//
        /* -------------------------------------------------------------------------- */
        const importedContactIDs = await AsyncStorage.getItem('importedContacts');
        if (importedContactIDs) {
            // ───  ────────────────────────────────────────────────────────────
            // FIXME: This experimental when needed to reset cache
            // await AsyncStorage.removeItem('importedContacts');
            // ─────────────────────────────────────────────────────────────────
            const parsedImportedContactIDs = JSON.parse(importedContactIDs);
            // dispatch({ type: "get_imported_contacts", payload: {...parsedImportedContactIDs} });
            dispatch({ type: "get_imported_contacts", payload: parsedImportedContactIDs });
        } else {
            dispatch({ type: "get_imported_contacts", payload: {} });
        }
    } catch (err) {
        console.log(err.message);
        // dispatch({ type: "add_error_message", payload: err.message });
    }
}

const updateImportedContacts = (dispatch) => async (updatedImportedContacts) => {
    try {
        /* -------------------------------------------------------------------------- */
        // API Section here
        /* -------------------------------------------------------------------------- */
        // FIXME: PULL FROM CURRENT STATE???
        const importedContacts = await AsyncStorage.getItem('importedContacts')
            .then(req => JSON.parse(req));
        const _updatedContacts = { ...importedContacts, ...updatedImportedContacts };
        await AsyncStorage.setItem('importedContacts', JSON.stringify(_updatedContacts));
        dispatch({ type: "add_new_contacts", payload: updatedImportedContacts });
    } catch (err) {
        console.log(err.message);
        // dispatch({ type: "add_error_message", payload: err.message });
    }
}

const _setContacts = (dispatch) => async (contacts) => {
    if (contacts) {
        dispatch({ type: "set_contacts", payload: contacts });
    }
}
// ────────────────────────────────────────────────────────────────────────────────


//Main
export const { Context, Provider } = createDataContext(
    ContactReducer, // reducer
    { getImportedContacts, updateImportedContacts, _setContacts }, //list of action functions
    { contactsImported: {}, _contacts: {}, contactsErrorMessage: '' } //default state values
);
