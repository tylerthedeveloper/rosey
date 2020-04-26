import React, { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Context as RoseContext } from '../context/RoseContext';
import RoseListItem from '../paper-components/RoseListItem';

// TODO: I can pass navigation?
const RoseListScreen = ({ navigation }) => {

    const { state: { roses }, fetchAllRoses } = useContext(RoseContext);

    useEffect(() => {
        fetchAllRoses();
    }, []); //TODO: 

    return (
        <View style={styles.container}>
            {/* TODO: buttons... */}
            <FlatList
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