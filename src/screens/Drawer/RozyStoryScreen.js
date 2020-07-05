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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse vel tellus id dui iaculis porta. Curabitur enim felis,
                    Feuiat suscipit quam eget, condimentum dapibus eros.
                    Sed vel neque in felis rutrum pulvinar vel at nibh. Vivamus facilisis,
                    libero ut scelerisque bibendum, turpis velit rhoncus libero, nec lobortis
                    est ante sit amet risus. Sed bibendum viverra libero, ac ullamcorper ligula
                    rhoncus a. Suspendisse ultrices interdum ex sed gravida. Aliquam quis aliquet,
                    tempus nisi et, eleifend diam. Praesent pretium quam diam, id molestie rutrum eu.
                    Sed ut nibh vitae nibh volutpat ornare. Suspendisse utnuncpretium, faucibus lectus
                    vel, congue tellus. Vestibulum eu lacinia dolor. Fusce non purus nec nunc faucibus
                    vestibulum.
                    {"\n"}
                    {"\n"}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse vel tellus id dui iaculis porta. Curabitur enim felis,
                    Feuiat suscipit quam eget, condimentum dapibus eros.
                    Sed vel neque in felis rutrum pulvinar vel at nibh. Vivamus facilisis,
                    libero ut scelerisque bibendum, turpis velit rhoncus libero, nec lobortis
                    est ante sit amet risus. Sed bibendum viverra libero, ac ullamcorper ligula
                    rhoncus a. Suspendisse ultrices interdum ex sed gravida. Aliquam quis aliquet,
                    tempus nisi et, eleifend diam. Praesent pretium quam diam, id molestie rutrum eu.
                    Sed ut nibh vitae nibh volutpat ornare. Suspendisse utnuncpretium, faucibus lectus
                    vel, congue tellus. Vestibulum eu lacinia dolor. Fusce non purus nec nunc faucibus
                    vestibulum.
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