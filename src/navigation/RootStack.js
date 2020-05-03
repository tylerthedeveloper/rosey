import React, { useContext } from 'react';
/* -------------------------------------------------------------------------- */
/*                               Main Root Stack                              */
/* -------------------------------------------------------------------------- */
import { TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Appbar, Avatar } from 'react-native-paper';
import { theme } from '../core/theme'
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabNavigator } from './Tabs';
import { AddRoseScreen, ProfileScreen, RoseDetailScreen } from '../screens'
import { AuthContext } from '../context/AuthContext';

const RootStack = createStackNavigator();

export const RootStackNavigator = () => {

    // const theme = useTheme(); // TODO:

    const { state: { user } } = useContext(AuthContext);

    // TODO: Try to get second inital
    const firstInitial = (user.name) ? user.name.substring(0, 1).toUpperCase() : '';

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
                        <Appbar.Header theme={{ colors: { primary: theme.colors.primary } }}>
                            {previous ? (
                                <Appbar.BackAction
                                    onPress={navigation.goBack}
                                    color={'white'}
                                />
                            ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.openDrawer();
                                        }}
                                    >
                                        {
                                            (firstInitial)
                                                ? <Avatar.Text size={40} label={firstInitial}
                                                    style={{ borderColor: 'white', borderWidth: 1}}
                                                />
                                                : <Avatar.Image
                                                    source={
                                                        require('../../assets/5.png')
                                                    }
                                                    size={50}
                                                />
                                        }
                                    </TouchableOpacity>
                                )}
                            {/* previous ? title : <MaterialCommunityIcons name="flower-poppy" size={40} /> */}
                            <Appbar.Content
                                title={
                                    previous ? title : <Image source={require('../../assets/rozy-logo.png')} style={{ height: 45, width: 75 }}/>
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