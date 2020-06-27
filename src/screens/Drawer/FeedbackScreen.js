import React from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { } from 'react-native-elements';
import { Button, Headline } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import { Alert } from 'react-native';
import * as StoreReview from 'expo-store-review';

const FeedbackScreen = () => {

    const buttons = [
        {
            label: "Rate in app store", icon: 'star', onPress: () => {
                try {
                    StoreReview.requestReview();
                } catch (err) {
                    console.log(err.message);
                }
            }
        },
        {
            label: "Chat on imessage or email", icon: 'chat', onPress: () => {
                Alert.alert(
                    "How would you like to chat?",
                    "I am available via text or email!",
                    [
                        { text: "Text", onPress: () => Linking.openURL(`sms:9739029054`) },
                        { text: "Email", onPress: () => Linking.openURL("mailto:rozycontact@gmail.com") },
                        {
                            text: "Cancel",
                            style: "destructive"
                        },
                    ],
                    { cancelable: true }
                );
            }
        },
        { label: "Support Website", icon: 'help', onPress: () => { WebBrowser.openBrowserAsync('http://rozy-website.herokuapp.com/') } },
    ]

    const openMessage = () => { }

    return (
        <View style={styles.container}>
            <Headline style={styles.Headline}>
                Thank you for your interest, how would you like to share feedback?
            </Headline>
            {
                buttons.map(({ label, icon, onPress }, index) => (
                    <Button onPress={onPress} mode={(index % 2) ? "outlined" : "contained"} style={{ marginVertical: 20 }} key={index} icon={icon}>
                        {label}
                    </Button>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    Headline: {
        marginVertical: 50,
        marginHorizontal: 20,
        textAlign: 'center',
        flexWrap: 'wrap'
    },
});

export default FeedbackScreen;