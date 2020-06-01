import React from 'react';
import MapView from 'react-native-maps';
import MapMarker from './MapMarker';

// TODO: Wrap with nav, dont pass all the way down???

const MapComponent = ({ navigationCallback, coords, height, roses, filterType }) => {

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
                    key={(placeMetAtLocationCoords.latitude + placeMetAtLocationCoords.longitude).toString()}
                    roseId={roseId}
                    navigationCallback={navigationCallback}
                    name={name}
                    tags={tags}
                    coords={placeMetAtLocationCoords}
                    address={placeMetAtName || placeMetAtFormatted_address}
                    style={{ width: 50, height: 50 }}
                />
            )
        } else if (filterType === 'home' &&
            homeLocationCoords &&
            homeLocationCoords.latitude !== -369 &&
            homeLocationCoords.longitude !== -369) {
            return (
                <MapMarker
                    style={{ width: 50, height: 50 }}
                    key={(homeLocationCoords.latitude + homeLocationCoords.longitude).toString()}
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
                        showsUserLocation
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