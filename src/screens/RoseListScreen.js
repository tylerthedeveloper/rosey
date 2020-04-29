import React, { useContext, useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Context as RoseContext } from '../context/RoseContext';
import RoseListItem from '../paper-components/RoseListItem';
import { Searchbar, IconButton } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { Chip } from 'react-native-paper';
import { theme } from '../core/theme';

const check = async () => await AsyncStorage.getItem('roses')
    .then(roseStringArray => console.log(roseStringArray));

const RoseListScreen = ({ }) => {

    const { state: { roses }, fetchAllRoses } = useContext(RoseContext);

    const [filteredRoses, setFilteredRoses] = useState([...(roses || [])]);

    // FIXME: This is just to fill cache!
    useEffect(() => {
        console.log('jsef effec,t fetch roses');
        fetchAllRoses();
    }, []);

    // const tags = React.useMemo(() => {
    //     return         fetchAllRoses();
    // }, [roses]);

    // console.log('filteredRoses', filteredRoses.length)
    const [searchQuery, setSearchQuery] = useState('');

    // TODO: FILTERS
    const [filterToggle, setFilterToggle] = useState(false);
    // const [filterValue, setFilterValue] = useState(false);

    const filterItems = (filterValue) => {
        // TODO: title CASE?
        setFilterToggle(false);
        const sortedRoses = roses.sort((a, b) => {
            console.log(a[filterValue], b[filterValue], a[filterValue] > b[filterValue])
            // return a[filterValue] > b[filterValue];
            // return a[filterValue] === b[filterValue] ? 0 : a[filterValue] < b[filterValue] ? -1 : 1;
            return a[filterValue].localeCompare(b[filterValue]);
        })
        setFilteredRoses(sortedRoses);
    };

    // check();
    // console.log('roses list', roses.length);
    // console.log('filteredRoses list', filteredRoses.length);

    useEffect(() => {
        // fetchAllRoses();
        // setFilteredRoses(res => [...roses]);
        console.log('useeffect')
        if (searchQuery) {
            console.log('if query', roses.length);
            const lower = searchQuery.toLowerCase();
            const matchingRoses = roses.filter(rose => {
                // console.log(rose.name, lower, rose.name === lower);
                return rose.name.toLowerCase().includes(lower) ||
                    rose.email.toLowerCase().includes(lower) ||
                    rose.nickName.toLowerCase().includes(lower);
            });
            console.log('matchingRoses', matchingRoses);
            setFilteredRoses([...(matchingRoses || [])])
            // setFilteredRoses(prevRoses => [...prevRoses, ...matchingRoses])
        } else {
            console.log('not query', roses.length);
            setFilteredRoses([...roses]);
            // setFilteredRoses(prevRoses => [...prevRoses, ...roses]);
        }
    }, [roses, searchQuery]);

    // useEffect(() => {
    //     console.log('filter toggle');
    //     filterItems();
    // }, [filterToggle]);

    // console.log('my state has changed', filterValue);

    return (
        <View style={styles.container}>
            <View style={styles.firstRow}>
                <Searchbar
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.searchBar}
                />
                <IconButton
                    icon="image-filter-vintage"
                    onPress={() => setFilterToggle(!filterToggle)}
                    style={styles.filterIcon}
                    size={35}
                />
            </View>
            {
                (filterToggle) &&
                <View style={styles.filterChips}>
                    <Chip onPress={() => filterItems('name')}>Name</Chip>
                    <Chip onPress={() => filterItems('email')}>Email</Chip>
                    <Chip onPress={() => filterItems('nickName')}>Nickname</Chip>
                    {/* <Chip onPress={() => setFilterValue('name')}>Name</Chip>
                    <Chip onPress={() => setFilterValue('nickName')}>Nickname</Chip>
                    <Chip onPress={() => setFilterValue('email')}>Email</Chip> */}
                    {/* // TODO: */}
                    {/* <Chip onPress={() => setFilterToggle('Date')}>Date Met</Chip> */}

                </View>
            }
            {
                (filteredRoses && filteredRoses.length > 0) && <FlatList
                    data={filteredRoses}
                    keyExtractor={(item) => (item.roseId)}
                    renderItem={({ item }) => {
                        return (<RoseListItem rose={item} />)
                    }}
                />
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
        // justifyContent: 'space-around',
    },
    searchBar: {
        marginLeft: 20,
        width: '75%'
    },
    filterIcon: {
        // color: theme.primary,
    },
    filterChips: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-evenly'
    }
});

export default RoseListScreen;