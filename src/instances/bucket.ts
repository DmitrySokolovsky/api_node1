import admin from 'firebase-admin';
import firebaseAccountCredentials from '../../nodestore-eedd9-firebase-adminsdk-h1woo-193ce6ba42.json';

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://nodestore-eedd9.firebaseio.com',
    storageBucket: 'gs://nodestore-eedd9.appspot.com'
});

export const bucket = admin.storage().bucket();
