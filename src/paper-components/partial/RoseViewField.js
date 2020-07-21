import React from 'react';
import { Avatar, Card, IconButton, Paragraph, Title } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../core/theme';

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
                    <IconButton icon={left} size={25} />
                    {/* <View style={{ flex: 1, marginRight: 8 }}>
                        <IconButton icon={left} size={25} />
                    </View> */}
                    {
                        (value && value.length > 0)
                            ? <View style={{ flex: 7 }}>
                                <Title style={{ color: 'blue', fontFamily: (Platform.OS === 'android') ? 'sans-serif-light' : 'Avenir-Light' }}> {value} </Title>
                                <Paragraph style={{ marginLeft: 6 }}>{subtitle}</Paragraph>
                            </View>
                            : <View style={{ marginLeft: 10, marginTop: 15, flex: 7 }}>
                                <Paragraph >{subtitle}</Paragraph>
                            </View>
                    }
                    {
                        (rightIcon)
                            ? (!secondRightIcon)
                                ? <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', marginRight: 5, }}>
                                    <IconButton icon={rightIcon} onPress={_onPress} style={styles.filterIcon} color={"white"} />
                                </View>
                                : <View style={{ flexDirection: 'row', flex: 3, alignItems: 'flex-start', marginLeft: 0 }}>
                                    <IconButton icon={secondRightIcon} onPress={_onPressSecond} style={styles.filterIcon} color={"white"} />
                                    <IconButton icon={rightIcon} onPress={_onPress} style={styles.filterIcon} color={"white"} />
                                </View>
                            : <View style={{ flex: 2, marginRight: 5, }}>
                            </View>
                    }
                </View>
            </View>
        </Card.Content>
    </Card.Actions >
    );
}

const styles = StyleSheet.create({
    filterIcon: {
        // flex: 2,
        backgroundColor: theme.colors.primary,
        // shadowColor: 'blue',
        // shadowOffset: { width: 3, height: 5 },
        // shadowOpacity: 1,
        // shadowRadius: 5,
        // elevation: 5,
    },
});


export default RoseViewField;
