import React, { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapComponent from '../components/MapComponent';
import { Context as RoseContext } from '../context/RoseContext';
import useCurrentLocation from '../hooks/useCurrentLocation';

const MapScreen = ({ navigation, filterType, resetCurrentLocation }) => {

    const { state: { roses } } = useContext(RoseContext);

    // TODO: filter type
    const { currentLocation } = useCurrentLocation();

    const _goToRose = (roseId) => {
        navigation.navigate('RoseDetail', { roseId: roseId });
    }

    return (
        <>
            <MapComponent
                height={900}
                roses={roses}
                coords={currentLocation}
                filterType={filterType}
                navigationCallback={_goToRose}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        
        justifyContent: 'center'
    }
});

export default MapScreen;