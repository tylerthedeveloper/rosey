import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, TextInput, Chip, Headline } from 'react-native-paper';
import { Context as TagContext } from '../context/TagContext';

const TagScreen = () => {

    const { state: { tags }, addTag } = useContext(TagContext);

    const [newTag, setNewTag] = useState('');

    return (
        <View style={styles.container}>
            <Headline style={styles.Headline}> Here are your tags </Headline>
            <TextInput value={newTag} onChangeText={setNewTag} style={{ height: 50 }} />
            <Button onPress={() => { addTag(newTag); setNewTag('') }} disabled={!newTag}>
                Add Tag
            </Button>
            <FlatList
                data={tags}
                keyExtractor={(item, index) => (item + index)}
                renderItem={({ item }) => {
                    return (<Chip mode="outlined" style={styles.chip}
                        icon={'tag'} >
                        {item}
                    </Chip>)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // height: 200,
        // alignItems: 'center',
        // width: "80%"
    },
    Headline: {
        marginVertical: 10,
    },
    chip: {
        marginVertical: 10
    }
});

export default TagScreen;