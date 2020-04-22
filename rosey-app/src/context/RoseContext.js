import createDataContext from './createDataContext';
import roseyApi from '../api/roseyApi';
import { navigate } from "../../navigationRef";

// Reducer
const roseReducer = (state, action) => {
    switch (action.type) {
        case 'add_rose':
            return { ...state, roses: [...state.roses, action.payload] };
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
// 

// List of action functions
const fetchOneRose = (dispatch) => async () => { }

const addRose = (dispatch) => async (roseData) => {
    if (!roseData) {
        // TODO:?
    }
    try {
        const response = await roseyApi.post('/roses', roseData);
        const newRose = response.data.rose;
        console.log(newRose)
        dispatch({ type: "add_rose", payload: newRose });
    } catch (err) {
        console.log(err.message);
        dispatch({ type: "add_error_message", payload: err.message });
    }
}

const updateRose = (dispatch) => () => async ({ roseId, roseData }) => { }

const fetchAllRoses = (dispatch) => async () => {
    try {
        const response = await roseyApi.get('/roses');
        const roses = response.data.roses;
        dispatch({ type: "fetch_roses", payload: roses });
    } catch (err) {
        console.log(err.message);
        dispatch({ type: "add_error_message", payload: err.message });
    }
}

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'clear_error_message' });
};


//Main
export const { Context, Provider } = createDataContext(
    roseReducer, // reducer
    { fetchAllRoses, clearErrorMessage, addRose }, //list of action functions
    { roses: [], errorMessage: '' } //default state values
);
