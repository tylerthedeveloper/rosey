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

    // const tags = React.useMemo(() => {
    //     return         fetchAllRoses();
    // }, [roses]);

    // console.log('filteredRoses', filteredRoses.length)
    const [searchQuery, setSearchQuery] = useState('');

    // TODO: FILTERS
    const [filterToggle, setFilterToggle] = useState(false);
    const [filterType, setFilterType] = useState('');

    // check();
    // console.log('roses list', roses.length);
    // console.log('filteredRoses list', filteredRoses.length);

    // FIXME: This is just to fill cache!
    useEffect(() => {
        fetchAllRoses();
    }, []);

    useEffect(() => {
        // fetchAllRoses();
        // setFilteredRoses(res => [...roses]);
        console.log('useeffect')
        if (searchQuery) {
            const lower = searchQuery.toLowerCase();
            console.log('if query', roses.length);
            const matchingRoses = roses.filter(rose => {
                console.log(rose.name, lower, rose.name === lower);
                return rose.name.toLowerCase().includes(lower);
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


    return (
        <View style={styles.container}>
            <View style={styles.firstRow}>
                <Searchbar
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
                    <Chip onPress={() => console.log('Pressed')}>Name</Chip>
                    <Chip onPress={() => console.log('Pressed')}>Date</Chip>
                    <Chip onPress={() => console.log('Pressed')}>Nickname</Chip>
                </View>
            }
            {
                (filteredRoses && filteredRoses.length > 0) && <FlatList
                    data={filteredRoses}
                    keyExtractor={(item) => (item.roseId + item.name)}
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