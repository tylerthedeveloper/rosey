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

const BottomTabs = createBottomTabNavigator();
export const BottomTabNavigator = (props) => {
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
                <BottomTabs.Screen name="RoseListStack" component={roseListStack}
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
