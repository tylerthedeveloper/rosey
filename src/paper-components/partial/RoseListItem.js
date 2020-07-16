import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Card, Paragraph } from 'react-native-paper';
import { MyShadowCard } from "../memo";

const RoseListItem = ({ rose }) => {
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
                            style={{ marginRight: 10 }}
                        />
                    )}
                />
                <Card.Actions>
                    <Paragraph> Tags: </Paragraph>
                    <Paragraph> {tags && Array.isArray(tags) && tags.join(', ') || '(Add some tags!)'} </Paragraph>
                </Card.Actions>
            </MyShadowCard>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    }
});

export default RoseListItem;