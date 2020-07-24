import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Avatar, Card, Paragraph, Title, IconButton } from 'react-native-paper';
import { theme } from '../../core/theme';
import { MyShadowCard } from '../memo';
import * as Linking from 'expo-linking'

const RoseHeader = ({ name, picture, homeCity, homeState, homeCountry, isUserContactCard, editing, _setEditing, shareProfile,
    phoneNumber, email
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
                                        return (<View>
                                            <IconButton
                                                key={headerButtonIcon}
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
            <IconButton
                    icon={editing ? "close-circle" : "pencil"}
                    size={25}
                    onPress={() => _setEditing(!editing)}
                    style={{ right: 10, top: 5, alignSelf: 'flex-end', position: 'absolute' }}
                />
                {
                    (isUserContactCard) &&
                    <IconButton
                        icon="share"
                        size={25}
                        onPress={shareProfile}
                        style={{ right: 10, alignSelf: 'flex-end', bottom: 0, position: 'absolute' }}
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
        // shadowColor: theme.primary || '#600EE6',
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