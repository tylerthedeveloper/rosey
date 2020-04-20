import React, { useReducer } from 'react';

export default (reducer, actions, defaultValue) => {
    const Context = React.createContext();
    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);
        const boundActions = {};
        for (action in actions) {
            boundActions[action] = actions[action](dispatch);
        }
        return (
            <Context.Provider value={{ state, ...boundActions }} >
                {children}
            </Context.Provider>
        )
    }
    return { Context, Provider }
};