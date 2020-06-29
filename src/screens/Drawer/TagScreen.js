import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import { Context as TagContext } from '../../context/TagContext';
import { MyHeader, MyTextInput } from '../../paper-components/memo';
import { SocialIcon } from 'react-social-icons';

const TagScreen = () => {

    const { state: { tags }, addTag, deleteTag } = useContext(TagContext);

    const [newTag, setNewTag] = useState('');

    // TODO: Fix tag

    return (
        <View style={styles.container}>
            <SocialIcon url="https://twitter.com/jaketrent" />
            <MyHeader style={styles.Headline}> Manager your tags here! </MyHeader>
            <View style={styles.chips}>
                {
                    tags.map((tag, index) =>
                        (<Chip mode="outlined" style={styles.chip}
                            icon={'tag'}
                            key={tag + index}
                            onClose={() => deleteTag(tag)}
                        >
                            {tag}
                        </Chip>)
                    )
                }
            </View>
            <MyTextInput value={newTag} onChangeText={setNewTag} style={{ height: 50 }} />
            <Button onPress={() => { addTag(newTag); setNewTag('') }} disabled={!newTag}>
                Add Tag
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // height: 200,
        alignItems: 'center',
        // width: "80%"
    },
    Headline: {
    },
    chips: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 5,
    },
    chip: {
        marginHorizontal: 5,
        marginVertical: 5
    }
});

export default TagScreen;