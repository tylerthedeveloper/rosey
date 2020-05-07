import React, { useState } from 'react';
/* -------------------------------------------------------------------------- */
/*                                 Tab Section                                */
/* -------------------------------------------------------------------------- */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/MapScreen';
import { FontAwesome } from '@expo/vector-icons';
import { Portal, FAB } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { roseListStack } from './RoseListStack';
import { theme } from '../core/theme';
import { Dimensions } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

const BottomTabs = createBottomTabNavigator();

export const BottomTabNavigator = (props) => {

    const isFocused = useIsFocused();
    const screenHeight = Dimensions.get('screen').height;
    const safeArea = useSafeArea();
    const routeName = props.route.state
        ? props.route.state.routes[props.route.state.index].name
        : 'RoseListStack';

    const [fabOpen, setFabOpen] = useState(false);
    const [filterType, setFilterType] = useState(1)
    let fabIcon = 'account-plus';
    let fabActions = [];
    switch (routeName) {
        case 'RoseListStack':
            fabIcon = 'account-plus';
            fabActions = [];
            onFabPress = () => props.navigation.navigate('AddRose')
            break;
        case 'Map':
            fabIcon = 'crosshairs-gps';
            fabActions = [
                { icon: 'plus', onPress: () => console.log('Pressed add') },
                { icon: 'star', label: 'Star', onPress: () => console.log('Pressed star') },
                { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
                { icon: 'bell', label: 'Remind', onPress: () => console.log('Pressed notifications') },
            ];
            // TODO:
            // 1. this can be used to set current location for geo
            // 2. this can be used to change to filter type
            onFabPress = () => setFilterType(filterType + 1);
            break;
        default:
            fabIcon = '';
            fabActions = [];
            onFabPress = () => console.log('mail')
            break;
    }

    const tabBarColor = theme.colors.primary;
    // https://stackoverflow.com/questions/60486399/adding-a-custom-add-button-to-creatematerialbottomtabnavigator-in-react-naviga

    // TODO: Safe area https://github.com/Trancever/twitterClone/blob/master/src/bottomTabs.tsx
    return (
        <React.Fragment>
            <BottomTabs.Navigator backBehavior="order" initialRouteName="RoseListStack"
                tabBarOptions={{

                }}
                screenOptions={{
                    tabBarColor
                }}
            >
                <BottomTabs.Screen name="Map"
                    // TODO:
                    options={{
                        tabBarLabel: 'Map',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome
                                name="map"
                                size={24}
                            />)
                    }}
                >
                    {(props) => <MapScreen //currentLocation={currentLocation}
                        filterType={filterType}
                        {...props}
                    />}
                </BottomTabs.Screen>
                <BottomTabs.Screen name="RoseListStack" component={roseListStack}
                    options={{
                        title: 'Rozy',
                        tabBarColor,
                        tabBarLabel: 'Roses',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome
                                name="list"
                                size={24}
                            />)
                    }} />
            </BottomTabs.Navigator>
            <Portal>
                {
                    (routeName === 'RoseListStack')
                        ? <FAB
                            visible={isFocused}
                            icon={fabIcon}
                            style={{
                                position: 'absolute',
                                //bottom: (screenHeight * 0.105),
                                bottom: safeArea.bottom + 70,
                                right: 25,
                            }}
                            color="white"
                            onPress={onFabPress}
                        />
                        : <FAB
                            visible={isFocused}
                            icon={fabIcon}
                            style={{
                                position: 'absolute',
                                //bottom: (screenHeight * 0.105),
                                bottom: safeArea.bottom + 70,
                                right: 25,
                            }}
                            color="white"
                            onPress={onFabPress}
                        />
                }
                {/* : <FAB.Group
                            open={fabOpen}
                            visible={isFocused}
                            icon={fabIcon}
                            style={{
                                position: 'absolute',
                                bottom: safeArea.bottom + 55,
                                right: 16,
                            }}
                            color="white"
                            onPress={onFabPress}
                            actions={fabActions}
                            onStateChange={({ open }) => setFabOpen(open)}
                        /> */}
            </Portal>
        </React.Fragment>
    )
};
/* -------------------------------------------------------------------------- */
