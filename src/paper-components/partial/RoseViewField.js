import React from 'react';
import { Avatar, Card, IconButton, Paragraph, Title } from 'react-native-paper';
import { Text, View } from 'react-native';

const _handleEmptyField = () => alert('Enter data for that field in order to interact with it.');

const RoseViewField = ({ value, subtitle, left, rightIcon, secondRightIcon, rightFunc, secondRightFunc }) => {

    {/* <Card.Title
            title={value}
            subtitle={subtitle}
            titleStyle={{ flexWrap: 'wrap', flexDirection: 'row', alignSelf: 'flex-start' }}
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

    {/* <Avatar.Icon icon={left} size={40} />
                <View style={{ flexGrow: 1 }}>
                    <View style={{ flexDirection: 'column', width: '85%', marginLeft: 12 }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Title style={{ flexWrap: 'wrap', color: 'blue', fontFamily: (Platform.OS === 'android') ? 'sans-serif-light' : 'Avenir-Light',  }} numberOfLines={3} ellipsizeMode={'head'}>
                                {value}
                            </Title>
                        </View>
                        <Paragraph style={{}}>  {subtitle} </Paragraph>
                    </View>
                </View>
                <IconButton icon={rightIcon} style={{ right: '1%', position: 'absolute' }} /> */}
    {/* <View style={{ flex: 1, flexDirection: 'column', marginTop: 5 }}> */ }

    const _onPress = (value) ? rightFunc : _handleEmptyField;
    const _onPressSecond = (value) ? secondRightFunc : _handleEmptyField;

    return (<Card.Actions key={value} style={{ marginBottom: 5 }}>
        <Card.Content style={{ flex: 1, flexDirection: 'column', marginTop: 15, justifyContent: 'center' }}>
            <View
                style={{
                    // minHeight: 20,
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, marginRight: 3 }}>
                        <Avatar.Icon icon={left} size={40} />
                    </View>
                    <View style={{ flex: 5, marginLeft: 2 }}>
                        <Title style={{ color: 'blue', fontFamily: (Platform.OS === 'android') ? 'sans-serif-light' : 'Avenir-Light' }}> {value} </Title>
                        <Text>{subtitle}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        {/* <IconButton icon={rightIcon} /> */}
                        {
                            (!secondRightIcon)
                                ? <IconButton icon={rightIcon} onPress={_onPress} />
                                : <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <IconButton icon={secondRightIcon} onPress={_onPressSecond} />
                                    <IconButton icon={rightIcon} onPress={_onPress} />
                                </View>
                        }
                    </View>
                </View>
                <View>
                </View>
            </View>
            {/* </View> */}
        </Card.Content>
    </Card.Actions>
    );
}

export default RoseViewField;