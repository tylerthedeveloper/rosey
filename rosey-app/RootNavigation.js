// import { NavigationActions } from 'react-navigation';

// let navigator;

// export const setNavigator = (nav) => {
//     navigator = nav;
// }

// export const navigate = (routeName, params) => {
//     navigator.dispatch(
//         NavigationActions.navigate({ routeName, params })
//     )
// }


// RootNavigation.js
// https://reactnavigation.org/docs/navigating-without-navigation-prop/
// https://stackoverflow.com/questions/61170112/how-to-use-navigation-navigate-from-a-component-outside-the-stack-navigation


import * as React from 'react';

export const isMountedRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current?.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
