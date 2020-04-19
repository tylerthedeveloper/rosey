import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const SignupScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Button 
                title="go to signin"
                onPress={() => navigation.navigate('Signin')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
});

export default SignupScreen;