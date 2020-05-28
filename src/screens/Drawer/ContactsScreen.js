// TODO: Avoid redundant mapping
// TODO: Do not include already imported contacts
// TODO: Allow unclick / disable if dont want to import

import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { Context as ContactsContext } from '../../context/ContactsContext';
import { Context as RoseContext } from '../../context/RoseContext';
import { MyHeader } from '../../paper-components/memo';

const ContactsScreen = () => {

    const { state: { contactsImported, _contacts }, updateImportedContacts } = useContext(ContactsContext);
    const { batch_addRoses } = useContext(RoseContext);

    const [contactsSelected, setContactsSelected] = useState({});
    const [_allContactList, _set_allContactList] = useState(_contacts);

    const selectAllContacts = () => {
        const _dict = Object.assign({}, ...Object.keys(_allContactList).map((contact) => {
            const ct = _allContactList[contact];
            return { [ct.id]: { ...ct, isImported: true } };
        }));
        _set_allContactList(_dict);
    }

    const _selectContact = (item) => {
        const contactID = item.id;
        const selectedContact = _allContactList[contactID];
        // console.log('contactID', contactID, selectedContact.name);
        if (!(contactID in contactsSelected)) {
            // console.log('not yet included')
            const _updatedContactsSelected = { ...contactsSelected };
            // console.log('selectedContact', selectedContact);
            _updatedContactsSelected[contactID] = selectedContact;
            setContactsSelected(_updatedContactsSelected);
            if (selectedContact) {
                const _upatedContacts = { ..._allContactList };
                _upatedContacts[contactID] = { ...selectedContact, isImported: true };
                _set_allContactList(_upatedContacts)
            }
            // FIXME: cannot be disabled because cannot uncheck it...
        } else if (!Object.keys(contactsImported).includes(contactID)) {
            // console.log('actsImported.includes')
            // setContactsSelected([...contactsSelected.filter(id => id !== contactID)])
            // const _upatedContacts = { ..._allContactList };
            // _upatedContacts[contactID] = { ...selectedContact, isImported: false };
            // _set_allContactList(_upatedContacts);
        }
    }

    const _renderItem = (id) => {
        const item = _allContactList[id];
        const { name, nickname } = item;
        const _isImported = (id in contactsImported || id in contactsSelected);
        // FIXME: uncomment below
        // if (_isImported) { return null; }
        return (
            <ListItem
                key={id}
                //leftAvatar={{ source: { uri: l.avatar_url } }}
                title={name}
                onPress={() => _selectContact(item)}
                subtitle={nickname}
                bottomDivider
                chevron
                disabled={_isImported}
                disabledStyle={{ backgroundColor: 'gray' }}
            />
        )
    }

    const _onPressImportContacts = async () => {
        const contactList = [];
        const updatedImportedContactIDs = Object.assign({}, ...Object.keys(contactsSelected).map(key => {
            contactList.push(contactsSelected[key]);
            return ({ [key]: true })
        }));
        // console.log('contactsSelected', updatedImportedContactIDs);
        await batch_addRoses({ contactList, callback: () => alert(`${contactList.length} Contacts added successfully`) });
        await updateImportedContacts(updatedImportedContactIDs);
        setContactsSelected([]);
    }

    return (
        <View style={styles.container}>
            <MyHeader style={styles.Headline}> Manager your Contacts here! </MyHeader>
            <Button onPress={() => { selectAllContacts() }}
            >
                Select all Contacts
            </Button>
            <Button onPress={() => { _onPressImportContacts() }}
                style={{ marginBottom: 10 }}
                disabled={Object.keys(contactsSelected).length === 0}
            >
                Import {Object.keys(contactsSelected).length} {(Object.keys(contactsSelected).length === 1) ? 'Contact' : 'Contacts'}
            </Button>
            <FlatList
                data={Object.keys(_allContactList)}
                keyExtractor={(id) => (id)}
                renderItem={({ item }) => _renderItem(item)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // height: 200,
        // alignItems: 'center',
        // width: "80%"
    },
    Headline: {
    },
});

export default ContactsScreen;