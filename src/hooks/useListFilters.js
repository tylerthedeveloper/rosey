import { useEffect, useState } from 'react';

export default (roses, fetchAllRoses) => {

    const [filteredRoses, setFilteredRoses] = useState([...(roses || [])]);

    // FIXME: This is just to fill cache!
    useEffect(() => {
        fetchAllRoses();
    }, []);

    const [searchQuery, setSearchQuery] = useState('');

    const [filterToggle, setFilterToggle] = useState(false);

    const filterItems = (filterValue) => {
        // TODO: title CASE?
        setFilterToggle(false);
        const sortedRoses = roses.sort((a, b) => a[filterValue].localeCompare(b[filterValue]))
        setFilteredRoses(sortedRoses);
    };

    useEffect(() => {
        if (searchQuery) {
            const lower = searchQuery.toLowerCase();
            const matchingRoses = roses.filter(rose => {
                return rose.name.toLowerCase().includes(lower) ||
                    rose.email.toLowerCase().includes(lower) ||
                    rose.nickName.toLowerCase().includes(lower);
            });
            setFilteredRoses([...(matchingRoses || [])])
        } else {
            setFilteredRoses([...roses]);
        }
    }, [roses, searchQuery]);

    return [filteredRoses, filterToggle, setFilterToggle, filterItems, searchQuery, setSearchQuery];
}