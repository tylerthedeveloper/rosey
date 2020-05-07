import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default () => {

    const [currentLocation, setCurrentLocation] = useState({});

    const checkForLocation = async () => {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
        } else {
            // console.log('granted')
            const location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location.coords);
        }
    };

    useEffect(() => {
        checkForLocation();
    }, []);

    return [currentLocation];
}