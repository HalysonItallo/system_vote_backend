import * as admin from 'firebase-admin';

var serviceAccount = require("../../../../system-vote-firebase-admin.json")

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

export const db = admin.firestore();
