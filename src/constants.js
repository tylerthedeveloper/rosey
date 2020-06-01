import shortid from 'shortid';

export default {
    _generateUser: ({ name, email, userType }) => {
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
        if (userType !== 'user') {
            newUser = {
                ...newUser, 
                dateMet: new Date(Date.now()),
                placeMetAt: {
                  placeMetAtLocationCoords: { latitude: -369, longitude: -369 },
                  placeMetAtFormatted_address: '',
                  placeMetAtName: ''
                },
                tags: '',
            }
        };
        return newUser;
    },
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