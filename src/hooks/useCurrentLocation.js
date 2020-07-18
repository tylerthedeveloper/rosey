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

    const [locationStatus, setLocationStatus] = useState(false);

    const checkForLocation = async () => {
        const { status } = await Location.requestPermissionsAsync();
        // console.log(status);
        setLocationStatus(true);
        if (status !== 'granted') {
            // FIXME: need to ask again?...
        } else {
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
    }, [GOOGLE_API_KEY, locationStatus]);

    return locationObject;
    // return { currentLocation, geoCodedLocation };
}