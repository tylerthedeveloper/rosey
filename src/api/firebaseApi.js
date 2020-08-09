import firebase from 'firebase'

// export const createnewFirebaseAccount = async (uid, email, phoneNumber) => {
//     return await firebase.firestore().collection('users').doc(uid).set({ uid, email, phoneNumber })
// }

export const getAllRosesFromFirebase = async (uid) => {
    const snapshot = await firebase.firestore().collection('roses').doc(uid).collection('myRoses')
        .get()
        .then(snapshot => snapshot.docs.map(doc => doc.data()))
    return snapshot;
}

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


// const { email, uid } = response.user;
// await firebase
//     .firestore()
//     .collection('users')
//     .doc(uid)
//     .set({ email: email, uid: uid })
//     .then(() => signinWithFirebase({ email, uid }))