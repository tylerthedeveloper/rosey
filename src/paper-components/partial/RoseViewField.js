import React from 'react';
import { Avatar, Card, IconButton, Paragraph, Title } from 'react-native-paper';
import { View } from 'react-native';

const _handleEmptyField = () => alert('Enter data for that field in order to interact with it.');

const RoseViewField = ({ value, subtitle, left, rightIcon, secondRightIcon, rightFunc, secondRightFunc }) => (
    <Card.Actions key={value} style={{ marginBottom: 5 }}>
        {/* <Card.Title
            title={value}
            subtitle={subtitle}
            titleStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}
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
        /> */}
        <Card.Content style={{ flex: 1, flexDirection: 'row', marginTop: 15, justifyContent: 'center' }}>
            <Avatar.Icon icon={left} size={40} />
            <View style={{ flexGrow: 1 }}>
                {/* <View style={{ flexDirection: 'row', }}> */}
                {/* // <View style={{ marginHorizontal: 15, flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center' }}>
                //     <Title style={{ textAlign: 'center', }}>  aaaaaaaaaaa aaaaaaaaaaa aaaaa </Title>
                //     <Paragraph style={{}}>  aaaaaaaaaaa </Paragraph>
                // </View>  */}
                <View style={{ flexDirection: 'column', width: '85%', marginLeft: 12 }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Title style={{ flexWrap: 'wrap', color: 'blue', fontFamily: (Platform.OS === 'android') ? 'sans-serif-light' : 'Avenir-Light', }}>
                            {value}
                        </Title>
                    </View>
                    <Paragraph style={{}}>  {subtitle} </Paragraph>
                </View>
            </View>
            <IconButton icon={rightIcon} style={{ right: '1%', position: 'absolute' }} />
        </Card.Content>

    </Card.Actions>
);

export default RoseViewField;