import * as Linking from 'expo-linking';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Card, IconButton } from 'react-native-paper';
import Constants from '../../constants';
import { theme } from '../../core/theme';
import { MyShadowCard } from '../memo';

const RoseHeader = ({ uid, name, picture, homeLocationName, isUserContactCard, editing, _setEditing,
    phoneNumber, email, saveFunc, pickProfileImage, typeOfView
}) => {

    // TODO:P
    // console.log(uid)


    const headerRowButtons = [
        {
            headerButtonIcon: "phone-plus",
            headerButtonFunction: () => {
                if (email === '') {
                    _handleEmptyField();
                } else {
                    Linking.openURL(`tel:${phoneNumber}`)
                }
            }

        },
        {
            headerButtonIcon: "message-plus",
            headerButtonFunction: () => {
                if (email === '') {
                    _handleEmptyField();
                } else {
                    Linking.openURL(`sms:${phoneNumber}`)
                }
            }
        },
        {
            headerButtonIcon: "video-plus",
            headerButtonFunction: () => {
                if (email === '') {
                    _handleEmptyField();
                } else {
                    Linking.openURL(`facetime:${email}`)
                }
            }
        },
        {
            headerButtonIcon: "email-plus",
            headerButtonFunction: () => {
                if (email === '') {
                    _handleEmptyField();
                } else {
                    Linking.openURL(`mailto:${email}`)
                }
            },
        },
    ];

    const _handleEmptyField = () => alert('Enter data for that field in order to interact with it.');

    return (

        <MyShadowCard inheritedMarginTop={15}>
            <Card.Content style={{ alignSelf: 'center', alignItems: 'center', paddingBottom: 5, flex: 0 }}>
                <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                    {
                        (!picture || picture.length === 0)
                            ? < Avatar.Icon
                                style={styles.avatar}
                                size={80}
                                icon={'account'}
                            />
                            : < Avatar.Image
                                size={80}
                                style={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'blue' }}
                                source={{ uri: picture }}
                            />
                    }
                    {
                        (typeOfView === 'New')
                            ? <TouchableOpacity onPress={pickProfileImage}>
                                <Text style={{ color: 'blue', marginVertical: 10 }}> Add Photo </Text>
                            </TouchableOpacity>
                            : (!editing)
                                ? null
                                : <TouchableOpacity onPress={pickProfileImage}>
                                    <Text style={{ color: 'blue', marginVertical: 10 }}> Change Photo </Text>
                                </TouchableOpacity>
                    }
                    {/* <Title style={{ ...styles.userNameText, fontFamily: (Platform.OS === 'android') ? 'sans-serif-light' : 'Avenir-Heavy' }}>{name || 'No-name!'}</Title> */}
                </View>
                <View>
                    {
                        (!isUserContactCard && !editing && typeOfView !== 'New')
                            ? <View style={{ flexDirection: 'row', }}>
                                {
                                    headerRowButtons.map(({ headerButtonFunction, headerButtonIcon }) => {
                                        if (headerButtonIcon === 'video-plus' && Platform.OS !== 'ios') return null;
                                        return (<View key={headerButtonIcon}>
                                            <IconButton
                                                icon={headerButtonIcon}
                                                onPress={headerButtonFunction}
                                                color="white"
                                                style={{ marginHorizontal: 20, backgroundColor: theme.colors.backdrop }}
                                            />
                                        </View>)
                                    })
                                }
                            </View>
                            : null
                    }
                </View>
            </Card.Content>
            {
                (typeOfView !== 'New')
                    ? (!editing) ?
                        <IconButton
                            icon={"pencil"}
                            size={20}
                            onPress={() => _setEditing(!editing)}
                            color={'white'}
                            style={{ right: 10, top: 10, alignSelf: 'flex-end', position: 'absolute', backgroundColor: theme.colors.text }}
                        />
                        : <>
                            <IconButton
                                icon={"close-circle"}
                                size={20}
                                onPress={() => _setEditing(!editing)}
                                color={'white'}
                                style={{ right: 10, top: 10, alignSelf: 'flex-end', position: 'absolute', backgroundColor: theme.colors.text }}
                            />
                            <IconButton
                                icon={"content-save"}
                                size={20}
                                onPress={saveFunc}
                                color={'white'}
                                style={{ right: 10, bottom: 10, alignSelf: 'center', position: 'absolute', backgroundColor: theme.colors.text }}
                            />
                        </>
                    : null
            }
            {/* {
                (!editing) ?
                    <IconButton
                        icon={"pencil"}
                        size={20}
                        onPress={() => _setEditing(!editing)}
                        color={'white'}
                        style={{ right: 10, top: 10, alignSelf: 'flex-end', position: 'absolute', backgroundColor: theme.colors.text }}
                    />
                    : <IconButton
                        icon={"close-circle"}
                        size={20}
                        onPress={() => _setEditing(!editing)}
                        color={'white'}
                        style={{ right: 10, top: 10, alignSelf: 'flex-end', position: 'absolute', backgroundColor: theme.colors.text }}
                    />
            } */}
            {
                (isUserContactCard && !editing) &&
                <IconButton
                    icon="share"
                    size={20}
                    onPress={() => Constants._shareProfile(uid)}
                    color={'white'}
                    style={{ right: 10, alignSelf: 'flex-end', bottom: 0, position: 'absolute', backgroundColor: theme.colors.text }}
                />
            }
        </MyShadowCard>
    );
}

const styles = StyleSheet.create({
    headerBackgroundImage: {
        paddingBottom: 10,
        paddingTop: 15,
    },
    // placeIcon: {
    //     color: 'white',
    //     fontSize: 26,
    // },
    avatar: {
        // shadowColor: theme.colors.primary || '#600EE6',
        // shadowOpacity: 1
        backgroundColor: theme.colors.primary,
        marginBottom: 5
    },
    userNameText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    userCityText: {
        color: '#A5A5A5',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default RoseHeader;