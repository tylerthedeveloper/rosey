import createDataContext from './createDataContext';
import { AsyncStorage } from 'react-native';
import Constants from '../constants';
import { getTagsFromFirebase, addTagToFirebase, deleteTagFromFirebase } from '../api/firebaseApi'
import firebase from 'firebase'

// Reducer
const TagReducer = (state, action) => {
    switch (action.type) {
        case 'get_initial_tags':
            return { ...state, tags: action.payload };
        case 'add_tag':
            return { ...state, tags: [...state.tags, action.payload] };
        case 'delete_tag':
            const tagId = action.payload;
            const updatedTagList = state.tags.filter(tg => tg.tagId !== tagId);
            return { ...state, tags: updatedTagList };
        default:
            return state;
    }
}
// ────────────────────────────────────────────────────────────────────────────────

// List of action functions
const getInitialTags = (dispatch) => async () => {
    try {
        /* -------------------------------------------------------------------------- */
        // API Section here//
        /* -------------------------------------------------------------------------- */
        // const tagStringArray = await AsyncStorage.getItem('tags');
        // if (tagStringArray && tagStringArray.length > 0) {
        //     const tags = JSON.parse(tagStringArray);
        //     // console.log('tagStringArray', tagStringArray, tagStringArray.length)
        //     dispatch({ type: "get_initial_tags", payload: [...(tags || [])] });
        // } else {
        //     // console.log('there are no tags');
        //     const tags = [{ tag: 'Friend', color: Constants.COLORS[0] }];
        //     await AsyncStorage.setItem('tags', JSON.stringify(tags));
        //     dispatch({ type: "get_initial_tags", payload: tags });
        // }
        const uid = firebase.auth().currentUser.uid;
        let tags = await getTagsFromFirebase(uid);
        if (tags && tags.length > 0) {
            dispatch({ type: "get_initial_tags", payload: [...(tags || [])] });
        } else {
            const tag = { tag: 'Friend', color: Constants.COLORS[0] };
            tags = [tag];
            await addTagToFirebase(uid, tag)
            dispatch({ type: "get_initial_tags", payload: tags });
        }
    } catch (err) {
        console.log(err.message);
        // dispatch({ type: "add_error_message", payload: err.message });
    }
}


const addTag = (dispatch) => async (tag) => {
    try {
        // const tags = await AsyncStorage.getItem('tags')
        //     .then(req => JSON.parse(req));
        // const updatedTagList = [...(tags || []), tag];
        // await AsyncStorage.setItem('tags', JSON.stringify(updatedTagList));
        // dispatch({ type: "add_tag", payload: tag });
        const uid = firebase.auth().currentUser.uid;
        const _tag = await addTagToFirebase(uid, tag);
        dispatch({ type: "add_tag", payload: _tag });
    } catch (err) {
        console.log(err.message);
        // dispatch({ type: "add_error_message", payload: err.message });
    }
}


const deleteTag = (dispatch) => async (tagId) => {
    try {
        // const tags = await AsyncStorage.getItem('tags')
        //     .then(req => JSON.parse(req));
        // const updatedTagList = tags.filter(tg => tag !== tg.tag);
        // await AsyncStorage.setItem('tags', JSON.stringify(updatedTagList));
        // dispatch({ type: "delete_tag", payload: updatedTagList });
        const uid = firebase.auth().currentUser.uid;
        await deleteTagFromFirebase(uid, tagId);
        dispatch({ type: "delete_tag", payload: tagId });
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
