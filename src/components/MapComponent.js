import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Avatar } from 'react-native-paper';
import { MyButton } from '../paper-components/memo';

const MapComponent = ({ props, navigationCallback, coords, height, roses, filterType }) => {
    
    // TODO: Abstract design for marker
    
    const markerList = roses.map((rose) => {
        const { homeLocation, placeMetAt, name, roseId, tags } = rose;
        const { homeLocationCoords, homeFormatted_address, homeLocationName } = homeLocation || {};
        const { placeMetAtLocationCoords, placeMetAtFormatted_address, placeMetAtName } = placeMetAt || {};
        if (filterType === 'place_met' &&
            placeMetAtLocationCoords &&
            placeMetAtLocationCoords.latitude !== -369 &&
            placeMetAtLocationCoords.longitude !== -369) {
            return (
                <Marker
                    coordinate={placeMetAtLocationCoords}
                    title={name + " @ " + placeMetAtFormatted_address}
                    image={require('../../assets/rose-marker.png')}
                    key={(placeMetAtLocationCoords.latitude + placeMetAtLocationCoords.longitude).toString()}
                >
                    <MapView.Callout
                        //onPress={() => navigation.navigate('RoseDetail', { roseId: roseId })}
                        onPress={() => navigationCallback(roseId)}
                        tooltip={false}
                    >
                        <View style={styles.viewStyle}>
                            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                <Avatar.Icon {...props} icon={'account-circle'} size={25} style={{ marginRight: 10 }} />
                                <Text>
                                    {name || '(no name)'}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Avatar.Icon {...props} icon={'tag'} size={25} style={{ marginRight: 10 }} />
                                <Text>
                                    {tags || '(no tags)'}
                                </Text>
                            </View>
                            <Text>
                                {placeMetAtFormatted_address}
                            </Text>
                            <MyButton
                                mode="contained"
                                icon="account-card-details"
                                onPress={() => navigationCallback(roseId)}
                            >
                                View
                            </MyButton>
                        </View>
                    </MapView.Callout>
                </Marker>
            )
        } else if (filterType === 'home' &&
            homeLocationCoords &&
            homeLocationCoords.latitude !== -369 &&
            homeLocationCoords.longitude !== -369) {
            return (
                <Marker
                    coordinate={homeLocationCoords}
                    title={name + " @ " + homeFormatted_address}
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
