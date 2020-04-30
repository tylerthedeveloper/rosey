import React from 'react';
import { TouchableOpacity } from 'react-native';
/* -------------------------------------------------------------------------- */
/*                               Main Root Stack                              */
/* -------------------------------------------------------------------------- */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Appbar, Avatar } from 'react-native-paper';
import { theme } from '../core/theme'
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabNavigator } from './Tabs';
import {AddRoseScreen, ProfileScreen, RoseDetailScreen} from '../screens'

const RootStack = createStackNavigator();
export const RootStackNavigator = () => {
    // const theme = useTheme(); // TODO:
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
                        <Appbar.Header theme={{ colors: { primary: theme.colors.secondary } }}>
                            {previous ? (
                                <Appbar.BackAction
                                    onPress={navigation.goBack}
                                    color={theme.colors.primary}
                                />
                            ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.openDrawer();
                                        }}
                                    >
                                        <Avatar.Image
                                            size={40}
                                            source={{
                                                uri:
                                                    'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
                                            }}
                                        />
                                    </TouchableOpacity>
                                )}
                            <Appbar.Content
                                title={
                                    previous ? title : <MaterialCommunityIcons name="flower-poppy" size={40} />
                                }
                            />
                        </Appbar.Header>
                    );
                }
            }}
        >
            <RootStack.Screen
                name="Main"
                component={BottomTabNavigator}
                options={({ navigation, route }) => {
                    // console.log('!@# options', { route });
                    const routeName = route.state
                        ? route.state.routes[route.state.index].name
                        : 'Home';
                    return { headerTitle: routeName };
                }}
            />
            <RootStack.Screen
                name="AddRose"
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
                name="Profile"
                component={ProfileScreen}
                options={{ headerTitle: 'Profile' }}
            />
        </RootStack.Navigator>
    )
};