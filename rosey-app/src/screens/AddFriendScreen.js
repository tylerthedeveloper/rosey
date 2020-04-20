import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import Spacer from '../components/Spacer';

const AddFriendScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text> AddFriend</Text>
            <Spacer />
            <Button
                title="Add Friend"
            />
            <Spacer />
            <Button
                title="Cancel (X)"
                onPress={() => navigation.goBack()}
            />

        </View>
    )
}

AddFriendScreen.navigationOptions = {
    title: 'Add Friend',
    tabBarIcon: <FontAwesome name="plus" size={30} />
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default AddFriendScreen;