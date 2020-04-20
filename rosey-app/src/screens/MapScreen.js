import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import MapComponent from '../components/MapComponent';

const MapScreen = () => {

    return (
        <>
            <MapComponent height={900} />
        </>
    )
}

MapScreen.navigationOptions = {
    title: '',
    tabBarIcon: <FontAwesome name="map" size={20} />
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default MapScreen;