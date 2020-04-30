import React, { useEffect, useContext, useMemo, useReducer } from 'react';
import { FlatList, StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native';
import { MultiBar, MultiBarToggle } from 'react-native-multibar';

/* -------------------------------------------------------------------------- */
/*                                Auth Section                                */
/* -------------------------------------------------------------------------- */
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';

const AuthStack = createStackNavigator();
export const authStackScreen = () => {
    return (
        <AuthStack.Navigator headerMode="none">
            <AuthStack.Screen name="Splash" component={SplashScreen} />
            <AuthStack.Screen name="Signup" component={SignupScreen} />
            <AuthStack.Screen name="Signin" component={SigninScreen} />
        </AuthStack.Navigator>
    );
}
/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */
/*                                List Section                                */
/* -------------------------------------------------------------------------- */
import RoseListScreen from '../screens/RoseListScreen';
import RoseDetailScreen from '../screens/RoseDetailScreen';

const ListStack = createStackNavigator();
export const listStack = ({ navigation }) => {
    return (
        <ListStack.Navigator headerMode="none">
            <ListStack.Screen name="RoseList" component={RoseListScreen} />
            {/* <ListStack.Screen name="RoseDetail" component={RoseDetailScreen}
                options={({ navigation }) =>
                    ({ tabBarVisible: false })}
            /> */}
        </ListStack.Navigator>
    );
}
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                                 Tab Section                                */
/* -------------------------------------------------------------------------- */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/MapScreen';
import { FontAwesome } from '@expo/vector-icons';
import { Portal, FAB } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

const BottomTabs = createBottomTabNavigator();
const BottomTabNavigator = (props) => {
    const isFocused = useIsFocused();

    const routeName = props.route.state
        ? props.route.state.routes[props.route.state.index].name
        : 'Feed';

    switch (routeName) {
        case 'Map':
            fabIcon = 'crosshairs-gps';
            break;
        default:
            fabIcon = 'account-plus';
            break;
    }

    // https://stackoverflow.com/questions/60486399/adding-a-custom-add-button-to-creatematerialbottomtabnavigator-in-react-naviga
    // <>
    // <Button
    //     navigation={navigation}
    //     style={{
    //         position: 'absolute',
    //         zIndex: 99,
    //         bottom: 5,
    //         alignSelf: 'center',
    //         backgroundColor: 'blue',
    //         shadowColor: 'black',
    //         shadowOpacity: 0.15,
    //         shadowOffset: { width: 0, height: 2 },
    //         shadowRadius: 8,
    //         elevation: 3 //Because shadow only work on iOS, elevation is same thing but for android.
    //     }}
    // ></Button>
    return (
        <React.Fragment>
            <BottomTabs.Navigator backBehavior="order" initialRouteName="RoseListStack">
                <BottomTabs.Screen name="Map" component={MapScreen}
                    options={{
                        tabBarLabel: 'Map',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome
                                name="map"
                                size={24}
                                style={{ marginBottom: -15 }}
                            />)
                    }}
                />
                <BottomTabs.Screen name="RoseListStack" component={listStack}
                    options={{
                        tabBarLabel: 'Roses',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome
                                name="list"
                                size={24}
                            />)
                    }} />
            </BottomTabs.Navigator>
            <Portal>
                <FAB
                    visible={isFocused}
                    icon={fabIcon}
                    style={{
                        position: 'absolute',
                        bottom: 100,
                        right: 16,
                    }}
                    onPress={() => props.navigation.navigate('AddRose')}
                />
            </Portal>
        </React.Fragment>
    )
};
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                               Main Root Stack                              */
/* -------------------------------------------------------------------------- */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Appbar, Avatar } from 'react-native-paper';
import { theme } from '../core/theme'
import ProfileScreen from '../screens/ProfileScreen';

const RootStack = createStackNavigator();
const RootStackNavigator = () => {
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

/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */
/*                               Drawer Section                               */
/* -------------------------------------------------------------------------- */
import { createDrawerNavigator } from '@react-navigation/drawer';
// TODO:
import AddRoseScreen from '../screens/AddRoseScreen';

const Drawer = createDrawerNavigator();
export const App = () => {
    return (
        <Drawer.Navigator initialRouteName="Main" drawerType="slide" >
            <Drawer.Screen name="RootStack" component={RootStackNavigator} />
        </Drawer.Navigator >
    );
}
/* -------------------------------------------------------------------------- */


