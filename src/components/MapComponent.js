import React from 'react';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = ({ navigation, coords, height, roses, filterType }) => {

    const markerList = roses.map((rose) => {
        const { homeLocation, placeMetAt } = rose
        const { homeLocationCoords, homeFormatted_address, homeLocationName } = homeLocation || {};
        // TODO:
        const { placeMetAtLocationCoords, placeMetAtFormatted_address, placeMetAtName } = placeMetAt || {};
        return (
            <Marker
                coordinate={placeMetAtLocationCoords}
                title={placeMetAtFormatted_address}
                image={require('../../assets/rose-marker.png')}
                key={(placeMetAtLocationCoords.latitude + placeMetAtLocationCoords.longitude).toString()}
            />
        )
    });

    console.log('coords', coords)

    return (
        <>
            <MapView
                style={{ height: height || 300 }}
                region={(coords)
                    ? {
                        latitudeDelta: .01,
                        longitudeDelta: .01,
                        ...coords
                    }
                    : null}
            >
                {markerList}
            </MapView>
        </>
    )
}

// const styles = StyleSheet.create({});

export default MapComponent;
