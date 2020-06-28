import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Paragraph } from 'react-native-paper';
import roseyApi from '../api/roseyApi';
import { Context as RoseContext } from '../context/RoseContext';
// import { MyHeader } from '../paper-components/memo';
import { RoseForm } from '../paper-components/view';

const AddRoseScreen = ({ navigation, route }) => {

    const { addRose } = useContext(RoseContext);
    const { shared, userID } = route.params || {};

    const [user, setUser] = useState({});
    const [dialogVisible, setDialogVisible] = useState(false);

    // const _getSharedUser = async (userID) => {
    //     try {
    //         const response = await roseyApi.post(`/users/share`, { userID });
    //         const { user } = response.data;
    //         _showDialog();
    //         setUser(user);
    //     } catch (e) {
    //         alert('There was a problem loading that user');
    //     }
    // }

    // const _showDialog = () => setDialogVisible(true);

    // const _hideDialog = () => setDialogVisible(false);

    const callBack = (obj) => navigation.replace('RoseDetail',
        { roseId: obj.roseId }
    );

    // const _handleAddSharedRose = () => {
    //     addRose({ roseObj: user, callback: () => callBack(user) });
    //     _hideDialog();
    // };

    // useEffect(() => {
    //     if (shared && userID !== '' && userID !== undefined) {
    //         _getSharedUser(userID);
    //     }
    // }, [])

    return (
        <View style={styles.container}>
            {/* <MyHeader style={styles.title}> Add Rose </MyHeader> */}
            <RoseForm
                submitButtonText="Add Rose"
                user={user}
                form_updateFunction={addRose}
                form_updateFunctionText="Add new Rose"
                form_secondFunction={navigation.goBack}
                form_secondFunctionText="Cancel"
                form_updateFunction_callback={callBack}
            />
            {/* <Dialog
                visible={dialogVisible}
                onDismiss={_hideDialog}>
                <Dialog.Title>Add Rose '{user.name}'</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>This is will create a new rose for the rose shared with you</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={_hideDialog}>Cancel</Button>
                    <Button onPress={_handleAddSharedRose}>Add</Button>
                </Dialog.Actions>
            </Dialog> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'flex-start',
    },
    title: {
        // alignSelf: 'center',
        // alignContent: 'center',
        marginLeft: 50,
        paddingLeft: 20
    }
});

export default AddRoseScreen;