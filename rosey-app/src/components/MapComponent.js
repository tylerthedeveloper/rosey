import React from 'react';
import MapView from 'react-native-maps';

let _height;

const MapComponent = ({ navigation, height }) => {
    _height = height;
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
            </MapView>
        </>
    )
}

// const styles = StyleSheet.create({});

export default MapComponent;
