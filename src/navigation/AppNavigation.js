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

const BottomTabs = createBottomTabNavigator();
const BottomTabNavigator = () => {
    return (
        // https://stackoverflow.com/questions/60486399/adding-a-custom-add-button-to-creatematerialbottomtabnavigator-in-react-naviga
        // <>
        //     <Button
        //         navigation={navigation}
        //         style={{
        //             position: 'absolute',
        //             zIndex: 99,
        //             bottom: 5,
        //             alignSelf: 'center',
        //             backgroundColor: 'blue',
        //             shadowColor: 'black',
        //             shadowOpacity: 0.15,
        //             shadowOffset: { width: 0, height: 2 },
        //             shadowRadius: 8,
        //             elevation: 3 //Because shadow only work on iOS, elevation is same thing but for android.
        //         }}
        //     ></Button>
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
    )
};
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                               Main Root Stack                              */
/* -------------------------------------------------------------------------- */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Appbar, Avatar } from 'react-native-paper';
import { theme } from '../core/theme'

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
                                    onPress={navigation.pop}
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
                options={({ route }) => {
                    console.log('!@# options', { route });
                    const routeName = route.state
                        ? route.state.routes[route.state.index].name
                        : 'Main';
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
        </RootStack.Navigator>
    )
};

/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */
/*                               Drawer Section                               */
/* -------------------------------------------------------------------------- */
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen';
import AddRoseScreen from '../screens/AddRoseScreen';

const Drawer = createDrawerNavigator();
{/* <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="AddRose" component={AddRoseScreen}
        options={{
            title: "Add new Rose"
        }}
    />
    <Drawer.Screen name="Main" component={TabNavigator} /> */}
export const App = () => {
    return (
        <Drawer.Navigator initialRouteName="Main">
            <Drawer.Screen name="RootStack" component={RootStackNavigator} />
        </Drawer.Navigator >
    );
}

// const DrawerStack = createStackNavigator();
// export const App = () => {
//     return (
//         <DrawerStack.Navigator
//         >
//             <DrawerStack.Screen
//                 component={DrawerNavigator}
//                 name="App"
//                 options={({ navigation, route }) => ({
//                     headerTitle: null,
//                     // headerTransparent: true,
//                     // headerBackground: () => (
//                     //   <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
//                     // ),
//                     headerLeft: () => {
//                         return <View style={{ flexDirection: 'row' }}>
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     navigation.dispatch(DrawerActions.toggleDrawer());
//                                 }}>
//                                 <Text>Open</Text>
                                // {/* <Image source={require('./assets/images/icons/drawer.png')} /> */}
//                             </TouchableOpacity>
//                         </View>
//                     }
//                 })}
//             />
//         </DrawerStack.Navigator>
//     );
// }
/* -------------------------------------------------------------------------- */


