import React from 'react';
/* -------------------------------------------------------------------------- */
/*                                List Section                                */
/* -------------------------------------------------------------------------- */
import { createStackNavigator } from '@react-navigation/stack';
import RoseListScreen from '../screens/RoseListScreen';

const ListStack = createStackNavigator();
export const roseListStack = ({ navigation }) => {
    return (
        <ListStack.Navigator headerMode="none">
            <ListStack.Screen name="RoseList" component={RoseListScreen} 
                
            />
            {/* <ListStack.Screen name="RoseDetail" component={RoseDetailScreen}
                options={({ navigation }) =>
                    ({ tabBarVisible: false })}
            /> */}
        </ListStack.Navigator>
    );
}
/* -------------------------------------------------------------------------- */
