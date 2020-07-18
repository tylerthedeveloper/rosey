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
                <MyHeader styleProps={{ marginTop: 15, marginBottom: 15 }} > Manage your tags here! </MyHeader>
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
        </MyShadowCard >
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        height: '95%',
        alignItems: 'center',
        marginBottom: 20
    },
    headline: {
        marginTop: 20,
        marginBottom: 30,
    },
    chips: {
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 5,
        marginBottom: 20
    },
    chip: {
        marginHorizontal: 5,
        marginVertical: 7
    }
});

export default TagScreen;