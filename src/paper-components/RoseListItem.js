import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Card, Paragraph } from 'react-native-paper';

const RoseListItem = ({ rose }) => {
    const navigation = useNavigation();
    const { name, tags, picture } = rose;
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.push('RoseDetail', { roseId: rose.roseId })}>
            <Card style={{ padding: 5 }}>
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
                    subtitle="Some location???"
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
                    <Paragraph> {tags} </Paragraph>
                </Card.Actions>
            </Card>
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