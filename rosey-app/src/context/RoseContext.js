import createDataContext from './createDataContext';
import roseyApi from '../api/roseyApi';
import { navigate } from "../../navigationRef";

// Reducer
const roseReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_rose':
            return state;
        case 'fetch_roses':
            return { ...state, roses: action.payload };
        default:
            return state;
    }
}
// 

// List of action functions
const fetchOneRose = (dispatch) => async () => { }

const addRose = (dispatch) => () => async ({ roseData }) => { }

const updateRose = (dispatch) => () => async ({ roseId, roseData }) => { }

const fetchAllRoses = (dispatch) => async () => {
    const response = await roseyApi.get('/roses');
    // console.log(response.data);
    const roses = response.data.roses;
    dispatch({ type: "fetch_roses", payload: roses });
}

//Main
export const { Context, Provider } = createDataContext(
    roseReducer, // reducer
    { fetchAllRoses }, //list of action functions
    { roses: [] } //default state values
);
