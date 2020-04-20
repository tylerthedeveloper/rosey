import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const FriendListScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text> List</Text>
            <Button
                title="go to specific friend"
                onPress={() => navigation.navigate('FriendDetail')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default FriendListScreen;