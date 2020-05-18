import React, { memo } from 'react';
import { ImageBackground, KeyboardAvoidingView, StyleSheet } from 'react-native';

const Background = ({ children }) => {
    return (
        <ImageBackground
            source={require('../../../assets/background_dot_2x.png')}
            resizeMode="repeat"
            style={styles.background}
        >
        {/* TODO: Verify */}
            <KeyboardAvoidingView style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : null}
            >
                {children}
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        padding: 15,
        width: '100%',
        // TODO:
        //maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default memo(Background);
