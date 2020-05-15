// FIXME: Make this ALSO work without always going to store

import createDataContext from './createDataContext';
import { AsyncStorage } from 'react-native';
//import tagyApi from '../api/tagyApi';

// Reducer
const TagReducer = (state, action) => {
    switch (action.type) {
        case 'get_initial_tags':
            return { ...state, tags: action.payload };
        case 'get_tags':
            return { ...state };
        case 'add_tag':
            return { ...state, tags: [...state.tags, action.payload] };
        case 'delete_tag':
            return { ...state, tags: action.payload };
        default:
            return state;
    }
}
// ────────────────────────────────────────────────────────────────────────────────

// List of action functions
const getTags = (dispatch) => async () => {
    try {
        /* -------------------------------------------------------------------------- */
        // API Section here//
        /* -------------------------------------------------------------------------- */
        dispatch({ type: "get_tags" });
    } catch (err) {
        console.log(err.message);
        // dispatch({ type: "add_error_message", payload: err.message });
    }
}

const getInitialTags = (dispatch) => async () => {
    try {
        /* -------------------------------------------------------------------------- */
        // API Section here//
        /* -------------------------------------------------------------------------- */
        const tagStringArray = await AsyncStorage.getItem('tags');
        if (tagStringArray) {
            // ───  ────────────────────────────────────────────────────────────
            // FIXME: This experimental when needed to reset cache
            // await AsyncStorage.removeItem('tags');
            // ─────────────────────────────────────────────────────────────────
            console.log('tagStringArray', tagStringArray);
            const tags = JSON.parse(tagStringArray);
            dispatch({ type: "get_initial_tags", payload: [...(tags || [])] });
        } else {
            console.log('there are no tags');
            dispatch({ type: "get_initial_tags", payload: [] });
        }
    } catch (err) {
        console.log(err.message);
        // dispatch({ type: "add_error_message", payload: err.message });
    }
}


const addTag = (dispatch) => async (tag) => {
    try {
        /* -------------------------------------------------------------------------- */
        // API Section here//
        /* -------------------------------------------------------------------------- */
        // FIXME: PULL FROM CURRENT STATE???
        console.log(tag);
        const tags = await AsyncStorage.getItem('tags')
            .then(req => JSON.parse(req));
        console.log(tags);
        const updatedTagList = [...(tags || []), tag];
        console.log(updatedTagList);
        await AsyncStorage.setItem('tags', JSON.stringify(updatedTagList));
        dispatch({ type: "add_tag", payload: tag });
        //callback();
    } catch (err) {
        console.log(err.message);
        // dispatch({ type: "add_error_message", payload: err.message });
    }
}

const deleteTag = (dispatch) => async (tag) => {
    try {
        /* -------------------------------------------------------------------------- */
        // API Section here//
        /* -------------------------------------------------------------------------- */
        // FIXME: PULL FROM CURRENT STATE???
        const tags = await AsyncStorage.getItem('tags')
            .then(req => JSON.parse(req));
        // TODO: Find first?
        const updatedTagList = tags.filter(tg => tag !== tg);
        // console.log(updatedTagList);
        await AsyncStorage.setItem('tags', JSON.stringify(updatedTagList));
        dispatch({ type: "delete_tag", payload: updatedTagList });
        // callback();
    } catch (err) {
        console.log(err.message);
        // dispatch({ type: "add_error_message", payload: err.message });
    }
}
// ────────────────────────────────────────────────────────────────────────────────


//Main
export const { Context, Provider } = createDataContext(
    TagReducer, // reducer
    { addTag, deleteTag, getInitialTags, getTags }, //list of action functions
    { tags: [], errorMessage: '' } //default state values
);
