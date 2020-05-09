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
    const screenWidth = Dimensions.get('screen').width;
    const safeArea = useSafeArea();
    const routeName = props.route.state
        ? props.route.state.routes[props.route.state.index].name
        : 'RoseListStack';

    const [fabOpen, setFabOpen] = useState(false);
    const [filterType, setFilterType] = useState('place_met');
    let fabIcon = 'account-plus';
    let fabActions = [];
    let onStateChange = () => null;
    switch (routeName) {
        case 'RoseListStack':
            fabIcon = 'account-plus';
            fabActions = [];
            onFabPress = () => props.navigation.navigate('AddRose')
            onStateChange = () => null;
            break;
        case 'Map':
            fabIcon = 'crosshairs-gps';
            fabActions = [
                {
                    icon: 'account-multiple', label: 'Place Met', onPress: () => setFilterType('place_met'),
                    style: {  bottom: -55, },
                },
                {
                    icon: 'home', label: 'Home Location', onPress: () => setFilterType('home'),
                    style: { right: 75, top: 65, },
                },
            ];
            onStateChange = ({ open }) => setFabOpen(open);
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
                        ? <FAB.Group
                            visible={isFocused}
                            icon={fabIcon}
                            fabStyle={{}}
                            style={{
                                position: 'absolute',
                                //bottom: (screenHeight * 0.105),
                                bottom: safeArea.bottom + 50,

                            }}
                            color="white"
                            actions={fabActions}
                            onPress={onFabPress}
                            onStateChange={onStateChange}
                        />
                        : <FAB.Group
                            open={fabOpen}
                            visible={isFocused}
                            icon={fabIcon}
                            style={{
                                position: 'absolute',
                                bottom: safeArea.bottom + 50,
                                //bottom: (screenHeight * 0.105),
                            }}
                            color="white"
                            actions={fabActions}
                            onStateChange={({ open }) => setFabOpen(open)}
                        />
                }
            </Portal>
        </React.Fragment>
    )
};
/* -------------------------------------------------------------------------- */
