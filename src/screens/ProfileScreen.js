import React, { useContext, useState } from 'react';
import { ImageBackground, StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Button, Card, IconButton, Paragraph, Title } from 'react-native-paper';
import Spacer from '../components/Spacer';
import { AuthContext } from '../context/AuthContext';
import { theme } from '../core/theme';

// TODO: get better colored background
const avatarBackground = 'https://orig00.deviantart.net/dcd7/f/2014/027/2/0/mountain_background_by_pukahuna-d73zlo5.png';
const noProPicPhoto = require('../../assets/avatar_placeholder.png');

const ProfileScreen = ({ navigation }) => {

    const { state: { user }, signout, updateProfile } = useContext(AuthContext);

    const { email, tags, name, nickName, birthday, phoneNumber, picture,
        homeLocation, work
    } = user;//JSON.parse(user);
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

    const [updated_phoneNumber, setPhone] = useState(phoneNumber);
    const [updated_email, setEmail] = useState(email);

    const rows = [
        {
            title: phoneNumber || '(123456789)', subtitle: 'phone',
            left: "phone",
            rightIcon: "phone",
            rightFunc: () => { setPhone('321') }
        },
        {
            title: email || '(someone@...)', subtitle: 'email',
            left: "email",
            rightIcon: "email",
            rightFunc: () => { setEmail('new email') }
        },
        {
            title: tags.length > 0 ? tags : '(Add some Tags!)', subtitle: 'tag',
            left: "tag",
            rightIcon: "tag",
            rightFunc: () => { }
        },
        {
            title: birthday || '(Enter Birthday!)', subtitle: 'birthday',
            left: "calendar",
            rightIcon: "calendar-heart",
            rightFunc: () => { }
        },
        {
            title: work || '(Add Occupation!)', subtitle: 'occupation',
            left: "briefcase-account",
            rightIcon: "briefcase-plus",
            rightFunc: () => { }
        },
    ];

    user.email = updated_email;
    user.phoneNumber = updated_phoneNumber;

    console.log(user);

    const renderHeader = () => {
        return (
            <Card style={styles.card}>
                <ImageBackground
                    source={{ uri: 'https://picsum.photos/700' }}
                    style={styles.headerBackgroundImage}>
                    <Card.Content style={{ alignSelf: 'center', alignItems: 'center' }}>
                        <Avatar.Image
                            style={styles.avatar}
                            size={100}
                            source={{
                                uri:
                                    'https://image.shutterstock.com/image-vector/people-icon-260nw-522300817.jpg',
                            }}
                        />
                        <Title style={styles.userNameText}>{name || 'No-name!'}</Title>
                        <Paragraph style={styles.userCityText}>{city}, {state}, {country}</Paragraph>
                    </Card.Content>
                </ImageBackground>
                <ScrollView>
                    {
                        rows.map(({ title, subtitle, left, rightIcon, rightFunc }) => (
                            <Card.Actions style={styles.cardRow} key={title}>
                                <Card.Title
                                    title={title}
                                    subtitle={subtitle}
                                    left={(props) => <Avatar.Icon icon={left}  {...props} />}
                                    right={(props) => <IconButton icon={rightIcon} {...props} onPress={rightFunc} />}
                                />
                            </Card.Actions>
                        ))
                    }
                </ScrollView>
            </Card>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            <Button
                title="AddTags"
            />
            <Button
                onPress={() => updateProfile({ name: "new Name2" })}
            >
                Update Profile
            </Button>
            <Button
                title="Signout"
                onPress={signout}
            >
                Signout
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    card: {
        borderWidth: 0,
        paddingBottom: 10,
    },
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
    cardRow: {
        // padding: 10
    }


})

export default ProfileScreen;