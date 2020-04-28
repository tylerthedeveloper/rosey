import React, { useContext, useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Context as RoseContext } from '../context/RoseContext';
import RoseListItem from '../paper-components/RoseListItem';
import { Searchbar } from 'react-native-paper';
import { AsyncStorage } from 'react-native';

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

    // TODO:
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
            <Searchbar
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            {/* TODO: buttons... */}
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
    }
});

export default RoseListScreen;