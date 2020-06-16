import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Linking, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { AuthContext } from '../../context/AuthContext';
import { MyHeader } from '../../paper-components/memo';
import { BarCodeScanner } from 'expo-barcode-scanner';

const QRCodeScreen = () => {

    const { state: { user } } = useContext(AuthContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scanPressed, setScanPressed] = useState(false);

    const _askForPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        if (status === "granted") {
            setScanPressed(true);
        } else if (status !== "granted") {
            // await BarCodeScanner.requestPermissionsAsync();
            Alert.alert(
                "No camera Permissions",
                "please go to settings and on add camera permissions manually",
                [
                    { text: "cancel", onPress: () => console.log("cancel") },
                    { text: "Allow", onPress: () => Linking.openURL("app-settings:") },
                ],
                { cancelable: false }
            );
            return;
        }
    }

    // useEffect(() => {
    //     askForPermissions();
    // }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log(type);
        const prefix = data.substring(0, 52);
        const suffix = data.substring(52);
        if (prefix === "https://rosey-server.herokuapp.com/users/app?userID="
            && suffix && suffix.length === 24) {
            // alert('Successes!')
            setScanPressed(false);
            try {
                Linking.openURL(data);
            } catch (err) {
                console.log(err.message);
                alert('There was a problem loading that QR Code /:')
            }
        } else {
            alert("That didnt seem like a valid Rozy QR Code, please try a different one")
            setScanPressed(false);
        }
    };

    return (
        <View style={styles.container}>
            <MyHeader style={styles.Headline}> Share your QR Code! </MyHeader>
            {/* https://www.npmjs.com/package/react-native-qrcode-svg */}
            <QRCode
                value={`https://rosey-server.herokuapp.com/users/app?userID=${user._id}`}
                size={200}
                color={'purple'}
            />
            <Button onPress={() => { _askForPermissions(); }} mode="contained">
                Scan a QR Code
            </Button>
            {
                (scanPressed)
                    ? <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                    : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    Headline: {
    },
});

export default QRCodeScreen;