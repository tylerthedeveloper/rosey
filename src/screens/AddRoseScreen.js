import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Context as RoseContext } from '../context/RoseContext';
import MyHeader from '../paper-components/MyHeader';
import RoseForm from '../paper-components/RoseForm';

const AddRoseScreen = ({ navigation }) => {

    const { addRose } = useContext(RoseContext);
    return (
        <View style={styles.container}>
            <MyHeader style={styles.title}> Add Rose </MyHeader>
            <RoseForm
                // headerText="Add Rose"
                submitButtonText="Add Rose"
                form_updateFunction={addRose}
                form_updateFunctionText="Add new Rose"
                form_secondFunction={navigation.goBack}
                form_secondFunctionText="Cancel"
                form_updateFunction_callback={(obj) => navigation.replace('RoseDetail', 
                        { roseId: obj.roseId }
                )}
                // {/* form_updateFunction_callback={(obj) => navigation.navigate('Main', {
                //    screen: 'RoseListStack',
                //    params: {
                //        screen: 'RoseDetail',
                //        params: { roseId: obj.roseId }
                //    }
                //})} */}
                // form_updateFunction_callback={(obj) => navigation.navigate('RoseDetail', {
                //     params: { rose: obj }
                // })}
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