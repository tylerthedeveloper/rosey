import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '../../core/theme';

const MyTextInput = ({ errorText, ...props }) => {
    return (
        <View style={styles.container}>
            <Input
                style={styles.input}
                selectionColor={theme.colors.primary}
                underlineColor="transparent"
                mode="outlined"
                autoCorrect={false}
                {...props}
            />
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginVertical: 12,
    },
    input: {
        backgroundColor: theme.colors.surface,
    },
    error: {
        fontSize: 14,
        color: theme.colors.error,
        paddingHorizontal: 4,
        paddingTop: 4,
    },
});

export default memo(MyTextInput);