import React, { useContext, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { FlatList, StyleSheet } from 'react-native';
import RoseListItem from '../components/RoseListItem';
import { Context as RoseContext } from '../context/RoseContext';

// TODO: I can pass navigation?
const RoseListScreen = ({ navigation }) => {

    const { state: { roses }, fetchAllRoses } = useContext(RoseContext);

    useEffect(() => {
        fetchAllRoses();
    }, []); //TODO: 

    return (
        <>
            {/* <Button
                title="go to specific friend"
                onPress={() => navigation.navigate('FriendDetail')}
            /> */}
            {/* <Button
                title='logout'
                onPress={async () => {
                    await AsyncStorage.removeItem('token')
                }} /> */}
            <FlatList
                contentContainerStyle={styles.container}
                data={roses}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    return (<RoseListItem rose={item} />)
                }}
            />
        </>
    )
}

RoseListScreen.navigationOptions = {
    tabBarIcon: <FontAwesome name="list" size={20} />,
    header: () => null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    }
});

export default RoseListScreen;