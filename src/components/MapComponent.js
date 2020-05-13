import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Avatar } from 'react-native-paper';
import { MyButton } from '../paper-components/memo';
import MapMarker from './MapMarker';

// TODO: Wrap with nav, dont pass all the way down???

const MapComponent = ({ props, navigationCallback, coords, height, roses, filterType }) => {

    // TODO: Abstract design for marker

    // FIXME: Apply to BOTH home AND place met 

    const markerList = roses.map((rose) => {
        const { homeLocation, placeMetAt, name, roseId, tags } = rose;
        const { homeLocationCoords, homeFormatted_address, homeLocationName } = homeLocation || {};
        const { placeMetAtLocationCoords, placeMetAtFormatted_address, placeMetAtName } = placeMetAt || {};
        if (filterType === 'place_met' &&
            placeMetAtLocationCoords &&
            placeMetAtLocationCoords.latitude !== -369 &&
            placeMetAtLocationCoords.longitude !== -369) {
            return (
                <MapMarker
                    roseId={roseId}
                    navigationCallback={navigationCallback}
                    name={name}
                    tags={tags}
                    coords={placeMetAtLocationCoords}
                    address={placeMetAtName || placeMetAtFormatted_address}
                />
            )
        } else if (filterType === 'home' &&
            homeLocationCoords &&
            homeLocationCoords.latitude !== -369 &&
            homeLocationCoords.longitude !== -369) {
            return (
                <MapMarker
                    roseId={roseId}
                    navigationCallback={navigationCallback}
                    name={name}
                    tags={tags}
                    coords={homeLocationCoords}
                    address={homeLocationName || homeFormatted_address}
                />
            )
        }
    });

    const shouldSetInitialRegion = (coords &&
        Object.keys(coords).length > 0 &&
        coords.latitude !== -369 && coords.longitude !== -369
    );

    return (
        <>
            {
                (shouldSetInitialRegion)
                    ? <MapView
                        style={{ height: height || 300 }}
                        initialRegion={{
                            latitudeDelta: .01,
                            longitudeDelta: .01,
                            latitude: coords.latitude,
                            longitude: coords.longitude
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

const styles = StyleSheet.create({
    viewStyle: {
        width: 200,
        height: 210,
        backgroundColor: "#fff",
        padding: 20
    },
    textStyle: {
        fontSize: 16,
        alignSelf: 'center',
        padding: 5
    }
});

export default MapComponent;

// const PROVIDER = (Platform.OS === 'ios') ? '' : PROVIDER_GOOGLE;
//     return (
//         <>
//             {
//                 (coords && Object.keys(coords).length)
//                     ? (Platform.OS === 'ios')
//                         ? <MapView
//                             style={{ height: height || 300 }}
//                             initialRegion={{
//                                 latitudeDelta: .01,
//                                 longitudeDelta: .01,
//                                 ...coords
//                             }}
//                         >
//                             {markerList}
//                         </MapView>
//                         : <MapView
//                             provider={PROVIDER_GOOGLE}
//                             style={{ height: height || 300 }}
//                             initialRegion={{
//                                 latitudeDelta: .01,
//                                 longitudeDelta: .01,
//                                 ...coords
//                             }}
//                         >
//                             {markerList}
//                         </MapView>
//                     : (Platform.OS === 'ios')
//                         ? <MapView
//                             style={{ height: height || 300 }}
//                         >
//                             {markerList}
//                         </MapView>
//                         : <MapView
//                             provider={PROVIDER_GOOGLE}
//                             style={{ height: height || 300 }}
//                         >
//                             {markerList}
//                         </MapView>
//             }
//         </>
//     )
// }