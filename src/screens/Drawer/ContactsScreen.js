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
    const { } = useContext(RoseContext);

    // console.log('contacts imported', contactsImported);

    const [contactsSelected, setContactsSelected] = useState({});
    const [_allContactList, _set_allContactList] = useState(_contacts
        // Object.assign({}, ..._contacts.map((ct) => ({[ct.id]: ct})))
        // Object.keys(_contacts).map(key => {
        //     const contact = _contacts[key];
        //     const { id } = contact;
        //     if (contactsImported.includes(id)) {
        //         _contacts[key].isImported = true;
        //     }
        //     return contact;
        // })
    );

    // console.log('_allContactList', _allContactList);

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
        console.log('contactID', contactID, selectedContact.name);
        if (!(contactID in contactsSelected)) {
            console.log('not yet included')
            // contact.isImported = true;
            // console.log(contactsSelected);
            // const selectedContact = _contacts.find(ct => ct.id == contactID);
            const _updatedContactsSelected = { ...contactsSelected };
            console.log('selectedContact', selectedContact);
            _updatedContactsSelected[contactID] = selectedContact;
            setContactsSelected(_updatedContactsSelected);
            // const selectedContact = _contacts[contactID];
            // if (selectedContact) {
            //     selectedContact.isImported = true;
            // }
            // console.log(_allContactList);
            // console.log('selectedContact 1', selectedContact);
            if (selectedContact) {
                // console.log('selectedContact 2');
                // selectedContact.isImported = true;
                const _upatedContacts = { ..._allContactList };
                _upatedContacts[contactID] = { ...selectedContact, isImported: true };
                _set_allContactList(_upatedContacts)
            }
            // FIXME: cannot be disabled because cannot uncheck it...
        } else if (!Object.keys(contactsImported).includes(contactID)) {
            console.log('actsImported.includes')
            // setContactsSelected([...contactsSelected.filter(id => id !== contactID)])
            // const _upatedContacts = { ..._allContactList };
            // _upatedContacts[contactID] = { ...selectedContact, isImported: false };
            // _set_allContactList(_upatedContacts);
        }
    }

    // console.log('contactsSelected', contactsSelected, _allContactList);
    // console.log(contactsImported, contactsSelected);
    // console.log(Object.keys(contactsSelected));

    const _renderItem = (id) => {
        const item = _allContactList[id];
        const { name, nickname } = item;
        // console.log('item', item)
        const _isImported = (id in contactsImported || id in contactsSelected);
        console.log('name', name, _isImported);
        // FIXME: uncomment below
        // if (_isImported) return null;
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

    const _onPressImportContacts = () => {
        const updatedImportedContacts = Object.assign({}, ...Object.keys(contactsSelected).map(key => ({ [key]: true })));
        console.log('contactsSelected', updatedImportedContacts);
        updateImportedContacts(updatedImportedContacts);
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
                disabled={contactsSelected.length === 0}
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