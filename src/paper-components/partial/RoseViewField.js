import React from 'react';
import { Avatar, Card, IconButton, Paragraph, Title } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacityBase, TouchableOpacity } from 'react-native';
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


    // TODO: Review - the below works
    // const _onPress = (value) ? rightFunc : _handleEmptyField;
    // const _onPressSecond = (value) ? secondRightFunc : _handleEmptyField;

    // return (<Card.Actions key={value} style={{ marginBottom: 5 }}>
    //     <Card.Content style={{ flex: 1, flexDirection: 'column', marginTop: 15, justifyContent: 'center' }}>
    //         <View
    //             style={{
    //                 // minHeight: 20,
    //             }}
    //         >
    // <View style={{ flexDirection: 'row' }}>
    //     <IconButton icon={left} size={25} />
    //     {/* <View style={{ flex: 1, marginRight: 8 }}>
    //         <IconButton icon={left} size={25} />
    //     </View> */}
    //     {
    //         (value && value.length > 0)
    //             ? <View style={{ flex: 7 }}>
    //                 <Title style={{ color: 'blue', fontFamily: (Platform.OS === 'android') ? 'sans-serif-light' : 'Avenir-Light' }}> {value} </Title>
    //                 <Paragraph style={{ marginLeft: 8 }}>{subtitle}</Paragraph>
    //             </View>
    //             : <View style={{ marginLeft: 10, marginTop: 15, flex: 7 }}>
    //                 <Paragraph >{subtitle}</Paragraph>
    //             </View>
    //     }
    //     {
    //         (rightIcon)
    //             ? (!secondRightIcon)
    //                 ? <View style={{ ...theme.shadow.iconButtonShadow, flex: 1, justifyContent: 'center', flexDirection: 'column', marginRight: 5, }}>
    //                     <IconButton icon={rightIcon} onPress={_onPress} style={styles.filterIcon} color={"white"} />
    //                 </View>
    //                 : <View style={{ ...theme.shadow.iconButtonShadow, flexDirection: 'row', flex: 3, alignItems: 'flex-start', marginLeft: 0 }}>
    //                     <IconButton icon={secondRightIcon} onPress={_onPressSecond} style={{ ...styles.filterIcon }} color={"white"} />
    //                     <IconButton icon={rightIcon} onPress={_onPress} style={styles.filterIcon} color={"white"} />
    //                 </View>
    //             : <View style={{ flex: 2, marginRight: 5, }}>
    //             </View>
    //     }
    // </View>
    //         </View>
    //     </Card.Content>
    // </Card.Actions >

    const _onPress = (value) ? rightFunc : _handleEmptyField;
    const _onPressSecond = (value) ? secondRightFunc : _handleEmptyField;

    // console.log(rightFunc)
    return (<Card.Actions key={value} style={{ marginBottom: 5 }}>
        <Card.Content style={{ flexDirection: 'column', marginTop: 15, justifyContent: 'center', flex: 2 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <IconButton icon={left} style={{ ...styles.filterIcon }} color={"white"} />
                </View>
                <View style={{ flex: 5 }}>
                    {
                        (value && value.length > 0)
                            ? <View style={{ marginLeft: 10 }}>
                                {
                                    (rightFunc !== null)
                                        ? <TouchableOpacity onPress={_onPress}>
                                            <Title style={{ color: theme.colors.primary, fontFamily: (Platform.OS === 'android') ? 'sans-serif-light' : 'Avenir-Light' }}>{value}</Title>
                                            <Paragraph>{subtitle}</Paragraph>
                                        </TouchableOpacity>
                                        : <View>
                                            <Title style={{ fontFamily: (Platform.OS === 'android') ? 'sans-serif-light' : 'Avenir-Light' }}>{value}</Title>
                                            <Paragraph>{subtitle}</Paragraph>
                                        </View>
                                }
                            </View>
                            : <View style={{ marginTop: 15, marginLeft: 8 }}>
                                <Paragraph>{subtitle}</Paragraph>
                            </View>
                    }
                </View>
                {
                    (subtitle === "name")
                        ? <View style={{ flex: 1 }}>
                            <IconButton icon={rightIcon} onPress={_onPress} />
                        </View>
                        : null
                }
            </View>
        </Card.Content>
    </Card.Actions >

    );
}

const styles = StyleSheet.create({
    filterIcon: {
        // flex: 2,
        backgroundColor: theme.colors.text,
    },
});


export default RoseViewField;
