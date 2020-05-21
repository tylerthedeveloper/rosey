import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Chip, IconButton, Searchbar, Headline } from 'react-native-paper';
import { Context as TagContext } from '../context/TagContext';
import { theme } from '../core/theme';
import useListFilters from '../hooks/useListFilters';
import { RoseListItem } from '../paper-components/partial';

const RoseListScreen = ({ navigation }) => {

    // TODO: move this to the hook
    const { state: { tags } } = useContext(TagContext);

    // const { primary, secondary, error } = theme.colors;
    const [
        filteredRoses, filterToggle, setFilterToggle, filterItems, searchQuery, setSearchQuery,
        selectedTags, toggledSelected
    ] = useListFilters();

    const [tagToggle, setTagToggle] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.firstRow}>
                <Searchbar
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    //placeholderTextColor={secondary}
                    placeholder="Search"
                    //iconColor={secondary}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.searchBar}
                />
                <IconButton
                    icon="tag"
                    onPress={() => setTagToggle(!tagToggle)}
                    size={25}
                    style={styles.filterIcon}
                />
                <IconButton
                    icon="filter-variant"
                    onPress={() => setFilterToggle(!filterToggle)}
                    size={25}
                    style={styles.filterIcon}
                />
            </View>
            {
                (filterToggle) &&
                <View style={styles.filterChips}>
                    {/* <Chip onPress={() => setTagToggle(!tagToggle)}>Tags</Chip> */}
                    <Chip onPress={() => filterItems('name')}>Name</Chip>
                    <Chip onPress={() => filterItems('email')}>Email</Chip>
                    <Chip onPress={() => filterItems('dateMet')}>Date Met</Chip>
                    <Chip onPress={() => filterItems('nickName')}>Nickname</Chip>
                </View>
            }
            {
                (tagToggle) &&
                <ScrollView style={styles.tags} horizontal
                    automaticallyAdjustContentInsets={false}
                    contentContainerStyle={{
                        justifyContent: 'space-evenly',
                        flex: 1,
                        height: 35,
                    }}
                >
                    {
                        tags.map((tag, index) =>
                            <Chip
                                key={tag + index}
                                selectedColor={'blue'}
                                onPress={() => toggledSelected(tag)}
                                selected={selectedTags.includes(tag)}
                                //onPress={() => toggledSelected(tag, index)}
                                //selected={selectedTags.includes(tag + index)}
                            >{tag}</Chip>
                        )
                    }
                </ScrollView>
            }
            <View style={styles.content}>
                {
                    (filteredRoses && filteredRoses.length > 0)
                        ? <FlatList
                            data={filteredRoses}
                            keyExtractor={(item) => (item.roseId)}
                            renderItem={({ item }) => {
                                return (<RoseListItem rose={item} />)
                            }}
                        />
                        : <TouchableOpacity onPress={() => navigation.navigate('AddRose')}>
                            <Headline style={styles.noRosesHeader}> No Roses yet? {"\n"} Add your first one!</Headline>
                        </TouchableOpacity>
                }
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginBottom: 20
    },
    firstRow: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 20,
    },
    searchBar: {
        minWidth: '65%',
        maxWidth: '75%',
        flex: 1,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowColor: '#ffffff'
    },
    filterIcon: {
        flex: 2
    },
    filterChips: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-evenly'
    },
    tags: {
        //flexDirection: 'row',
        marginTop: 15,
        //flex: 1,
        maxHeight: 40,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    noRosesHeader: {
        color: theme.colors.error,
        alignSelf: 'center',
        textAlign: 'center'
    }
});

export default RoseListScreen;