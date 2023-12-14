const { cert, initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
var serviceAccount = require("../../serviceAccountKey.json");

class Database {
    static firestore;

    static initialize() {
        initializeApp({
            credential: cert(serviceAccount),
        }),

        Database.firestore = getFirestore();
    }
}

Database.initialize();

module.exports = Database;