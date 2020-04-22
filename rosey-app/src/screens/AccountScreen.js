import React, {useContext} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { } from 'react-native-elements';
import { AuthContext } from '../context/AuthContext';

const AccountScreen = ({ navigation }) => {

    const { signout } = useContext(AuthContext);

    // console.log(signout);

    return (
        <View style={styles.container}>
            <Text> Account</Text>
            <Button
                title="Signout"
                onPress={signout}
            />
            <Button
                title="Open Drawer"
                onPress={() => navigation.toggleDrawer()}
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

export default AccountScreen;