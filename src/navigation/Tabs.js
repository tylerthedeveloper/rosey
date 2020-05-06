import React from 'react';
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

const BottomTabs = createBottomTabNavigator();

export const BottomTabNavigator = (props) => {

    const isFocused = useIsFocused();

    const screenHeight = Dimensions.get('screen').height;

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

    const tabBarColor = theme.colors.primary;

    // https://stackoverflow.com/questions/60486399/adding-a-custom-add-button-to-creatematerialbottomtabnavigator-in-react-naviga
    return (
        <React.Fragment>
            <BottomTabs.Navigator backBehavior="order" initialRouteName="RoseListStack"
            tabBarOptions={{
                
            }}
                screenOptions={{
                    tabBarColor
                }}
            >
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
                <BottomTabs.Screen name="RoseListStack" component={roseListStack}
                    options={{
                        title:'Rozy',
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
                <FAB
                    visible={isFocused}
                    icon={fabIcon}
                    style={{
                        position: 'absolute',
                        //top: screenHeight - (screenHeight * 0.18),
                        bottom: (screenHeight * 0.105),
                        right: 16,
                        backgroundColor: theme.colors.secondary,
                    }}
                    color="white"
                    onPress={() => props.navigation.navigate('AddRose')}
                />
            </Portal>
        </React.Fragment>
    )
};
/* -------------------------------------------------------------------------- */
