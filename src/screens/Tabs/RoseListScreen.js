import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Avatar, Chip, IconButton, Searchbar, Headline } from 'react-native-paper';
import { Context as TagContext } from '../../context/TagContext';
import { theme } from '../../core/theme';
import useListFilters from '../../hooks/useListFilters';
import { RoseListItem } from '../../paper-components/partial';

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
                <View style={theme.shadow.iconButtonShadow}>
                    {/* <View style={styles.filterIconContainer}> */}
                    <IconButton
                        icon="tag"
                        onPress={() => setTagToggle(!tagToggle)}
                        color={'white'}
                        size={25}
                        style={{ ...styles.filterIcon, marginLeft: 10 }}
                    />
                </View>
                <View style={theme.shadow.iconButtonShadow}>
                    <IconButton
                        icon="filter-variant"
                        onPress={() => setFilterToggle(!filterToggle)}
                        size={25}
                        color={'white'}
                        style={styles.filterIcon}
                    />
                </View>
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
                (tagToggle)
                    ? (tags && tags.length > 0)
                        ? <ScrollView style={styles.tags} horizontal
                            // automaticallyAdjustContentInsets={false}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                justifyContent: 'center',
                                height: 35,
                            }}
                        >
                            {
                                tags.map((tag, index) =>
                                    <Chip
                                        key={tag + index}
                                        selectedColor={'blue'}
                                        style={styles.tag}
                                        onPress={() => toggledSelected(tag)}
                                        selected={selectedTags.includes(tag)}
                                    //onPress={() => toggledSelected(tag, index)}
                                    //selected={selectedTags.includes(tag + index)}
                                    >{tag}</Chip>
                                )
                            }
                        </ScrollView>
                        : <View style={{
                            alignItems: 'center',
                            marginTop: 15
                        }}>
                            <Chip onPress={() => navigation.navigate('TagScreen')} selectedColor={'blue'} style={{}}>
                                No tags - go add some!
                            </Chip>
                        </View>
                    : null
            }
            <View style={styles.content}>
                {
                    (filteredRoses && filteredRoses.length > 0)
                        ? <FlatList
                            data={filteredRoses}
                            keyExtractor={(item, index) => (item.roseId + index)}
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
        // marginLeft: 20,
        marginBottom: 5,
        elevation: 5,
        // marginRight: 20,
        marginHorizontal: 25
    },
    searchBar: {
        minWidth: '65%',
        maxWidth: '70%',
        flex: 1,
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowColor: '#858585',
        elevation: 5,
        borderRadius: 20,
        marginRight: 5
    },
    filterIcon: {
        // flex: 2,
        backgroundColor: theme.colors.primary,
        // color: 'white',
    },
    filterChips: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 5,
        justifyContent: 'space-evenly'
    },
    tags: {
        //flexDirection: 'row',
        marginTop: 15,
        marginHorizontal: 10,
        //flex: 1,
        marginBottom: 5,
        maxHeight: 40,
    },
    tag: {
        marginHorizontal: 10,
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