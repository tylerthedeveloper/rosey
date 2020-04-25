import React, { useContext } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';

const AccountScreen = ({ navigation }) => {

    const { state: { user }, signout } = useContext(AuthContext);
    const userObj = JSON.parse(user);
    const { email, tags, name } = userObj;
    console.log(user);
    return (
        <View style={styles.container}>
            <Text h2> Account</Text>
            <Text> Email: {email}</Text>
            <Text> Name: {name}</Text>
            <Text> MY Tags: {tags}</Text>
            <Button
                title="AddTags"
            />
            <Spacer />
            <Button
                title="Signout"
                onPress={signout}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    }
});

export default AccountScreen;