import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Context as RoseContext } from '../context/RoseContext';
import RoseForm from '../paper-components/RoseForm';

const AddRoseScreen = ({ navigation }) => {

    const { addRose } = useContext(RoseContext);

    return (
        <>
            <Text> Add Rose </Text>
            {/* <KeyboardAvoidingView behavior={'padding'}
                keyboardVerticalOffset={100}
                style={{marginBottom: 20}}
            > */}
            {/* <ScrollView> */}
            <RoseForm
                // headerText="Add Rose"
                submitButtonText="Add Rose"
                // onSubmit={addRose}
                // onCancel={navigation.goBack}
                updateFunction={() => console.log('added>')}
                updateFunctionText="Add new rose"
                secondFunction={navigation.goBack}
                secondFunctionText="Cancel"
            />
            {/* </ScrollView> */}
            {/* </KeyboardAvoidingView> */}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default AddRoseScreen;