import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Avatar, Card, Paragraph, Title } from 'react-native-paper';
import { theme } from '../../core/theme';

const RoseHeader = ({ name, picture, homeCity, homeState, homeCountry }) => (
    <ImageBackground
        // source={{ uri: 'https://picsum.photos/700' }}
        source={require('../../../assets/background_dot_2x.png')}
        resizeMode="repeat"
        style={styles.headerBackgroundImage}>
        <Card.Content style={{ alignSelf: 'center', alignItems: 'center' }}>
            <Avatar.Image
                style={styles.avatar}
                size={100}
                source={{
                    uri:
                        (picture && picture.length > 3) ? picture : 'https://image.shutterstock.com/image-vector/people-icon-260nw-522300817.jpg',
                }}
            />
            <Title style={styles.userNameText}>{name || 'No-name!'}</Title>
            <Paragraph style={styles.userCityText}>{homeCity || '(city)'}, {homeState || '(state)'}, {homeCountry || '(country)'}</Paragraph>
        </Card.Content>
    </ImageBackground>
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
        borderRadius: 85,
        borderWidth: 3,
        marginBottom: 3
    },
    userNameText: {
        color: '#FFF',
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