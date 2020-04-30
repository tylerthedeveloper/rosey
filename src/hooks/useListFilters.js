import { useEffect, useState } from 'react';

export default (roses, fetchAllRoses) => {

    const [filteredRoses, setFilteredRoses] = useState([...(roses || [])]);

    // FIXME: This is just to fill cache!
    useEffect(() => {
        console.log('jsef effec,t fetch roses');
        fetchAllRoses();
    }, []);

    const [searchQuery, setSearchQuery] = useState('');

    // TODO: FILTERS
    const [filterToggle, setFilterToggle] = useState(false);

    const filterItems = (filterValue) => {
        // TODO: title CASE?
        setFilterToggle(false);
        const sortedRoses = roses.sort((a, b) => {
            console.log(a[filterValue], b[filterValue], a[filterValue] > b[filterValue])
            return a[filterValue].localeCompare(b[filterValue]);
        })
        setFilteredRoses(sortedRoses);
    };

    useEffect(() => {
        // console.log('useeffect')
        if (searchQuery) {
            // console.log('if query', roses.length);
            const lower = searchQuery.toLowerCase();
            const matchingRoses = roses.filter(rose => {
                return rose.name.toLowerCase().includes(lower) ||
                    rose.email.toLowerCase().includes(lower) ||
                    rose.nickName.toLowerCase().includes(lower);
            });
            // console.log('matchingRoses', matchingRoses);
            setFilteredRoses([...(matchingRoses || [])])
        } else {
            // console.log('not query', roses.length);
            setFilteredRoses([...roses]);
        }
    }, [roses, searchQuery]);

    return [filteredRoses, filterToggle, setFilterToggle, filterItems, searchQuery, setSearchQuery];
}