import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { } from 'react-native-elements';

const {{name}}Screen = () => {

    return (
        <View style={styles.container}>
            <Text> {{name}}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default {{name}}Screen;