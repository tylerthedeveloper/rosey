import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Avatar, Card, Paragraph, Chip, Title } from 'react-native-paper';
import { MyShadowCard } from "../memo";
import { theme } from "../../core/theme";

const RoseListItem = ({ rose, props }) => {
    const navigation = useNavigation();
    const { name, tags, nickName, picture, placeMetAt } = rose;
    const { placeMetAtFormatted_address, placeMetAtName } = placeMetAt || {};

    const titleName = (nickName !== '')
        ? <>
            <Title style={{ fontFamily: (Platform.OS === 'android') ? 'sans-serif-light' : 'Avenir-Heavy', fontWeight: 'bold' }}>{name} | </Title>
            <Text style={{ fontWeight: "normal", fontFamily: (Platform.OS === 'android') ? 'sans-serif-light' : 'Avenir-Light' }}>{nickName}</Text>
        </>
        : <Title>{name}</Title>

    // TODO: figure out best way to format this based on number of commas
    const formattedAddress = (placeMetAtFormatted_address)
        ? placeMetAtFormatted_address.substring(0, placeMetAtFormatted_address.indexOf(','))
        : 'You probably met somewhere!'

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.push('RoseDetail', { roseId: rose.roseId })}>
            <MyShadowCard style={{ marginVertical: 0 }}
                inheritedMarginTop={1}
                inheritedMarginBottom={1}
                inheritedMarginHorizontal={5}
            >
                <Card.Title
                    style={{ paddingTop: 5 }}
                    left={props => (
                        <Avatar.Image
                            {...props}
                            size={50}
                            // TODO: remove pic.length > %}}
                            source={{ uri: (picture && picture.length > 3) ? picture : 'https://picsum.photos/700' }}
                        />
                    )}
                    title={titleName}
                    subtitle={placeMetAtName || formattedAddress || "(Somewhere!)"}
                // right={props => (
                //     <Avatar.Icon
                //         {...props}
                //         size={30}
                //         icon="arrow-right"
                //         style={{ position: 'relative', top: '30%', marginRight: '10%' }}
                //     />
                // )}
                >

                </Card.Title>
                {/* <Avatar.Icon
                        {...props}
                        size={30}
                        color={'blue'}
                        icon="arrow-right"
                        style={{ marginRight: 20,  alignSelf: 'flex-end', position: 'absolute', top: '35%', right: '3%' }}
                    /> */}
                <Card.Actions>
                    {/* <Paragraph> Tags: </Paragraph> */}
                    {/* <Paragraph> {tags && Array.isArray(tags) && tags.join(', ') || '(Add some tags!)'} </Paragraph> */}
                    <View style={styles.chips}>
                        {
                            (tags !== undefined && Array.isArray(tags) && tags.length > 0)
                                ? tags.map((tag, index) =>
                                    (<Chip
                                        key={tag + index}
                                        style={styles.chip}
                                        selectedColor={'blue'}
                                    >{tag}</Chip>))
                                : <Paragraph style={{ marginLeft: 10 }}>(Add some tags!)</Paragraph>
                        }
                    </View>
                </Card.Actions>
            </MyShadowCard>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        flex: 1,
    },
    chips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        flexGrow: 1,
        marginTop: 10,
    },
    chip: {
        marginHorizontal: 5,
        marginTop: 5,
        // backgroundColor: '#d3cdef' || theme.colors.error,
    }
});

export default RoseListItem;