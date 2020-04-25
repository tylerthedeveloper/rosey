import React, { useContext } from 'react';
import { StyleSheet, View, Button, ImageBackground, Image } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';
import { Avatar } from 'react-native-paper';
import { theme } from '../core/theme';

// TODO: get better colored background
const avatarBackground = 'https://orig00.deviantart.net/dcd7/f/2014/027/2/0/mountain_background_by_pukahuna-d73zlo5.png';
const noProPicPhoto = require('../../assets/avatar_placeholder.png');

const ProfileScreen = ({ navigation }) => {

    const { state: { user }, signout, updateProfile } = useContext(AuthContext);
    const { email, tags, name, nickName, birthday, phoneNumber, picture,
        homeLocation, work
    } = JSON.parse(user);
    let city, state, country;
    if (homeLocation) {
        city = homeLocation.city;
        state = homeLocation.state;
        country = homeLocation.country;
    } else {
        city = "city";
        state = "state";
        country = "country";
    };

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <ImageBackground
                    style={styles.headerBackgroundImage}
                    blurRadius={10}
                    source={{
                        uri: avatarBackground,
                    }}
                >
                    <View style={styles.headerColumn}>
                        <Image
                            style={styles.userImage}
                            source={require('../../assets/avatar_placeholder.png')}
                        />
                        <Text style={styles.userNameText}>{name}</Text>
                        <View style={styles.userAddressRow}>
                            <View>
                                <Icon
                                    name="place"
                                    underlayColor="transparent"
                                    iconStyle={styles.placeIcon}
                                // onPress={this.onPressPlace}
                                />
                            </View>
                            <View style={styles.userCityRow}>
                                <Text style={styles.userCityText}>
                                    {city}, {country}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            <Text> Email: {email || ''}</Text>
            <Text> Name: {name || ''}</Text>
            <Text> MY Tags: {tags || ''}</Text>
            <Button
                title="AddTags"
            />
            <Spacer />
            <Button
                title="Update Profile"
                onPress={() => updateProfile({ name: "new Name2" })}
            />
            <Button
                title="Signout"
                onPress={signout}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0,
    },
    container: {
        flex: 1,
    },
    emailContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
    },
    headerBackgroundImage: {
        paddingBottom: 20,
        paddingTop: 35,
    },
    headerContainer: {},
    headerColumn: {
        backgroundColor: 'transparent',
        ...Platform.select({
            ios: {
                alignItems: 'center',
                elevation: 1,
                marginTop: -1,
            },
            android: {
                alignItems: 'center',
            },
        }),
    },
    placeIcon: {
        color: 'white',
        fontSize: 26,
    },
    scroll: {
        backgroundColor: '#FFF',
    },
    telContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
    },
    userAddressRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    userCityRow: {
        backgroundColor: 'transparent',
    },
    userCityText: {
        color: '#A5A5A5',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
    userImage: {
        borderColor: theme.primary || '#600EE6',
        borderRadius: 85,
        borderWidth: 3,
        height: 170,
        marginBottom: 15,
        width: 170,
    },
    userNameText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 8,
        textAlign: 'center',
    },
})

export default ProfileScreen;