import React, { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapComponent from '../components/MapComponent';
import { Context as RoseContext } from '../context/RoseContext';
import useCurrentLocation from '../hooks/useCurrentLocation';

const MapScreen = ({ filterType }) => {

    const { state: { roses },fetchAllRoses } = useContext(RoseContext);

    // FIXME: Is this needed?
    
    // TODO: filter type
    const [currentLocation] = useCurrentLocation();

    return (
        <>
            <MapComponent height={900} roses={roses} coords={currentLocation} filterType={filterType} />
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