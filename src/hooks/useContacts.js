import * as Contacts from 'expo-contacts';
import { useContext, useState } from 'react';
import { Context as ContactsContext } from '../context/ContactsContext';

export default () => {

    const [containerID, setContainerID] = useState({});

    const { _setContacts } = useContext(ContactsContext);

    const getContactsPermissions = (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {

            if (Platform.OS === 'ios') {
                const containerId = await Contacts.getDefaultContainerIdAsync();
                setContainerID(containerId);
            }

            const { data } = await Contacts.getContactsAsync();
            if (data.length > 0) {
                const _dict = Object.assign({}, ...data/**.slice(0, 1000)*/.map((ct) => {
                    if (ct['name']) {
                        const phoneNumbers = ct['phoneNumbers'];
                        const emails = ct['emails'];
                        if (phoneNumbers !== undefined && phoneNumbers.length > 0 && ct['name'] !== phoneNumbers[0]['number']) {
                            if (emails === undefined) return ({ [ct.id]: ct });
                            else if (emails.length > 0 && ct['name'] !== emails[0]['email']) return ({ [ct.id]: ct });
                        }
                        else if (emails !== undefined && emails.length > 0 && ct['name'] !== emails[0]['email']) {
                            if (phoneNumbers === undefined) return ({ [ct.id]: ct });
                            else if (phoneNumbers.length > 0 && ct['name'] !== phoneNumbers[0]['number']) return ({ [ct.id]: ct });
                        }
                    }
                }));
                _setContacts(_dict);
            }
        }
    });

    // FIXME: this needs a ton of work for different length addresses
    // len 3: city/state/country
    // len 4 (what order?): city/state/country, postal code?
    // len 4 (with 3 == len 2, total == 5):full address

    const _formatAddress = (formatted_address, label) => {
        const _locationParsed = formatted_address.split(',')
        let _address = { label, id: label };
        if (_locationParsed && _locationParsed.length == 3) {
            _address.city = _locationParsed[0].trim();
            _address.region = _locationParsed[1].trim();
            _address.country = _locationParsed[2].trim();
        }
        else if (_locationParsed && _locationParsed.length == 4) {
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
        // console.log(homeLocation);
        const homeAddress = (homeLocation && Object.keys(homeLocation).length > 0)
            ? _formatAddress(homeLocation.homeFormatted_address, 'home')
            : {};
        const placeMetAddress = (placeMetAt && Object.keys(placeMetAt).length > 0)
            ? _formatAddress(placeMetAt.placeMetAtFormatted_address, 'place met')
            : {};
        // console.log('placeMetAddress', placeMetAddress);
        if (homeAddress && Object.keys(homeAddress).length > 0) _addresses.push(homeAddress);
        if (placeMetAddress && Object.keys(placeMetAddress).length > 0) _addresses.push(placeMetAddress);

        // TODO: will there ever be a no date option
        // const _birthday = (_birthday) ? _formatDate(birthday) : {};
        // const _dateMet = (_dateMet) ? _formatDate(dateMet, 'date met') : {};
        const _birthday = _formatDate(birthday);
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
        const newContactObj = {};
        if (_birthday) newContactObj.birthday = _birthday;
        if (_dateMet) newContactObj.dates = [_dateMet];
        if (_firstName) newContactObj.firstName = _firstName;
        if (_middleName) newContactObj.middleName = _middleName;
        if (_lastName) newContactObj.lastName = _lastName;
        if (nickName) newContactObj.nickname = nickName;
        if (email) newContactObj.emails = [_email];
        if (phoneNumber) newContactObj.phoneNumbers = [_phone];
        if (work) newContactObj.jobTitle = work;
        if (tags || notes) newContactObj.note = `Tags: ${tags.join(', ')}${"\n"}${notes}`;
        if (_addresses && _addresses.length > 0) newContactObj.addresses = _addresses;

        // socialProfiles: [...(socialProfiles || [])],

        await Contacts.addContactAsync(newContactObj, (Platform.OS === 'ios' ? containerID : null))
            .then(success => alert('Contact Successfully added'))
            // .catch(err => console.log(err))
            .catch(err => alert('Error adding contact'))
    };

    return { getContactsPermissions, createContact };

}