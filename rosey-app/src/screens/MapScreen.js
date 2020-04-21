import { FontAwesome } from '@expo/vector-icons';
import React, { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapComponent from '../components/MapComponent';
import { Context as RoseContext } from '../context/RoseContext';

const MapScreen = () => {

    const { state: { roses }, fetchAllRoses } = useContext(RoseContext);

    useEffect(() => {
        fetchAllRoses();
    }, []); //TODO: 

    return (
        <>
            <MapComponent height={900} roses={roses} />
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