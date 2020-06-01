import { useContext, useEffect, useState } from 'react';
import { Context as RoseContext } from '../context/RoseContext';

export default () => {

    const { state: { roses }, fetchAllRoses } = useContext(RoseContext);

    const [filteredRoses, setFilteredRoses] = useState([...(roses || [])]);

    // FIXME: This is just to fill cache!
    useEffect(() => {
        fetchAllRoses();
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterToggle, setFilterToggle] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);

    const toggledSelected = (tag, idx) => {
        const str = (tag + idx);
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
            filterItems(tag, 'tag', [...selectedTags, tag]);
        } else {
            const filteredTags = selectedTags.filter(tg => tag !== tg);
            setSelectedTags(filteredTags);
            filterItems(tag, 'tag', filteredTags);
        }
    }

    const filterItems = (filterValue, filterType, filteredTags) => {
        // TODO: title CASE?
        if (filterType && filterType == 'tag') {
            const sortedRoses = roses.filter(rose => 
                filteredTags.every(v => rose.tags.includes(v)));
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
                    // FIXME:
                    // rose.tags.toLowerCase().includes(lower) ||
                    rose.email.toLowerCase().includes(lower) ||
                    rose.nickName.toLowerCase().includes(lower);
            });
            setFilteredRoses([...(matchingRoses || [])])
        } else {
            setFilteredRoses([...roses]);
        }
    }, [roses, searchQuery]);

    return [
        filteredRoses, filterToggle, setFilterToggle,
        filterItems, searchQuery, setSearchQuery,
        selectedTags, toggledSelected
    ];
}