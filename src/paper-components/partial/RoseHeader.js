import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Avatar, Card, Paragraph, Title, IconButton } from 'react-native-paper';
import { theme } from '../../core/theme';
import { MyShadowCard } from '../memo';
import * as Linking from 'expo-linking'

const RoseHeader = ({ name, picture, homeCity, homeState, homeCountry, isUserContactCard, editing, _setEditing, shareProfile,
    phoneNumber, email// , headerToContainer
}) => {

    // source={{ uri: 'https://picsum.photos/700' }}

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
                    <Avatar.Icon
                        style={styles.avatar}
                        size={80}
                        icon={'account'}
                    // source={{
                    //     uri:
                    //         (picture && picture.length > 3) ? picture : 'https://image.shutterstock.com/image-vector/people-icon-260nw-522300817.jpg',
                    // }}
                    />
                    <Title style={{ ...styles.userNameText, fontFamily: (Platform.OS === 'android') ? 'sans-serif-light' : 'Avenir-Heavy' }}>{name || 'No-name!'}</Title>
                </View>
                <View>
                    {
                        (!isUserContactCard)
                            ? <View style={{ marginBottom: 5, flexDirection: 'row', }}>
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
            {/* {
                (!editing) ?
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
                            style={{ right: 55, top: 10, alignSelf: 'flex-end', position: 'absolute', backgroundColor: theme.colors.text }}
                        />
                        <IconButton
                            icon={"content-save"}
                            size={20}
                            onPress={() => _setEditing(!editing)}
                            color={'white'}
                            style={{ right: 10, top: 10, alignSelf: 'center', position: 'absolute', backgroundColor: theme.colors.text }}
                        />
                    </>
            } */}
            {
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
            }
            {
                (isUserContactCard && !editing) &&
                <IconButton
                    icon="share"
                    size={20}
                    onPress={shareProfile}
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
        backgroundColor: theme.colors.primary
        // shadowOpacity: 1
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