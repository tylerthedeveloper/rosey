import { useEffect, useState } from 'react';

export default (roses, fetchAllRoses) => {

    const [filteredRoses, setFilteredRoses] = useState([...(roses || [])]);

    // FIXME: This is just to fill cache!
    useEffect(() => {
        fetchAllRoses();
    }, []);

    const [searchQuery, setSearchQuery] = useState('');

    const [filterToggle, setFilterToggle] = useState(false);

    const filterItems = (filterValue, filterType) => {
        // TODO: title CASE?
        if (filterType && filterType == 'tag') {
            // console.log('filter a tag for: ', filterValue);
            // console.log(roses);
            // console.log(roses[0].tags);
            // console.log(roses[0].tags.includes('Friend'));
            const sortedRoses = roses.filter(rose => rose.tags.includes(filterValue));
            console.log(sortedRoses);
            setFilteredRoses(sortedRoses);
        } else {
            setFilterToggle(false);
            const sortedRoses = roses.sort((a, b) => {
                // console.log(a[filterValue], b[filterValue], a[filterValue].toString().localeCompare(b[filterValue].toString()));
                return a[filterValue].toString().localeCompare(b[filterValue].toString());
            })
            // const sortedRoses = roses.sort((a, b) => a[filterValue]- b[filterValue])
            setFilteredRoses(sortedRoses);
        }
    };

    useEffect(() => {
        if (searchQuery) {
            const lower = searchQuery.toLowerCase();
            const matchingRoses = roses.filter(rose => {
                return rose.name.toLowerCase().includes(lower) ||
                    rose.notes.toLowerCase().includes(lower) ||
                    rose.tags.toLowerCase().includes(lower) ||
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