import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Chip, IconButton, Searchbar, Headline } from 'react-native-paper';
import { Context as RoseContext } from '../context/RoseContext';
import { theme } from '../core/theme';
import useListFilters from '../hooks/useListFilters';
import { RoseListItem } from '../paper-components/partial';

const RoseListScreen = ({ navigation }) => {

    const { state: { roses }, fetchAllRoses } = useContext(RoseContext);
    // const { primary, secondary, error } = theme.colors;
    const [
        filteredRoses, filterToggle, setFilterToggle, filterItems, searchQuery, setSearchQuery
    ] = useListFilters(roses, fetchAllRoses);


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
                    icon="filter-variant"
                    onPress={() => setFilterToggle(!filterToggle)}
                    size={35}
                    style={styles.filterIcon}
                //color={secondary}
                />
            </View>
            {
                (filterToggle) &&
                <View style={styles.filterChips}>
                    <Chip onPress={() => filterItems('name')}>Name</Chip>
                    <Chip onPress={() => filterItems('email')}>Email</Chip>
                    <Chip onPress={() => filterItems('nickName')}>Nickname</Chip>
                    {/* // TODO: */}
                    {/* <Chip onPress={() => setFilterToggle('Date')}>Date Met</Chip> */}

                </View>
            }
            {
                (filteredRoses && filteredRoses.length > 0)
                    ? <FlatList
                        data={filteredRoses}
                        keyExtractor={(item) => (item.roseId)}
                        renderItem={({ item }) => {
                            return (<RoseListItem rose={item} />)
                        }}
                    />
                    : <Headline style={styles.noRosesHeader}> No Roses yet? Add your first one!</Headline>
            }
        </View>
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
        minWidth: '75%',
        maxWidth: '85%',
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
    noRosesHeader: {
        color: theme.colors.error,
        marginTop: 20,
        marginLeft: 20,
        // flex: 1, 
        // alignSelf: 'center'
    }
});

export default RoseListScreen;