import React from 'react';
import { Animated, TouchableHighlight, View } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome';

const MainPlusButton = () => {

    const SIZE = 80;

    // const firstX = this.mode.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [20, -40]
    // });
    // const firstY = this.mode.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, -30]
    // });
    // const secondX = this.mode.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [20, 20]
    // });
    // const secondY = this.mode.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, -55]
    // });
    // const thirdX = this.mode.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [20, 80]
    // });
    // const thirdY = this.mode.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, -30]
    // });
    // const opacity = this.mode.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, 1]
    // });
    // const rotation = this.mode.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: ['0deg', '45deg']
    // });

    return (
        <View style={{
            position: 'absolute',
            alignItems: 'center'
        }}>
            <TouchableHighlight
                underlayColor="#2882D8"
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: SIZE,
                    height: SIZE,
                    borderRadius: SIZE / 2,
                    backgroundColor: '#48A2F8'
                }}
            >
                {/* style={{
                    transform: [
                        { rotate: rotation }
                    ]
                }} */}
                <Animated.View>
                    <Icon name="plus" size={24} color="#F8F8F8" />
                </Animated.View>
            </TouchableHighlight>
        </View>
    );
}

export default MainPlusButton;