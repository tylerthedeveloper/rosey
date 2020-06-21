import shortid from 'shortid';

const _generateUser = ({ name, email, password, userType }) => {
    let newUser = {
        birthday: new Date(Date.now()),
        email: email || '',
        homeLocation: {
            homeLocationCoords: { latitude: -369, longitude: -369 },
            homeFormatted_address: '',
            homeLocationName: ''
        },
        name: name || '',
        nickName: '',
        phoneNumber: '',
        picture: '',
        socialProfiles: {
            facebook: '',
            linkedin: '',
            instagram: '',
            medium: '',
            snapchat: '',
            twitter: '',
            whatsapp: ''
        },
        work: ''
    };
    // console.log('password', password);
    if (userType === 'user') {
        newUser.password = password;
    } else if (userType !== 'user') {
        newUser = {
            ...newUser,
            dateMet: new Date(Date.now()),
            placeMetAt: {
                placeMetAtLocationCoords: { latitude: -369, longitude: -369 },
                placeMetAtFormatted_address: '',
                placeMetAtName: ''
            },
            tags: [],
        }
    };
    return newUser;
}

const _areObjectsEqual = (a, b, ignoreArray) => {
    let equality = true;
    for (let key of Object.keys(a)) {
        if (!ignoreArray.includes(key)) {
            if (a[key] === b[key]) {
                continue;
            }
            if (Array.isArray(a[key]) && b[key] !== undefined) {
                if (!(a[key].sort().toString() == b[key].sort().toString())) return false;
            } else if (typeof a[key] === 'object') {
                equality = _areObjectsEqual(a[key], b[key], ignoreArray)
                if (!equality) break;
            } else if (a[key] !== b[key]) {
                return false;
            }
        }
    };
    return equality;
}
export default {
    _generateUser,
    _areObjectsEqual,
    my_personal_card: {
        birthday: '',
        dateMet: '',
        email: 'rozycontact@gmail.com',
        homeLocation: {
            homeLocationCoords: { latitude: 47.6062, longitude: -122.332 },
            homeFormatted_address: 'Seattle, Wa, 98122',
            homeLocationName: 'Seattle'
        },
        placeMetAt: {
            placeMetAtLocationCoords: { latitude: -369, longitude: -369 },
            placeMetAtFormatted_address: '',
            placeMetAtName: ''
        },
        name: 'Tyler Citrin',
        notes: 'Hey, my name is Tyler! You can add more roses on the previous ' +
            'screen with the plus button in the bottom corner. If you are ' +
            'interested in chatting, feel free to contact me!',
        nickName: 'Tito',
        phoneNumber: '',
        picture: '',
        tags: ['Friend'],
        work: 'Developer, PM',
        roseId: shortid.generate()
    }
};