import { FontAwesome } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import Spacer from '../components/Spacer';
import { Context as RoseContext } from '../context/RoseContext';
// import RoseForm from '../paper-components/RoseForm';

const AddRoseScreen = ({ navigation }) => {

    const { addRose } = useContext(RoseContext);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            {/* <RoseForm
                headerText="Add Rose"
                submitButtonText="Add Rose"
                onSubmit={addRose}
                onCancel={navigation.goBack}
            /> */}
            <Spacer />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default AddRoseScreen;