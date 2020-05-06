import React from 'react';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = ({ navigation, coords, height, roses }) => {

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
                {/* {markerList} */}
            </MapView>
        </>
    )
}

// const styles = StyleSheet.create({});

export default MapComponent;
