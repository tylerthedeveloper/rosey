import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const RoseListItem = ({ navigation, rose }) => {

    const { name, tags, picture } = rose;
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('RoseDetail', { id: rose._id })}>
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

export default withNavigation(RoseListItem);