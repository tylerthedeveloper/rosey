import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { AuthContext } from '../../context/AuthContext';
import { MyHeader } from '../../paper-components/memo';

const QRCodeScreen = () => {

    const { state: { user } } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <MyHeader style={styles.Headline}> Share your QR Code! </MyHeader>
            {/* https://www.npmjs.com/package/react-native-qrcode-svg */}
            <QRCode
                value={`https://rosey-server.herokuapp.com/users/app?userID=${user._id}`}
                size={200}
                color={'purple'}
            />
            <Button onPress={() => { }}>
                QR Code
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // height: 200,
        alignItems: 'center',
        // width: "80%"
    },
    Headline: {
    },
    chips: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 5,
    },
    chip: {
        marginHorizontal: 5,
        marginVertical: 5
    }
});

export default QRCodeScreen;