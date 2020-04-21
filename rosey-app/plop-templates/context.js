import createDataContext from './createDataContext';
import roseyApi from '../api/roseyApi';
import { navigate } from "../../navigationRef";

// Reducer
const {{name}}Reducer = (state, action) => {
    switch (action.type) {
        case '':
            return state;
        default:
            return state;
    }
}
// 

// List of action functions

//

//Main
export const { Context, Provider } = createDataContext(
    {{name}}Reducer, // reducer
    { }, //list of action functions
    {} //default state values
);
