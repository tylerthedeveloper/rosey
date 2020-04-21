import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { } from 'react-native-elements';

const RoseDetailScreen = () => {

    return (
        <View style={styles.container}>
            <Text> FriendDetail</Text>
        </View>
    )
}

RoseDetailScreen.navigationOptions = {
    // tabBarIcon: <FontAwesome name="list" size={20} />,
    header: () => null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default RoseDetailScreen;