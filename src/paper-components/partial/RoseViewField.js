import React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';

const RoseViewField = ({ value, subtitle, left, rightIcon, rightFunc }) => (
    <Card.Actions key={value}>
        <Card.Title
            title={value}
            subtitle={subtitle}
            left={(props) => <Avatar.Icon icon={left}  {...props} />}
        />
            {/* right={(props) => <IconButton icon={rightIcon} {...props} onPress={rightFunc} />} */}
    </Card.Actions>
);

export default RoseViewField;