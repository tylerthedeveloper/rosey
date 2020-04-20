import React, { useContext } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import AuthForm from '../components/AuthForm';
// import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';

const SignupScreen = ({ navigation }) => {
    const { state: { errorMessage }, signup, clearErrorMessage } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <NavigationEvents onWillFocus={() => clearErrorMessage()} />
            <AuthForm
                headerText="Sign up for Rosey"
                submitButtonText="Sign Up"
                errorMessage={errorMessage}
                onSubmit={signup}
            />
            <Button
                title="Already registed, go to signin"
                onPress={() => navigation.navigate('Signin')}
            />
        </View>
    )
}

SignupScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default SignupScreen;