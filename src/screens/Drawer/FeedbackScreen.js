import React from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { } from 'react-native-elements';
import { Button, Headline } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import { Alert } from 'react-native';
import * as StoreReview from 'expo-store-review';
import { MyShadowCard } from '../../paper-components/memo';
import Constants from '../../constants';
import { ScrollView } from 'react-native-gesture-handler';

const FeedbackScreen = () => {

    const { linksDictionary, _provideFeedbackFunction } = Constants;

    const buttons = [
        {
            label: "Rate in app store", icon: 'star', onPress: _provideFeedbackFunction
                // () => {
                //     try {
                //         if (Platform.OS === "ios") {
                //             // if (StoreReview.isAvailableAsync() && await StoreReview.hasAction()) {
                //             if (StoreReview.isAvailableAsync()) {
                //                 StoreReview.requestReview();
                //             }
                //             else {
                //                 alert("It looks like your device doesn't support this or you already left a review, thank you! (:")
                //             }
                //         } else {
                //             WebBrowser.openBrowserAsync(linksDictionary.play_store_url);
                //         }
                //     } catch (err) {
                //         console.log(err.message);
                //     }
                // }
        },
        {
            label: "Chat on text or email", icon: 'chat', onPress: () => {
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
        {
            label: "Get involved on Reddit", icon: 'reddit', onPress: () => {
                try {
                    WebBrowser.openBrowserAsync(linksDictionary.reddit_page_url);
                } catch (err) {
                    alert('There was a problem loading your browsers')
                    console.log(err.message);
                }
            }
        },
        {
            label: "Take a quick feedback survey", icon: 'message-text', onPress: () => {
                try {
                    WebBrowser.openBrowserAsync(linksDictionary.feedback_survey_url);
                } catch (err) {
                    alert('There was a problem loading your browsers')
                    console.log(err.message);
                }
            }
        },
        { label: "Support Website", icon: 'help-circle-outline', onPress: () => { WebBrowser.openBrowserAsync(linksDictionary.rozy_website_url) } },
    ]

    return (
        <MyShadowCard inheritedMarginHorizontal={0} inheritedMarginTop={20}>
            <View style={styles.container}>
                <Headline style={styles.Headline}>
                    Thank you for your interest, how would you like to share feedback?
                </Headline>
                <ScrollView
                // contentContainerStyle={{ flexGrow: 1 }}
                // style={{ flexShrink: 1 }}
                >
                    {
                        buttons.map(({ label, icon, onPress }, index) => (
                            <Button onPress={onPress} mode={(index % 2) ? "outlined" : "contained"} style={{ marginVertical: 20 }} key={index} icon={icon}>
                                {label}
                            </Button>
                        ))
                    }
                </ScrollView>
            </View>
        </MyShadowCard>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        height: '95%',
        alignItems: 'center',
        marginBottom: 20
    },
    Headline: {
        marginVertical: 50,
        marginHorizontal: 20,
        textAlign: 'center',
        flexWrap: 'wrap'
    },
});

export default FeedbackScreen;