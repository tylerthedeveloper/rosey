import firebase from 'firebase'
import Constants from '../constants';

//
// ────────────────────────────────────────────────── I ──────────
//   :::::: U S E R S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────
//
export const createnewFirebaseAccount = async ({ uid, email, phoneNumber }) => {
    const _user = Constants._generateUser({ userType: 'user', email, phoneNumber, uid });
    const doc = firebase.firestore().collection('users').doc(uid);
    return await doc.set(_user)
        .then(() => doc.get().then(userToReturn => userToReturn.data()));
}

export const getFirebaseAccount = async (uid) => {
    // FIXME: use this link https://stackoverflow.com/questions/49146325/get-firestore-generated-doc-id-after-set
    // to get the doc 
    // this helps after SIGNUP to not have to go fetch and ONLY fetch on login
    return await firebase.firestore().collection('users').doc(uid).get()
        .then((docRef) => docRef.data())
}

export const editFirebaseAccount = async ({ uid, data }) => {
    const doc = firebase.firestore().collection('users').doc(uid);
    return await doc.set(data)
        .then(() => doc.get().then(userToReturn => userToReturn.data()));
}
// ────────────────────────────────────────────────────────────────────────────────


//
// ────────────────────────────────────────────────── II ──────────
//   :::::: R O S E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────
//
export const addRoseToFirebase = async (uid, rose) => {
    const refID = await firebase.firestore().collection('roses').doc(uid).collection('myRoses').doc().id;
    rose.roseId = refID;
    await firebase.firestore().collection('roses').doc(uid).collection('myRoses').doc(refID).set(rose);
    return refID;
}

export const editRoseFromFirebase = async (uid, roseObj) => {
    return await firebase.firestore().collection('roses').doc(uid).collection('myRoses')
        .doc(roseObj.roseId)
        .set(roseObj, { merge: true })
}
export const deleteRoseFromFirebase = async (uid, roseId) => {
    return await firebase.firestore().collection('roses').doc(uid).collection('myRoses')
        .doc(roseId)
        .delete()
}

export const getAllRosesFromFirebase = async (uid) => {
    const snapshot = await firebase.firestore().collection('roses').doc(uid).collection('myRoses')
        .get()
        .then(snapshot => snapshot.docs.map(doc => doc.data()))
    return snapshot;
}
// ────────────────────────────────────────────────────────────────────────────────


//
// ──────────────────────────────────────────────────── III ──────────
//   :::::: P H O T O S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

/* ---------------------------------- Users --------------------------------- */
export const setProfilePhotoOnFirebase = async ({ uid, photo, metadata }) => {
    try {

        const response = await fetch(photo);
        const blob = await response.blob();
        return await firebase.storage().ref(`images/${uid}/profile_photo`).put(blob, metadata)
            .then(async data => await data.ref.getDownloadURL())
    } catch (error) {
        console.error(error);
    };
}

/* ---------------------------------- Roses --------------------------------- */
export const setRoseProfilePhotoOnFirebase = async ({ uid, roseId, photo, metadata }) => {
    try {
        const response = await fetch(photo);
        const blob = await response.blob();
        return await firebase.storage().ref().child(`images/${uid}/${roseId}/profile_photo`).put(blob, metadata)
            .then(async data => await data.ref.getDownloadURL())
    } catch (error) {
        console.error(error);
    };
}

// TODO: How to add multiple???
export const addPhotosToFirebase = async (uid, photos) => {
    // return await firebase.STORAGE().collection('images').doc(uid);
}
// ────────────────────────────────────────────────────────────────────────────────



//TODO: should this just go on the user??? in tags: []
// export const addTagToFirebase = async (uid, tag) => {
//     const refID = await firebase.firestore().collection('roses').doc(uid).collection('myRoses').doc().id;
//     rose.roseId = refID;
//     await firebase.firestore().collection('roses').doc(uid).collection('myRoses').doc(refID).set(rose);
//     return refID;
// }
// ────────────────────────────────────────────────────────────────────────────────



