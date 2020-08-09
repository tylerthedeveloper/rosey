import React, { useContext } from 'react';
import { Context as RoseContext } from '../context/RoseContext';
import RoseViewContainer from '../paper-components/RoseViewContainer';

// FIXME: Should this jsut take the object?
// FIXME: should this look up in fb?
const RoseDetailScreen = ({ navigation, route }) => {

    const { roseId } = route.params;
    const { state: { roses }, editRose, deleteRose } = useContext(RoseContext);
    const rose = roses.find(rose => rose.roseId === roseId);

    return (
        <RoseViewContainer {...{
            user: rose || {},
            view_updateFunctionText: "Edit Rose",
            view_secondFunction: deleteRose, view_secondFunctionText: "Delete Rose",
            view_updateFunction_callback: () => navigation.navigate('Main', {
                screen: 'RoseListStack'
            }),
            form_updateFunction: editRose, form_updateFunctionText: "Save Rose",
            form_secondFunctionText: "Cancel",
        }}
        />)
}

export default RoseDetailScreen;