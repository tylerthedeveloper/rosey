import React from 'react';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = ({ navigation, height, roses }) => {

    const markerList = roses.map((rose) => {
        const { coords, placeName } = rose.placeMetAt;
        // console.log(coords, placeName);
        return (
            <Marker
                coordinate={coords}
                title={placeName}
                image={require('../../assets/rose-marker.png')}
                key={(coords.latitude + coords.longitude).toString()}
            />
        )
    });

    return (
        <>
            <MapView
                style={{ height: height || 300 }}
                initialRegion={{
                    latitudeDelta: .01,
                    longitudeDelta: .01,
                    latitude: 39.1666,
                    longitude: -86.5348
                }}
            >
                {markerList}
            </MapView>
        </>
    )
}

// const styles = StyleSheet.create({});

export default MapComponent;
