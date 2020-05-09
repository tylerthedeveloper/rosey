import React from 'react';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = ({ navigation, coords, height, roses, filterType }) => {

    const markerList = roses.map((rose) => {
        const { homeLocation, placeMetAt } = rose;
        const { homeLocationCoords, homeFormatted_address, homeLocationName } = homeLocation || {};
        const { placeMetAtLocationCoords, placeMetAtFormatted_address, placeMetAtName } = placeMetAt || {};
        if (filterType === 'place_met' &&
            placeMetAtLocationCoords &&
            placeMetAtLocationCoords.latitude !== -369 &&
            placeMetAtLocationCoords.longitude !== -369) {
            return (
                <Marker
                    coordinate={placeMetAtLocationCoords}
                    title={placeMetAtFormatted_address}
                    image={require('../../assets/rose-marker.png')}
                    key={(placeMetAtLocationCoords.latitude + placeMetAtLocationCoords.longitude).toString()}
                />
            )
        } else if (filterType === 'home' &&
            homeLocationCoords &&
            homeLocationCoords.latitude !== -369 &&
            homeLocationCoords.longitude !== -369) {
            return (
                <Marker
                    coordinate={homeLocationCoords}
                    title={homeFormatted_address}
                    image={require('../../assets/rose-marker.png')}
                    key={(homeLocationCoords.latitude + homeLocationCoords.longitude).toString()}
                />
            )
        }
    });

    return (
        <>
            {
                (coords && Object.keys(coords).length)
                    ? <MapView
                        style={{ height: height || 300 }}
                        region={{
                            latitudeDelta: .01,
                            longitudeDelta: .01,
                            ...coords
                        }}
                    >
                        {markerList}
                    </MapView>
                    : <MapView
                        style={{ height: height || 300 }}
                    >
                        {markerList}
                    </MapView>
            }
        </>
    )
}

// const styles = StyleSheet.create({});

export default MapComponent;
