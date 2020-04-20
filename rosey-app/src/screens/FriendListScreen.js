import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

const FriendListScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Button
                title="go to specific friend"
                onPress={() => navigation.navigate('FriendDetail')}
            />
        </View>
    )
}

FriendListScreen.navigationOptions = {
    tabBarIcon: <FontAwesome name="list" size={20} />,
    header: () => null,
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default FriendListScreen;