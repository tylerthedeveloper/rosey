import { AsyncStorage } from 'react-native';
import shortid from 'shortid';
import createDataContext from './createDataContext';

// TODO: Write to local 
const roseReducer = (state, action) => {
    switch (action.type) {
        case 'add_rose':
            return { ...state, roses: [...state.roses, action.payload] };
        case 'edit_rose':
            return { ...state, roses: action.payload };
        // case 'fetch_rose':
        //     return state;
        case 'fetch_roses':
            return { ...state, roses: action.payload };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        case 'add_error_message':
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
}

const fetchOneRose = (dispatch) => async () => { }

const addRose = (dispatch) => async ({ roseObj, callback }) => {
    // if (!roseObj) {
    //     // TODO:?
    // }
    try {
        /* -------------------------------------------------------------------------- */
        // const response = await roseyApi.post('/roses', roseData);
        // const newRose = response.data.rose;
        /* -------------------------------------------------------------------------- */
        // FIXME: BETTER GUID/UID 
        const roseId = (roseObj.name) ? shortid.generate(roseObj.name) : shortid.generate();
        roseObj.roseId = roseId;
        console.log('added rose', roseObj)
        // FIXME: PULL FROM CURRENT STATE???
        const roses = await AsyncStorage.getItem('roses')
            .then(req => JSON.parse(req));
        console.log('roses from added', roses);
        const updatedRoseList = [...(roses || []), roseObj];
        console.log(' updatedRoseList', updatedRoseList);
        await AsyncStorage.setItem('roses', JSON.stringify(updatedRoseList));
        dispatch({ type: "add_rose", payload: roseObj });
        callback(roseObj);
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
        // FIXME: BETTER GUID/UID 
        console.log('current rose', roseObj);
        const roses = await AsyncStorage.getItem('roses')
            .then(req => JSON.parse(req));
        console.log('roses', roses);
        const updatedRoseList = roses.map(rose => {
            console.log(rose.name, roseObj.roseId, rose.roseId)
            if (rose.roseId && roseObj.roseId === rose.roseId) {
                return roseObj
            }
            return rose;
        });
        console.log('updatedRoseList', updatedRoseList);
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
        // TODO: retireve from local?
        const roseStringArray = await AsyncStorage.getItem('roses');
        if (roseStringArray) {
            const roses = JSON.parse(roseStringArray);
            // console.log('fetchAllRoses', roses.length);
            dispatch({ type: "fetch_roses", payload: [...(roses || [])] });
        } else {
            // console.log('fetchAllRoses: none yet');
            dispatch({ type: "fetch_roses", payload: [] });
        }
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
    { fetchAllRoses, clearErrorMessage, addRose, editRose }, //list of action functions
    { roses: [], errorMessage: '' } //default state values
);
