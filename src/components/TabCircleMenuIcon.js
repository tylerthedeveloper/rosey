import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const TabCircleMenuIcon = ({ color, name, size, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <FontAwesome
                name={name}
                style={{
                    color: color,
                    fontSize: size,
                }}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: 'white'
    }
});

export default TabCircleMenuIcon;