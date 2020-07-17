import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
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
            {children}
        </PaperButton>
    )
};

const styles = StyleSheet.create({
    button: {
        width: '90%',
        marginVertical: 0,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
    },
});

export default memo(MyButton);
