import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RoseViewContainer from '../paper-components/RoseViewContainer';

const RoseDetailScreen = ({ route }) => {
    // TODO: get API and do look up for Rose??


    // TODO:
    const editRose = () => { }
    const deleteRose = () => { }

    const { rose } = route.params;
    // console.log(rose)
    return (
        <RoseViewContainer {...{
            user: rose, updateFunction: editRose, updateFunctionText: "Edit Rose",
            secondFunction: deleteRose, secondFunctionText: "Delete Rose"
        }} />)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 30
    },
    image: {
        height: 250
    }
});

export default RoseDetailScreen;