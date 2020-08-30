import { useContext, useEffect, useState } from 'react';
import { Context as RoseContext } from '../context/RoseContext';

export default () => {

    const { state: { roses }, fetchAllRoses } = useContext(RoseContext);

    // roses.map(rose => console.log(rose.name, rose.notes))

    const [filteredRoses, setFilteredRoses] = useState([...(roses || [])]);

    // FIXME: This is just to fill cache!
    useEffect(() => {
        console.log('fetch all roses')
        fetchAllRoses();
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterToggle, setFilterToggle] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);

    const toggledSelected = (tag, idx) => {
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
        if (filterType && filterType == 'tag') {
            // if (selectedTags.length === 0) {
            //     console.log('ken 0 ')
            //     setFilteredRoses([...roses]);
            // }
            const sortedRoses = roses.filter(({ tags }) =>
                filteredTags.every(v => {
                    // return tags.includes(v)
                    return tags.some(tagObj => tagObj.tag === v)
                }));
                // tags.every(tagObj => filteredTags.includes(tagObj.tag)))
            setFilteredRoses(sortedRoses);
        } else {
            setFilterToggle(false);
            const sortedRoses = roses.sort((a, b) => {
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
                    rose.email.toLowerCase().includes(lower) ||
                    rose.nickName.toLowerCase().includes(lower);
            });
            setFilteredRoses([...(matchingRoses || [])])
        } else if (selectedTags.length === 0) {
            setFilteredRoses([...roses]);
        }
    }, [roses, searchQuery, selectedTags]);

    return [
        filteredRoses, filterToggle, setFilterToggle,
        filterItems, searchQuery, setSearchQuery,
        selectedTags, toggledSelected
    ];
}