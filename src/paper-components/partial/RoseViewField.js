import React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { View } from 'react-native';

const RoseViewField = ({ value, subtitle, left, rightIcon, secondRightIcon, rightFunc, secondRightFunc }) => (
    <Card.Actions key={value}>
        <Card.Title
            title={value}
            subtitle={subtitle}
            left={(props) => <Avatar.Icon icon={left}  {...props} />}
            right={(props) => {
                return (!secondRightIcon)
                    ? <IconButton icon={rightIcon} {...props} onPress={rightFunc} />
                    : <View style={{ flexDirection: 'row' }}>
                        <IconButton icon={secondRightIcon} {...props} onPress={secondRightFunc} />
                        <IconButton icon={rightIcon} {...props} onPress={rightFunc} />
                    </View>
            }}
        />
    </Card.Actions>
);

export default RoseViewField;