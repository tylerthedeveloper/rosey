import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import { Context as TagContext } from '../../context/TagContext';
import { MyHeader, MyTextInput, MyShadowCard } from '../../paper-components/memo';

const TagScreen = () => {

    const { state: { tags }, addTag, deleteTag } = useContext(TagContext);

    const [newTag, setNewTag] = useState('');

    // TODO: Fix tag

    return (
        <MyShadowCard inheritedMarginHorizontal={0} inheritedMarginTop={20}>
            <View style={styles.container}>
                <MyHeader style={styles.Headline}> Manage your tags here! </MyHeader>
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
                <MyTextInput value={newTag} onChangeText={setNewTag} style={{ height: 50, }} inheritedWidth={'80%'} />
                <Button onPress={() => { addTag(newTag); setNewTag('') }} disabled={!newTag}>
                    Add Tag
            </Button>
            </View>
        </MyShadowCard>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'flex-start',
        height: '95%',
        alignItems: 'center',
        // width: "100%"
        marginBottom: 20
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