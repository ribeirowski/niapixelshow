import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = require('./credentials/nia-pixel-show---testes-firebase-adminsdk-8m0ty-ee554cb33c.json');

const adminAppTest = initializeApp({
    credential: admin.credential.cert(serviceAccount),
}, "adminAppTest");

const adminAuthTest = getAuth(adminAppTest);
const firestoreDBTest = getFirestore(adminAppTest);

export { adminAuthTest, firestoreDBTest };