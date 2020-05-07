import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import MapComponent from '../components/MapComponent';
import { Context as RoseContext } from '../context/RoseContext';
import useCurrentLocation from '../hooks/useCurrentLocation';

const MapScreen = ({filterType}) => {
    console.log(filterType)
    const { state: { roses } } = useContext(RoseContext);

    // FIXME: Is this needed?
    // useEffect(() => {
    //     fetchAllRoses();
    // }, []); 

    // TODO: filter type
    const _roses = roses.filter(rose =>
        rose.placeMetAt.placeMetAtLocationCoords &&
        rose.placeMetAt.placeMetAtLocationCoords.latitude !== -369 &&
        rose.placeMetAt.placeMetAtLocationCoords.longitude !== -369
    );

    const [currentLocation] = useCurrentLocation();

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