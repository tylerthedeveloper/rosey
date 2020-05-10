import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API_KEY } from "react-native-dotenv";

export default () => {

    // const [currentLocation, setCurrentLocation] = useState({});
    // const [geoCodedLocation, setGeoCodedLocation] = useState({});
    const [locationObject, setLocationObject] = useState({
        geoCodedLocation: '',
        currentLocation: {
            latitude: -369,
            longitude: -369
        }
    });

    Geocoder.init(GOOGLE_API_KEY);

    const checkForLocation = async () => {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
        } else {
            // console.log('granted')
            const location = await Location.getCurrentPositionAsync({});
            // const promise = new Promise((res, rej) => {
            Geocoder.from(location.coords)
                // .then(json => setGeoCodedLocation(json.results[0].formatted_address))
                // .then(() => setCurrentLocation(location.coords));
                .then(json => setLocationObject({
                    geoCodedLocation: json.results[0].formatted_address,
                    currentLocation: location.coords
                }));
            // }
        }
    };

    useEffect(() => {
        checkForLocation();
    }, []);

    return locationObject;
    // return { currentLocation, geoCodedLocation };
}