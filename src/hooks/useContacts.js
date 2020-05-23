import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';

export default () => {

    const [containerID, setContainerID] = useState({});
    const [contactList, setContactList] = useState([]);

    const getContactsPermissions = (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {

            if (Platform.OS === 'ios') {
                const containerId = await Contacts.getDefaultContainerIdAsync();
                setContainerID(containerId);
                // console.log(containerId);
            }

            const { data } = await Contacts.getContactsAsync();
            if (data.length > 0) {
                setContactList(data);
            }
        }
    });

    const _formatAddress = (formatted_address, label) => {
        const _locationParsed = formatted_address.split(',')
        let _address = { label, id: label };
        if (_locationParsed && _locationParsed.length >= 0) {
            _address.street = _locationParsed[0].trim();
            if (_locationParsed.length >= 1) {
                _address.city = _locationParsed[1].trim();
            }
            if (_locationParsed.length >= 2) {
                const stateAndPostalCode = _locationParsed[2].trim().split(' ');
                // console.log(stateAndPostalCode)
                if (stateAndPostalCode && stateAndPostalCode.length >= 1) {
                    _address.region = stateAndPostalCode[0];
                    if (stateAndPostalCode && stateAndPostalCode.length == 2) {
                        _address.postalCode = stateAndPostalCode[1];
                    }
                }
            }
            if (_locationParsed.length >= 3) {
                _address.country = _locationParsed[3].trim();
            }
        }
        return _address;
    }

    const _formatDate = (date, label) => {
        const _date = new Date(date);
        let _dateObj = {
            day: _date.getDate(),
            month: _date.getMonth() + 1,
            year: _date.getFullYear()
        };
        if (label) {
            _dateObj.label = label;
        }
        return _dateObj;
    }

    // TODO: continue to make helpers ^ 
    const createContact = async (newContact) => {
        const {
            birthday, dateMet, email, homeLocation, name, nickName, notes,
            phoneNumber, placeMetAt, picture, socialProfiles, tags, work, roseId
        } = newContact || {};

        let _names = name.split(' ');
        let _firstName = '', _middleName = '', _lastName = '';
        if (_names && _names.length > 0) {
            _firstName = _names[0];
            if (_names.length == 2) {
                _lastName = _names[2];
            } else if (_names.length == 3) {
                _middleName = _names[1];
                _lastName = _names[2];
            }
        }

        let _addresses = [];
        const homeAddress = _formatAddress(homeLocation.homeFormatted_address, 'home');
        const placeMetAddress = _formatAddress(placeMetAt.placeMetAtFormatted_address, 'place met');
        if (homeAddress && Object.keys(homeAddress).length > 0) _addresses.push(homeAddress);
        if (placeMetAddress && Object.keys(placeMetAddress).length > 0) _addresses.push(placeMetAddress);

        // const _birthday = _formatDate(birthday);
        const _birthday = (_birthday) ? _formatDate(birthday) : {};
        // const _dateMet = (_dateMet) ? _formatDate(dateMet, 'date met') : {};
        const _dateMet = _formatDate(dateMet, 'date met');
        // const _socialProfiles = Object.keys(socialProfiles).map(key => )
        // console.log(_socialProfiles)
        const _email = {
            email,
            isPrimary: true,
            id: email,
            label: 'home'
        };
        const _phone = {
            number: phoneNumber,
            isPrimary: true,
            digits: phoneNumber,
            countryCode: "+1", // FIXME:!!!!
            id: phoneNumber,
            label: 'mobile'
        };
        const newContactObj = {
            birthday: _birthday,
            dates: [_dateMet],
            firstName: _firstName || '',
            middleName: _middleName || '',
            lastName: _lastName || '',
            addresses: [...(_addresses || [])],
            name: name || '',
            nickname: nickName || '',
            emails: [(_email) ? _email : null],
            phoneNumbers: [(_phone) ? _phone : null],
            jobTitle: work || '',
            note: `Tags: ${tags.join(', ')}${"\n"}${notes}`
        };
        // socialProfiles: [...(socialProfiles || [])],
        // 
        await Contacts.addContactAsync(newContactObj, (Platform.OS === 'ios' ? containerID : null))
            .then(success => alert('Contact Successfully added'))
            // .catch(err => console.log(err))
            .catch(err => alert('Error adding contact'))
    };

    useEffect(() => {
        getContactsPermissions();
    }, []);

    return { createContact };

}