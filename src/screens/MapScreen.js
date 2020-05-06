import { FontAwesome } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapComponent from '../components/MapComponent';
import { Context as RoseContext } from '../context/RoseContext';
import * as Location from 'expo-location';

const MapScreen = () => {

    const { state: { roses }, fetchAllRoses } = useContext(RoseContext);

    // FIXME: Is this needed?
    // useEffect(() => {
    //     fetchAllRoses();
    // }, []); 

    const _roses = roses.filter(rose =>
        rose.placeMetAt.coords &&
        rose.placeMetAt.coords.latitude !== -369 &&
        rose.placeMetAt.coords.longitude !== -369
    );


    // console.log(roses.length, _roses.length)

    const [currentLocation, setCurrentLocation] = useState({});

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
            }

            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location.coords);
        })();
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