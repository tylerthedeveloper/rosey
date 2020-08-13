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


//TODO: should this just go on the user??? in tags: []
//
// ──────────────────────────────────────────────── III ──────────
//   :::::: T A G S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────
//
export const addTagToFirebase = async (uid, tag) => {
    const refID = await firebase.firestore().collection('roses').doc(uid).collection('myRoses').doc().id;
    rose.roseId = refID;
    await firebase.firestore().collection('roses').doc(uid).collection('myRoses').doc(refID).set(rose);
    return refID;
}
// ────────────────────────────────────────────────────────────────────────────────



// Photos
// export const fetchPhotosFromFirebase = async (uid) => {
//     return await firebase.STORAGE().collection('images').doc(uid);
// }
// ────────────────────────────────────────────────────────────────────────────────

