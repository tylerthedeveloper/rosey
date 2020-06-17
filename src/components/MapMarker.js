import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Avatar } from 'react-native-paper';
import { MyButton } from '../paper-components/memo';

const MapMarker = ({ props, roseId, coords, address, name, tags, navigationCallback }) => {

    return (
        <Marker
            coordinate={coords}
            title={name + " @ " + address}
        //image={require('../../assets/rose-marker.png')}
        >
            <Image
                source={require('../../assets/rose-marker.png')}
                style={{ width: 60, height: 60 }}
                resizeMode="contain"
            />
            <MapView.Callout
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
                        {address}
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

export default MapMarker;
