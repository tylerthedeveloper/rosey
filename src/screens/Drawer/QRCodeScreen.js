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

    // TODO:PLEASE
    // const URL = "https://a5257a3df6b6.ngrok.io/users/app?userID=
    const URL = "https://rosey-server.herokuapp.com/users/app?userID=";

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log(data);
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

    const { uid } = user;
    // console.log('uid', uid)

    return (
        <MyShadowCard inheritedMarginHorizontal={0} inheritedMarginTop={20}>
            <View style={styles.container}>
                <MyHeader style={styles.Headline}> Share your QR Code! </MyHeader>
                {/* https://www.npmjs.com/package/react-native-qrcode-svg */}
                <QRCode
                    // value={`https://rosey-server.herokuapp.com/users/app?userID=${uid}`}
                    value={URL + uid}
                    size={200}
                    color={'purple'}
                />
                <View style={{ alignItems: 'center' }}>
                    <MyButton onPress={() => _askForPermissions()} mode="contained" style={{ marginVertical: 30 }} icon={'camera'}>
                        Scan a QR Code
                </MyButton>
                    <MyButton onPress={() => Constants._shareProfile(uid)} mode="outlined" icon={'account'}>
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