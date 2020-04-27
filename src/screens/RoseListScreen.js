import React, { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Context as RoseContext } from '../context/RoseContext';
import RoseListItem from '../paper-components/RoseListItem';

// TODO: I can pass navigation?
const RoseListScreen = ({ }) => {

    const { state: { roses }, fetchAllRoses } = useContext(RoseContext);

    useEffect(() => {
        fetchAllRoses();
    }, []); //TODO: 

    return (
        <View style={styles.container}>
            {/* TODO: buttons... */}
            {
                (roses) && <FlatList
                    data={roses}
                    keyExtractor={(item) => item.roseId}
                    renderItem={({ item }) => {
                        return (<RoseListItem rose={item} />)
                    }}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginBottom: 20
    }
});

export default RoseListScreen;