import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Card, Paragraph, Chip } from 'react-native-paper';
import { MyShadowCard } from "../memo";

const RoseListItem = ({ rose, props }) => {
    const navigation = useNavigation();
    const { name, tags, picture, homeLocation } = rose;
    const { homeCity, homeState, homeCountry } = homeLocation || {};
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
                    title={name}
                    subtitle={homeCity || homeState || homeCountry || "(Somewhere!)"}
                    right={props => (
                        <Avatar.Icon
                            {...props}
                            size={30}
                            icon="arrow-right"
                            style={{ position: 'relative', top: '30%', marginRight: '10%' }}
                        />
                    )}
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
        marginTop: 5
    }
});

export default RoseListItem;