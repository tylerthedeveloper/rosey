import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';

export default () => {

    const [containerID, setContainerID] = useState({});
    const [contactList, setContactList] = useState([]);

    const getContactsPermissions = (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {

            const containerId = await Contacts.getDefaultContainerIdAsync();
            setContainerID(containerId);

            const { data } = await Contacts.getContactsAsync();
            if (data.length > 0) {
                setContactList(data);
            }
        }
    });

    const createContact = async (newContact) => {
        const {
            birthday, dateMet, email, homeLocation, name, nickName, notes,
            phoneNumber, placeMetAt, picture, socialProfiles, tags, work, roseId
        } = newContact || {};
        // console.log(newContact);
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

        // const homeAddress = {
        //     street:
        //     city:
        //     state:
        //     postalCode:
        // };

        const _birthdayObj = new Date(birthday);
        let _birthday = {
            day: _birthdayObj.getDate(),
            month: _birthdayObj.getMonth() + 1,
            year: _birthdayObj.getFullYear()
        };
        const _dateMetObj = new Date(dateMet);
        let _dateMet = {
            day: _dateMetObj.getDate(),
            month: _dateMetObj.getMonth() + 1,
            year: _dateMetObj.getFullYear(),
            label: 'date met'
        };
        console.log('dateMet', dateMet, _dateMet);
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
            firstName: _firstName,
            middleName: _middleName,
            lastName: _lastName,
            name,
            nickname: nickName,
            emails: [_email],
            phoneNumbers: [_phone],
            jobTitle: work,
            note: notes
        };
        //postalAddresses: [],
        // socialProfiles: [...(socialProfiles || [])],
        // `Tags: tags.join(', ') + {"\n"} notes`
        console.log(newContactObj);
        await Contacts.addContactAsync(newContactObj, (Platform.OS === 'ios' ? containerID : null))
            .then(success => alert('Conact Successfully added'))
            .catch(err => console.log(err))
        // .catch(err => alert('Error adding contact'))
    };


    useEffect(() => {
        getContactsPermissions();
    }, []);

    return { createContact };

}