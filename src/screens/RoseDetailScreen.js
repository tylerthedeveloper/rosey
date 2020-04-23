import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { } from 'react-native-elements';

const RoseDetailScreen = ({ route }) => {

    // TODO: get API and do look up for Rose??
    const { roseId } = route.params;
    console.log('rose', roseId);
    return (
        <View style={styles.container}>
            <Text style={styles.name}> {roseId} </Text>
            {/* <Text style={styles.name}> {name} </Text>
            <Text> Tags: [{tags.join(',')}]</Text>
            <Image source={{ uri: picture }} style={styles.image} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 30
    },
    image: {
        height: 250
    }
});

export default RoseDetailScreen;