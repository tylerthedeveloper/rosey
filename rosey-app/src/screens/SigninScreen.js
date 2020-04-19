import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const SigninScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button
                title="go to main flow"
                onPress={() => navigation.navigate('mainTabFlow')}
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

export default SigninScreen;