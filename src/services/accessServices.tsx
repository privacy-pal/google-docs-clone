import { PrivacyPalClient } from "privacy-pal";
import handleAccess from "privacy/access";
import { FirestoreLocator } from "privacy-pal/dist/src/model";
import { db } from "@config/firebase";

async function accessUserData() {
    const pal = new PrivacyPalClient<FirestoreLocator>(db);

    const userId = "yiran.shi23@gmail.com"

    const dataSubjectLocator: FirestoreLocator = {
        dataType: 'user',
        singleDocument: true,
        collectionPath: ['users'],
        docIds: [userId]
    };

    const res = await pal.processAccessRequest(handleAccess, dataSubjectLocator, userId)
    console.log(res);
}