import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import RoseViewContainer from '../paper-components/RoseViewContainer';
import { Context as RoseContext } from '../context/RoseContext';


const RoseDetailScreen = ({ navigation, route }) => {

    const { roseId } = route.params;
    const { state: { roses }, editRose } = useContext(RoseContext);
    const rose = roses.find(rose => rose.roseId === roseId);
    const deleteRose = () => { }


    return (
        <RoseViewContainer {...{
            user: rose,
            view_updateFunctionText: "Edit Rose",
            view_secondFunction: deleteRose, view_secondFunctionText: "Delete Rose",
            form_updateFunction: editRose, form_updateFunctionText: "Save Rose",
            form_secondFunctionText: "Cancel"
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