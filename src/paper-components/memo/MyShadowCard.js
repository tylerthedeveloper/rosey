import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../../core/theme';
import { Card } from 'react-native-paper';

const MyShadowCard = ({ children, inheritedMarginTop, inheritedMarginBottom, inheritedMarginHorizontal }) => (
    <Card style={{
        ...styles.card,
        marginHorizontal: inheritedMarginHorizontal || 10,
        marginTop: inheritedMarginTop || 15,
        marginBottom: inheritedMarginBottom || 5,
    }}>
        {children}
    </Card >
);

const styles = StyleSheet.create({
    card: {
        // borderWidth: 1,
        // paddingBottom: 10,
        // flex: 1
        // marginTop: 15,
        // marginBottom: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
        elevation: 1,
        // backgroundColor: 'white'
    }
});

export default memo(MyShadowCard);
