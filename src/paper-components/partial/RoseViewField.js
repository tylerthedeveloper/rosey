import React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { View } from 'react-native';

const _handleEmptyField = () => alert('Enter data for that field in order to interact with it.');

const RoseViewField = ({ value, subtitle, left, rightIcon, secondRightIcon, rightFunc, secondRightFunc }) => (
    <Card.Actions key={value}>
        <Card.Title
            title={value}
            subtitle={subtitle}
            left={(props) => <Avatar.Icon icon={left}  {...props} />}
            right={(props) => {
                const _onPress = (value) ? rightFunc : _handleEmptyField;
                const _onPressSecond = (value) ? secondRightFunc : _handleEmptyField;
                return (!secondRightIcon)
                    ? <IconButton icon={rightIcon} {...props} onPress={_onPress} />
                    : <View style={{ flexDirection: 'row' }}>
                        <IconButton icon={secondRightIcon} {...props} onPress={_onPressSecond} />
                        <IconButton icon={rightIcon} {...props} onPress={_onPress} />
                    </View>
            }}
        />
    </Card.Actions>
);

export default RoseViewField;