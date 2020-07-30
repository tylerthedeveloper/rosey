// TODO: separate tools and utils?

import shortid from 'shortid';
import { Share, Alert, AsyncStorage } from 'react-native';
import { Colors } from 'react-native-paper';
// import * as Linking from 'expo-linking';
import * as StoreReview from 'expo-store-review';
import * as WebBrowser from 'expo-web-browser';

const linksDictionary = {
    app_store_url: '',
    feedback_survey_url: 'https://forms.gle/NoamPMmd75N5vmXC7',
    play_store_url: 'https://play.google.com/store/apps/details?id=com.rozy_app.rozy',
    reddit_page_url: 'https://www.reddit.com/r/RozyApp/',
    rozy_blog_url: 'https://medium.com/@tylercitrin/the-sunday-shortlist-crazy-encounters-life-lessons-and-a-mobile-application-rozy-55aa3068289d',
    rozy_website_url: 'http://rozy-website.herokuapp.com/'
}

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
        notes: '',
        nickName: '',
        phoneNumber: '',
        personalSite: '',
        picture: '',
        socialProfiles: {
            facebook: '',
            linkedin: '',
            instagram: '',
            medium: '',
            snapchat: '',
            twitch: '',
            twitter: '',
            venmo: '',
            whatsapp: ''
        },
        work: ''
    };
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
    // console.log(a)
    for (let key of Object.keys(a)) {
        if (!ignoreArray.includes(key)) {
            // if (a[key] === b[key]) {
            //     continue;
            // }
            // if (typeof a[key] === 'object') {
            //     console.log(key, a[key], b[key])
            // }
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

const COLORS = [
    Colors.amber300,
    Colors.blue500,
    Colors.cyan500,
    Colors.deepOrange700,
    Colors.lightGreen500,
    Colors.lightBlue800,
    Colors.pink900,
    Colors.purple400,
    Colors.red300,
    Colors.tealA400,
    Colors.amber900,
    Colors.blue900,
    Colors.deepOrange300,
    Colors.lightGreen900,
    Colors.pinkA700,
]

const isObjectEmpty = (obj) => {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop) && obj[prop] !== NaN)
            return false;
    }
    return true;
}

const _provideFeedbackFunction = async () => {
    try {
        if (Platform.OS === "ios") {
            // if (StoreReview.isAvailableAsync()) {
            //     StoreReview.requestReview();
            //     await AsyncStorage.setItem('didIReviewApp', 'true');
            // }
            // else {
            //     alert("It looks like your device doesn't support this or you already left a review, thank you! (:")
            // }
            StoreReview.requestReview();
            await AsyncStorage.setItem('didIReviewApp', 'true');
            // new Promise((res, rej) => setTimeout(() => StoreReview.requestReview(), 500))
            //     .then(async res => await AsyncStorage.setItem('didIReviewApp', 'true'))
        } else {
            await AsyncStorage.setItem('didIReviewApp', 'true');
            WebBrowser.openBrowserAsync(linksDictionary.play_store_url);
        }
    } catch (err) {
        console.log(err.message);
    }
}

const _askForFeedbackReview = () => {
    Alert.alert(
        "Are you liking Rozy?",
        "If so, please leave a review",
        [
            // { text: "Text", onPress: () => Linking.openURL(`sms:9739029054`) },
            { text: "Review", onPress: _provideFeedbackFunction },
            {
                text: "Cancel",
                style: "destructive"
            },
        ],
        { cancelable: true }
    );
}


const _shareProfile = async (userID) => {

    // const redirectUrl = Linking.makeUrl('/') + `main/home/add?userID=${userID}`;
    // console.log(redirectUrl);
    // const redirectUrl = `exp://ve-9ga.tcitrin.rosey-app.exp.direct:80/--/main/home/add?userID=${userID}`;
    const redirectUrl = `https://rosey-server.herokuapp.com/users/app?userID=${userID}`;

    try {
        if (Platform.OS === "ios") {
            await Share.share({
                title: 'App link',
                message: 'Share your contact card with existing friends',
                url: redirectUrl
            });
        } else if (Platform.OS === "android") {
            await Share.share({
                title: 'App link',
                message: `Share your contact card with existing friends: ${redirectUrl}`,
            });
        }
    } catch (error) {
        alert(error.message);
    }
}

const my_personal_card = {
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
    personalSite: '',
    phoneNumber: '',
    picture: '',
    tags: [{ tag: 'Friend', color: Colors.red500 }],
    work: 'Developer, PM',
    roseId: shortid.generate()
};

export default {
    _askForFeedbackReview,
    _generateUser,
    _areObjectsEqual,
    _shareProfile,
    isObjectEmpty,
    COLORS,
    my_personal_card,
    _provideFeedbackFunction,
    linksDictionary: linksDictionary,
};