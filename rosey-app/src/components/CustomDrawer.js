import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { } from 'react-native-elements';
import { DrawerItems } from 'react-navigation-drawer';
import { SafeAreaView } from 'react-navigation';

const CustomDrawer = () => {

    // <View style={styles.container}>
    //     <Image
    //         source={require('../../assets/rose-marker.png')}
    //         style={styles.sideMenuProfileIcon}
    //     />
    // </View>
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                {/* <View style={styles.container}>

                    <View style={styles.headerContainer}>

                        <ImageBackground source={require('../../assets/drawer-cover.png')} style={{ flex: 1, width: 280, justifyContent: 'center' }} >

                            <Text style={styles.headerText}>Header Portion</Text>

                            <Text style={styles.headerText}>You can display here logo or profile image</Text>

                        </ImageBackground>

                    </View>

                    <View style={styles.screenContainer}>

                        <View style={[styles.screenStyle, (this.props.activeItemKey == 'ScreenA') ? styles.activeBackgroundColor : null]}>

                            <Text style={[styles.screenTextStyle, (this.props.activeItemKey == 'ScreenA') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('ScreenA')}>Screen A</Text>

                        </View>

                        <View style={[styles.screenStyle, (this.props.activeItemKey == 'ScreenB') ? styles.activeBackgroundColor : null]}>

                            <Text style={[styles.screenTextStyle, (this.props.activeItemKey == 'ScreenB') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('ScreenB')}>Screen B</Text>

                        </View>

                        <View style={[styles.screenStyle, (this.props.activeItemKey == 'ScreenC') ? styles.activeBackgroundColor : null]}>

                            <Text style={[styles.screenTextStyle, (this.props.activeItemKey == 'ScreenC') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('ScreenC')}>Screen C</Text>

                        </View>

                    </View> 

                </View>            
                    */}
            </SafeAreaView>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 20,
    },
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 150,
        height: 150,
        marginTop: 20,
        borderRadius: 150 / 2,
    },
    container: {

        alignItems: 'center',

    },

    headerContainer: {

        height: 150,

    },

    headerText: {

        color: '#fff8f8',

    },

    screenContainer: {

        paddingTop: 20,

        width: '100%',

    },

    screenStyle: {

        height: 30,

        marginTop: 2,

        flexDirection: 'row',

        alignItems: 'center',

        width: '100%'

    },

    screenTextStyle: {

        fontSize: 20,

        marginLeft: 20,

        textAlign: 'center'

    },

    selectedTextStyle: {

        fontWeight: 'bold',

        color: '#00adff'

    },

    activeBackgroundColor: {

        backgroundColor: 'grey'

    }
});

export default CustomDrawer;