import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
/* -------------------------------------------------------------------------- */
/*                               Main Root Stack                              */
/* -------------------------------------------------------------------------- */
import { Image, Platform, Text, TouchableOpacity } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import { Context as TagContext } from '../context/TagContext';
import { theme } from '../core/theme';
import { AddRoseScreen, RoseDetailScreen } from '../screens';
import { ContactCardScreen, ContactsScreen, FeedbackScreen, QRCodeScreen, RozyStoryScreen, TagScreen } from '../screens/Drawer';
import { BottomTabNavigator } from './Tabs';
import SharedResolverScreen from '../screens/SharedResolverScreen';
import { Constants } from "expo";

import { Context as ContactsContext } from '../context/ContactsContext';

const RootStack = createStackNavigator();

const _generateInitials = (nameString) => {
    let initials;
    const names = (nameString) ? nameString.split(' ') : null;
    if (names) {
        initials = (names[0]).substring(0, 1).toUpperCase();
        if (names[1]) {
            initials += (names[1]).substring(0, 1).toUpperCase();
        }
    }
    return initials;
}

export const RootStackNavigator = () => {

    // const theme = useTheme(); // TODO:

    const { state: { user } } = useContext(AuthContext);
    const name = (user) ? user.name : '';

    const { getInitialTags } = useContext(TagContext);
    const { getImportedContacts } = useContext(ContactsContext);

    useEffect(() => {
        getImportedContacts();
        getInitialTags();
    }, []);

    // TODO: Do i care about middle names??
    let initials = _generateInitials(user.name);

    return (
        <RootStack.Navigator
            initialRouteName="Main"
            headerMode="screen"
            screenOptions={{
                header: ({ scene, previous, navigation }) => {
                    const { options } = scene.descriptor;
                    const title =
                        options.headerTitle !== undefined
                            ? options.headerTitle
                            : options.title !== undefined
                                ? options.title
                                : scene.route.name;
                    return (
                        <Appbar.Header theme={{ colors: { primary: theme.colors.primary } }}
                            // statusBarHeight={(Platform.OS === 'ios') ? Expo.Constants.statusBarHeight + 3 : 0}
                            statusBarHeight={Expo.Constants.statusBarHeight + 3}
                        >
                            {
                                previous ? (
                                    <Appbar.BackAction
                                        onPress={navigation.goBack}
                                        color={'white'}
                                    />
                                ) : (
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.openDrawer();
                                            }}
                                            style={{
                                                marginLeft: 10, marginBottom: 10, borderColor: 'white', borderBottomLeftRadius: 30,
                                                borderBottomRightRadius: 30,
                                                borderTopRightRadius: 30,
                                                borderTopLeftRadius: 30,
                                                borderWidth: 1
                                            }}
                                        >
                                            {
                                                (initials & !Platform.isPad)
                                                    ? <Avatar.Text size={40} label={initials}
                                                        style={{ borderColor: 'white', borderWidth: 1 }}
                                                    />
                                                    : <Avatar.Image
                                                        source={
                                                            require('../../assets/app-icon.png')
                                                        }
                                                        style={{
                                                            // borderColor: 'white', borderBottomLeftRadius: 30,
                                                            // borderBottomRightRadius: 30,
                                                            // borderTopRightRadius: 30,
                                                            // borderTopLeftRadius: 30,
                                                            // borderWidth: 1
                                                        }}
                                                        size={50}
                                                    />
                                            }
                                        </TouchableOpacity>
                                    )
                            }
                            < Appbar.Content
                                title={
                                    previous ? title :
                                        (Platform.OS === 'ios')
                                            ? <Image source={require('../../assets/rozy-logo.png')} style={{ height: 45, width: 75 }} />
                                            : <Text style={{ fontFamily: 'monospace' }}> Rozy </Text>
                                }

                            />
                        </Appbar.Header >
                    );
                }
            }}
        >
            <RootStack.Screen
                name="Main"
                component={BottomTabNavigator}
                options={({ navigation, route }) => {
                    const routeName = route.state
                        ? route.state.routes[route.state.index].name
                        : 'Home';
                    return { headerTitle: routeName };
                }}
            />
            <RootStack.Screen
                name="AddRose"
                path="addrose"
                component={AddRoseScreen}
                options={{ headerTitle: 'Add Rose' }}
            />
            {/* // TODO: why should or should the below NOT go in rose lsit stack!? */}
            <RootStack.Screen
                name="RoseDetail"
                component={RoseDetailScreen}
                options={{ headerTitle: 'Details' }}
            />
            <RootStack.Screen
                name="ContactCard"
                component={ContactCardScreen}
                options={{ headerTitle: 'My Contact Card' }}
            />
            <RootStack.Screen
                name="ContactsScreen"
                component={ContactsScreen}
                options={{ headerTitle: 'Contacts' }}
            />
            <RootStack.Screen
                name="TagScreen"
                component={TagScreen}
                options={{ headerTitle: 'Tags' }}
            />
            <RootStack.Screen
                name="QRCode"
                component={QRCodeScreen}
                options={{ headerTitle: 'QRCode' }}
            />
            <RootStack.Screen
                name="SharedResolver"
                component={SharedResolverScreen}
                options={{ headerTitle: 'Sharing users' }}
            />
            <RootStack.Screen
                name="RozyStory"
                component={RozyStoryScreen}
                options={{ headerTitle: 'Rozy Story' }}
            />
            <RootStack.Screen
                name="Feedback"
                component={FeedbackScreen}
                options={{ headerTitle: 'Feedback' }}
            />
        </RootStack.Navigator >
    )
};