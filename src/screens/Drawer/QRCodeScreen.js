import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useContext, useState } from 'react';
import { Alert, Linking, StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Provider } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import Constants from '../../constants';
import { AuthContext } from '../../context/AuthContext';
import { MyButton, MyHeader, MyShadowCard } from '../../paper-components/memo';

const QRCodeScreen = () => {

    const { state: { user } } = useContext(AuthContext);

    // const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scanPressed, setScanPressed] = useState(false);
    const [visible, setVisible] = React.useState(false);

    const _askForPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        if (status === "granted") {
            setScanPressed(true);
            setVisible(true)
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

    // const showModal = () => setVisible(true);

    // const hideModal = () => {
    //     setVisible(false);
    //     setScanPressed(false);
    // }


    // useEffect(() => {
    //     askForPermissions();
    // }, []);


    const { uid } = user;
    // TODO:PLEASE
    // const URL = "https://a5257a3df6b6.ngrok.io/users/app?userID=
    const URL = Constants.linksDictionary.rozy_server_url + "users/app?userID=";
    const full_URL = URL + uid;

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setVisible(false)
        const prefix = data.substring(0, 52);
        const suffix = data.substring(52);
        setScanned(false)
        if (prefix === URL && suffix) {
            // alert('Successes!')
            setScanPressed(false);
            try {
                Linking.openURL(data);
            } catch (err) {
                console.log(err.message);
                alert('There was a problem loading that QR Code /:')
            }
        } else {
            setScanPressed(false);
            alert("That didnt seem like a valid Rozy QR Code, please try a different one")
        }
    };

    // console.log('url', uid)

    return (
        <MyShadowCard inheritedMarginHorizontal={0} inheritedMarginTop={20}>
            <View style={styles.container}>
                <MyHeader style={styles.Headline}> Share your QR Code! </MyHeader>
                {/* https://www.npmjs.com/package/react-native-qrcode-svg */}
                <QRCode
                    // value={`https://rosey-server.herokuapp.com/users/app?userID=${uid}`}
                    value={full_URL}
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
                    // (scanPressed)
                    //     ? <Provider>
                    //         <Portal>
                    //             <Modal visible={visible} onDismiss={hideModal}>
                    //                 <View style={{ flex: 1 }}>
                    //                     <BarCodeScanner
                    //                         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    //                     style={StyleSheet.absoluteFillObject}
                    //                     // style={{ height: '70%', width: '70%' }}
                    //                     />
                    //                 </View>
                    //             </Modal>
                    //         </Portal>
                    //     </Provider>
                    //     : null
                    (scanPressed)
                        ?
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            style={StyleSheet.absoluteFillObject}
                        // style={{ height: '70%', width: '70%' }}
                        />
                        : null
                }
                {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
            </View >
        </MyShadowCard >
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