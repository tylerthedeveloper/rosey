import firebase from 'firebase'

export const getAllRosesFromFirebase = async (uid) => {
    const snapshot = await firebase.firestore().collection('roses').doc(uid).collection('myRoses')
        .get()
        .then(snapshot => snapshot.docs.map(doc => doc.data()))
    return snapshot;
}

export const addRoseToFirebase = async (uid, rose) => {
    return (await firebase.firestore().collection('roses').doc(uid).collection('myRoses').add(rose)).id
}