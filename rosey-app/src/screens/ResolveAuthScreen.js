import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { } from 'react-native-elements';
// import { Context as AuthContext } from '../context/AuthContext';

const ResolveAuthScreen = () => {

    return (
        <View style={styles.container}>
            <ActivityIndicator
                size="large"
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

export default ResolveAuthScreen;