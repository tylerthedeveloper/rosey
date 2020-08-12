import * as StoreReview from 'expo-store-review';
import * as WebBrowser from 'expo-web-browser';
import { Alert, AsyncStorage, Share } from 'react-native';

const _generateUser = ({ userType, email, phoneNumber, uid }) => {

    let newUser = {
        birthday: new Date(Date.now()),
        email: email || '',
        homeLocation: {
            homeLocationCoords: { latitude: -369, longitude: -369 },
            homeFormatted_address: '',
            homeLocationName: ''
        },
        name: '',
        notes: '',
        nickName: '',
        phoneNumber: phoneNumber || '',
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
        uid,
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