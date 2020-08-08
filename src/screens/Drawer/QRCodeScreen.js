import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Linking, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { AuthContext } from '../../context/AuthContext';
import { MyHeader, MyShadowCard } from '../../paper-components/memo';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MyButton } from '../../paper-components/memo';
import Constants from '../../constants';

const QRCodeScreen = () => {

    const { state: { user } } = useContext(AuthContext);
    // const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scanPressed, setScanPressed] = useState(false);

    const _askForPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        if (status === "granted") {
            setScanPressed(true);
        } else if (status !== "granted") {
            // await BarCodeScanner.requestPermissionsAsync();
            Alert.alert(
                "No camera Permissions",
                "please go to settings and on add camera permissions manually",
                [
                    { text: "Ok", onPress: () => console.log("cancel") },
                    // { text: "Manual", onPress: () => Linking.openURL("app-settings:") },
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
        // console.log(type);
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
        <MyShadowCard inheritedMarginHorizontal={0} inheritedMarginTop={20}>
            <View style={styles.container}>
                <MyHeader style={styles.Headline}> Share your QR Code! </MyHeader>
                {/* https://www.npmjs.com/package/react-native-qrcode-svg */}
                <QRCode
                    value={`https://rosey-server.herokuapp.com/users/app?userID=${user._id}`}
                    size={200}
                    color={'purple'}
                />
                <View style={{ alignItems: 'center' }}>
                    <MyButton onPress={() => _askForPermissions()} mode="contained" style={{ marginVertical: 30 }} icon={'camera'}>
                        Scan a QR Code
                </MyButton>
                    <MyButton onPress={() => Constants._shareProfile(user._id)} mode="outlined" icon={'account'}>
                        Share your card
                </MyButton>
                </View>
                {
                    (scanPressed)
                        ? <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            style={StyleSheet.absoluteFillObject}
                        />
                        : null
                }
            </View>
        </MyShadowCard>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'space-evenly',
        // justifyContent: 'flex-start',
        height: '95%',
        alignItems: 'center',
        marginBottom: 20
    },
    Headline: {
    },
});

export default QRCodeScreen;