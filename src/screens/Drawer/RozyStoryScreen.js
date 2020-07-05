import React from 'react';
import { StyleSheet, Text, View, ScrollView, Linking } from 'react-native';
import { } from 'react-native-elements';
import { MyButton } from '../../paper-components/memo';
import * as WebBrowser from 'expo-web-browser';
import Constants from '../../constants'

const RozyStoryScreen = () => {

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.story}>
                    I’ve always loved meeting people spontaneously, developing personal relationships, and making lasting connections.
                    That’s the story of Rozy. “Rosie” is the nickname of a friend I met in College who helped me improve the way I keep connections alive, 
                    which inspired me to create this app. Thanks to Rosie, you can now do the same. 
                    {"\n"}
                    {"\n"}
                    Rosie and I originally became acquantainces at the gym, but never talked. 
                    Weeks later ended up at the same social gathering and he bet he wouldn’t forget my name, and I would forget his. 
                    As it would have it, I had forgotten his name by the next day. 
                    His secret? He wrote down the names of each person he met with a little bit of context immediately after meeting them, on his phone.
                    I loved this idea so much I built an app for that exact purpose.
                    Welcome to Rozy, the app that will help you keep connections alive.
                </Text>
            </ScrollView>
            <MyButton onPress={() => WebBrowser.openBrowserAsync(Constants.rozyStoryUrl)} mode="outlined" icon={'book'}>
                Check out the full story!
                </MyButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
    },
    scrollView: {
        height: '80%',
        // flex: 2,
        // flexShrink: 2
        marginTop: 30,
        marginBottom: 10
    },
    story: {
        flex: 1,
        marginHorizontal: 20,
        fontSize: 20,
        // fontFamily: 'Helvetica'
    }
});

export default RozyStoryScreen;