import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../../core/theme';
import { Card } from 'react-native-paper';

const MyShadowCard = ({ children, inheritedMarginTop, inheritedMarginBottom, inheritedMarginHorizontal }) => (
    <Card style={{
        ...styles.card,
        marginHorizontal: inheritedMarginHorizontal || 10,
        marginTop: inheritedMarginTop || 5,
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
        // borderWidth: 5,
        // borderColor: '#ddd',
        borderRadius: 20,
        // borderBottomWidth: 0,
        shadowColor: '#858585',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: .5,
        shadowRadius: 3,
        elevation: 5,
        // backgroundColor: 'white'
    }
});

export default memo(MyShadowCard);
