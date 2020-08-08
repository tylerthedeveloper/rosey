// TODO: Avoid redundant mapping
// TODO: Do not include already imported contacts
// TODO: Allow unclick / disable if dont want to import

import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Button, ActivityIndicator, Snackbar } from 'react-native-paper';
import { Context as ContactsContext } from '../../context/ContactsContext';
import { Context as RoseContext } from '../../context/RoseContext';
import { MyHeader } from '../../paper-components/memo';

const ContactsScreen = () => {

    const { state: { contactsImported, _contacts }, updateImportedContacts } = useContext(ContactsContext);
    const { batch_addRoses } = useContext(RoseContext);

    const [contactsSelected, setContactsSelected] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [_allContactList, _set_allContactList] = useState(_contacts);

    const selectAllContacts = () => {
        setIsLoading(true);
        const _dict = Object.assign({}, ...Object.keys(_allContactList).map((contact) => {
            const ct = _allContactList[contact];
            return { [ct.id]: { ...ct, isImported: true } };
        }));
        setContactsSelected(_dict);
        _set_allContactList(_dict);
        setIsLoading(false);
    }

    const _selectContact = (item) => {
        const contactID = item.id;
        const selectedContact = _allContactList[contactID];
        if (!(contactID in contactsSelected)) {
            const _updatedContactsSelected = { ...contactsSelected };
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

    const _onPressImportContacts = async () => {
        const contactList = [];
        const updatedImportedContactIDs = Object.assign({}, ...Object.keys(contactsSelected).map(key => {
            contactList.push(contactsSelected[key]);
            return ({ [key]: true })
        }));
        await batch_addRoses({ contactList, callback: () => alert(`${contactList.length} Contacts added successfully`) });
        await updateImportedContacts(updatedImportedContactIDs);
        // onToggleSnackBar();
        // setTimeout(() => setVisible(false), 2000)
        setContactsSelected([]);
    }

    //     VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that 
    // follow React performance best practices like PureComponent, shouldComponentUpdate, etc. Object {
    //   "contentLength": 32778.5,
    //   "dt": 5521,
    //   "prevDt": 525,
    // }
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

    const _sortedKeys = Object.keys(_allContactList).sort((a, b) => {
        // const textA = (_allContactList[a]['name'] !== undefined && _allContactList[a]['name'] !== '') ? _allContactList[a]['name'].toUpperCase() : '';
        // const textB = (_allContactList[b]['name'] !== undefined && _allContactList[b]['name'] !== '') ? _allContactList[b]['name'].toUpperCase() : '';
        const textA = _allContactList[a]['name'].toUpperCase();
        const textB = _allContactList[b]['name'].toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;

    });

    // const [visible, setVisible] = React.useState(false);

    // const onToggleSnackBar = () => setVisible(!visible);

    // const onDismissSnackBar = () => setVisible(false);

    return (
        <View style={styles.container}>
            <MyHeader style={styles.Headline}> Manage your Contacts here! </MyHeader>
            <Button onPress={() => { selectAllContacts() }}
            >
                Select all Contacts
            </Button>
            {
                isLoading && <ActivityIndicator />
            }
            <Button onPress={() => { _onPressImportContacts() }}
                style={{ marginBottom: 10 }}
                disabled={Object.keys(contactsSelected).length === 0}
            >
                Import {Object.keys(contactsSelected).length} {(Object.keys(contactsSelected).length === 1) ? 'Contact' : 'Contacts'}
            </Button>
            <FlatList
                data={_sortedKeys}
                keyExtractor={(id) => (id)}
                renderItem={({ item }) => _renderItem(item)}
            />
            {/* <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Close',
                    onPress: () => {
                        setVisible(false);
                    },
                }}>
                Try to add more contacts!
            </Snackbar> */}
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