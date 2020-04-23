import React, { useContext, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { FlatList, StyleSheet, Button, View } from 'react-native';
import RoseListItem from '../components/RoseListItem';
import { Context as RoseContext } from '../context/RoseContext';

// TODO: I can pass navigation?
const RoseListScreen = ({ navigation }) => {

    const { state: { roses }, fetchAllRoses } = useContext(RoseContext);

    useEffect(() => {
        fetchAllRoses();
    }, []); //TODO: 

    return (
        <View style={styles.container}>
            <Button
                title="go to specific friend"
                onPress={() => navigation.navigate('RoseDetail')}
            />
            <FlatList
                // contentContainerStyle={}
                data={roses}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    return (<RoseListItem rose={item} />)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    }
});

export default RoseListScreen;