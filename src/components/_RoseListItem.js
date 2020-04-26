import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";

const RoseListItem = ({ rose }) => {

    const navigation = useNavigation();
    const { name, tags, picture } = rose;
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('RoseDetail', { roseId: rose._id })}>
            <>
                <Text style={styles.name}> {name} </Text>
                <Text> Tags: [{tags.join(',')}]</Text>
                <Image source={{ uri: picture }} style={styles.image} />
            </>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    name: {
        fontWeight: 'bold',
        fontSize: 30
    },
    image: {
        height: 150
    }
});

export default RoseListItem;