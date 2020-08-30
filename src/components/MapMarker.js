import React from 'react';
import { Button, StyleSheet, Text, View, Image, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Avatar } from 'react-native-paper';
import { MyButton } from '../paper-components/memo';
import { theme } from '../core/theme';

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
                style={{  }}
                onPress={() => navigationCallback(roseId)}
            >
                <View style={styles.viewStyle}>
                    <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
                        <Avatar.Icon {...props} icon={'account-circle'} size={25} style={{ marginRight: 10 }} />
                        <Text>
                            {name || '(no name)'}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>
                        <Avatar.Icon {...props} icon={'tag'} size={25} style={{ marginRight: 10 }} />
                        <Text>
                            {/* {tags.join(', ') || '(no tags)'} */}
                            {tags.map(tag => tag.tag).join(', ') || '(no tags)'}
                        </Text>
                    </View>
                    {/* <Text>
                        {address}
                    </Text> */}
                    {
                        (Platform.OS === 'ios')
                            ? <MyButton
                                mode="contained"
                                // icon="account-card-details"
                                onPress={() => navigationCallback(roseId)}
                            >
                                View
                            </MyButton>
                            : <Button title="View" color={theme.colors.primary} style={{ marginTop: 20 }} />
                    }
                </View>
            </MapView.Callout>
        </Marker>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        width: 220,
        // height: 150,
        backgroundColor: "#fff",
        padding: 20,
        // alignSelf: 'center',
        alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'column'
        // flex: 1
    },
    textStyle: {
        fontSize: 16,
        // alignSelf: 'center',
        padding: 5
    }
});

export default MapMarker;
