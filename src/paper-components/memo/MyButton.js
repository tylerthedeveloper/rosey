import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../../core/theme';

const MyButton = ({ mode, style, children, ...props }) => {

    return (
        <PaperButton
            style={[
                styles.button,
                mode === 'outlined' && { backgroundColor: theme.colors.surface },
                style,
            ]}
            labelStyle={styles.text}
            mode={mode}
            {...props}
        >
            {/* <Text textBreakStrategy="simple"> */}
                {children}
            {/* </Text> */}
        </PaperButton>
    )
};

const styles = StyleSheet.create({
    button: {
        width: '90%',
        marginVertical: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
    },
});

export default memo(MyButton);
