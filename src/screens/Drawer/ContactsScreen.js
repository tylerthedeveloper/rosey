// TODO: Avoid redundant mapping
// TODO: Do not include already imported contacts
// TODO: Allow unclick / disable if dont want to import

import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { Context as ContactsContext } from '../../context/ContactsContext';
import { MyHeader } from '../../paper-components/memo';

const ContactsScreen = () => {

    // const { contactList } = useContacts();

    const { state: { contactsImported, _contacts }, updateImportedContacts } = useContext(ContactsContext);

    // console.log('contacts imported', contactsImported.length, contactsImported);

    const [contactsSelected, setContactsSelected] = useState([]);
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

    const _selectContact = (contactID) => {
        const selectedContact = _allContactList[contactID];
        if (!contactsSelected.includes(contactID)) {
            // console.log(contactsSelected.includes(contactID))
            // contact.isImported = true;
            // console.log(contactsSelected);
            // const selectedContact = _contacts.find(ct => ct.id == contactID);
            setContactsSelected([...contactsSelected, contactID])
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
        } else if (!contactsImported.includes(contactID)) {
            console.log('actsImported.includes')
            setContactsSelected([...contactsSelected.filter(id => id !== contactID)])
            const _upatedContacts = { ..._allContactList };
            _upatedContacts[contactID] = { ...selectedContact, isImported: false };
            _set_allContactList(_upatedContacts);
        }
    }

    // console.log(_allContactList);

    const _renderItem = (id) => {
        const item = _allContactList[id];
        const { name, nickname, isImported } = item;
        return (
            <ListItem
                key={id}
                //leftAvatar={{ source: { uri: l.avatar_url } }}
                title={name}
                onPress={() => _selectContact(id)}
                subtitle={nickname}
                bottomDivider
                chevron
                disabled={isImported}
                disabledStyle={{ backgroundColor: 'gray' }}
            />
        )
    }

    return (
        <View style={styles.container}>
            <MyHeader style={styles.Headline}> Manager your Contacts here! </MyHeader>
            <Button onPress={() => { selectAllContacts() }}
            >
                Select all Contacts
            </Button>
            <Button onPress={() => { updateImportedContacts(contactsSelected); setContactsSelected([]) }}
                style={{ marginBottom: 10 }}
                disabled={contactsSelected.length === 0}
            >
                Import {contactsSelected.length} Contacts
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