import { FontAwesome } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapComponent from '../components/MapComponent';
import { Context as RoseContext } from '../context/RoseContext';
import * as Location from 'expo-location';

const MapScreen = () => {

    const { state: { roses } } = useContext(RoseContext);

    // FIXME: Is this needed?
    // useEffect(() => {
    //     fetchAllRoses();
    // }, []); 

    const _roses = roses.filter(rose =>
        rose.placeMetAt.placeMetAtLocationCoords &&
        rose.placeMetAt.placeMetAtLocationCoords.latitude !== -369 &&
        rose.placeMetAt.placeMetAtLocationCoords.longitude !== -369
    );

    console.log('roses', roses.length, _roses.length)
    console.log(_roses)

    const [currentLocation, setCurrentLocation] = useState({});

    const checkForLocation = async () => {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
        } else {
            console.log('granted')
            const location = await Location.getCurrentPositionAsync({});
            // console.log('coords', location.coords)
            setCurrentLocation(location.coords);
        }
    };

    useEffect(() => {
        checkForLocation();
    }, []);

    // console.log(currentLocation)

    return (
        <>
            <MapComponent height={900} roses={_roses} coords={currentLocation} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default MapScreen;