import { db } from "@config/firebase";
import { collection, addDoc, doc, serverTimestamp } from "firebase/firestore";
//import firebase from "firebase";

export const createDocument = (filename: string, email: string) => {
  if (filename == "" || email == "") return;

  const userDocRef = doc(db, "userDocs", email);
  const docsColRef = collection(userDocRef, "docs");

  addDoc(docsColRef, {
    filename,
    timestamp: serverTimestamp(),
  });
};
