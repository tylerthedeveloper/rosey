import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Context as RoseContext } from '../context/RoseContext';
// import { MyHeader } from '../paper-components/memo';
import { RoseForm } from '../paper-components/view';

const AddRoseScreen = ({ navigation }) => {
    const { addRose } = useContext(RoseContext);
    return (
        <View style={styles.container}>
            {/* <MyHeader style={styles.title}> Add Rose </MyHeader> */}
            <RoseForm
                submitButtonText="Add Rose"
                form_updateFunction={addRose}
                form_updateFunctionText="Add new Rose"
                form_secondFunction={navigation.goBack}
                form_secondFunctionText="Cancel"
                form_updateFunction_callback={(obj) => navigation.replace('RoseDetail',
                    { roseId: obj.roseId }
                )}
            />
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