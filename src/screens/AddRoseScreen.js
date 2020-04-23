import { FontAwesome } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import RoseForm from '../components/RoseForm';
import Spacer from '../components/Spacer';
import { Context as RoseContext } from '../context/RoseContext';

const AddRoseScreen = ({ navigation }) => {

    const { addRose } = useContext(RoseContext);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <RoseForm
                headerText="Add Rose"
                submitButtonText="Add Rose"
                onSubmit={addRose}
                onCancel={navigation.goBack}
            />
            <Spacer />
        </KeyboardAvoidingView>
    )
}

AddRoseScreen.navigationOptions = {
    title: 'Add Friend',
    tabBarIcon: <FontAwesome name="plus" size={30} />
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default AddRoseScreen;