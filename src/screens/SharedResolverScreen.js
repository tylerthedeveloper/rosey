import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Paragraph } from 'react-native-paper';
import { MyHeader } from '../paper-components/memo';
import roseyApi from '../api/roseyApi';
import { Context as RoseContext } from '../context/RoseContext';
import { ActivityIndicator, Colors } from 'react-native-paper';

const SharedResolverScreen = ({ navigation, route }) => {

    const { addRose } = useContext(RoseContext);

    const { shared, uid } = route.params || {};
    // console.log(shared, uid)
    const [user, setUser] = useState({});
    const [dialogVisible, setDialogVisible] = useState(false);

    const _getSharedUser = async (uid) => {
        try {
            const response = await roseyApi.post(`/users/share`, { uid });
            const { user } = response.data;
            setUser(user);
            _showDialog();
        } catch (e) {
            alert('There was a problem loading that user' + e.message);
        }
    }

    const _showDialog = () => setDialogVisible(true);

    const _hideDialog = () => setDialogVisible(false);

    const callBack = (obj) => navigation.replace('RoseDetail',
        { roseId: obj.roseId }
    );

    const _handleAddSharedRose = () => {
        addRose({ roseObj: user, callback: () => callBack(user) });
        _hideDialog();
    };

    const _handleCancelShare = () => {
        _hideDialog();
        navigation.navigate('RoseList')
    };

    useEffect(() => {
        if (shared && uid !== '' && uid !== undefined) {
            _getSharedUser(uid);
        } else {
            navigation.navigate('RoseList');
        }
    }, [])

    return (
        <View style={styles.container}>
            {(!dialogVisible) && <ActivityIndicator animating={true} size={'large'} />}
            <Dialog
                visible={dialogVisible}
                onDismiss={_hideDialog}>
                <Dialog.Title>Add Rose '{user.name || user.email || user.phoneNumber}' </Dialog.Title>
                <Dialog.Content>
                    <Paragraph>This is will create a new rose for the rose shared with you</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={_handleCancelShare}>Cancel</Button>
                    <Button onPress={_handleAddSharedRose}>Add</Button>
                </Dialog.Actions>
            </Dialog>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        // alignSelf: 'center',
        // alignContent: 'center',
        marginLeft: 50,
        paddingLeft: 20
    }
});

export default SharedResolverScreen;