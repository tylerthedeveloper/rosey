import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Avatar, Card, Paragraph, Title, IconButton } from 'react-native-paper';
import { theme } from '../../core/theme';
import { MyShadowCard } from '../memo';

const RoseHeader = ({ name, picture, homeCity, homeState, homeCountry, isUserContactCard, editing, _setEditing, shareProfile }) => (
    // source={{ uri: 'https://picsum.photos/700' }}
    <MyShadowCard
    // source={require('../../../assets/background_dot_2x.png')}
    // resizeMode="repeat"
    // style={styles.headerBackgroundImage}
    >
        <Card.Content style={{ alignSelf: 'center', alignItems: 'center', paddingBottom: 5 }}>
            <Avatar.Image
                style={styles.avatar}
                size={100}
                source={{
                    uri:
                        (picture && picture.length > 3) ? picture : 'https://image.shutterstock.com/image-vector/people-icon-260nw-522300817.jpg',
                }}
            />
            <Title style={styles.userNameText}>{name || 'No-name!'}</Title>
            {/* <Paragraph style={styles.userCityText}>{homeCity || '(city)'}, {homeState || '(state)'}, {homeCountry || '(country)'}</Paragraph> */}
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
        borderColor: theme.primary || '#600EE6',
        borderBottomEndRadius: 44,
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