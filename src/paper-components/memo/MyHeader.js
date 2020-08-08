import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../../core/theme';

const MyHeader = ({ children, styleProps }) => {
    return (<Text style={{ ...styles.header, ...styleProps }} textBreakStrategy="simple">
        {children}
    </Text>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 26,
        color: theme.colors.primary,
        fontWeight: 'bold',
        paddingVertical: 14,
        alignSelf: 'stretch',
        textAlign: 'center'
    },
});

export default memo(MyHeader);
