import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { } from 'react-native-elements';

const AccountScreen = () => {

    return (
        <View style={styles.container}>
            <Text> Account</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default AccountScreen;