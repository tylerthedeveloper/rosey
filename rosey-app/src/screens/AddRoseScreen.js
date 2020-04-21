import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import RoseForm from '../components/RoseForm';
import Spacer from '../components/Spacer';

const AddRoseScreen = ({ navigation }) => {

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <RoseForm
                headerText="Add Friend"
                submitButtonText="Add Friend"
                onSubmit={console.log}
            />
            <Spacer />
            <Button
                title="Cancel (X)"
                onPress={() => navigation.goBack()}
            />

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