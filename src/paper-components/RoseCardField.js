import React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';

const RoseCardField = ({ title, subtitle, left, rightIcon, rightFunc }) => (
    <Card.Actions key={title}>
        <Card.Title
            title={title}
            subtitle={subtitle}
            left={(props) => <Avatar.Icon icon={left}  {...props} />}
            right={(props) => <IconButton icon={rightIcon} {...props} onPress={rightFunc} />}
        />
    </Card.Actions>
);

export default RoseCardField;