import { db } from "@config/firebase";
import { arrayUnion, getDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

export const createDocument = async (filename: string, email: string) => {
  if (filename == "" || email == "") return;

  const userDocsRef = collection(db, "userDocs");

  const newDocRef = doc(userDocsRef, email);

  // add a list of document ids
  const docSnap = await getDoc(newDocRef);
  if (!docSnap.exists()) {
    await setDoc(newDocRef, {
      email: email,
      docIds: [],
    });
  }

  const docsColRef = collection(newDocRef, "docs");
  const newSubDocRef = doc(docsColRef);

  await setDoc(newSubDocRef, {
    filename,
    timestamp: serverTimestamp(),
  });

  await updateDoc(newDocRef, {
    docIds: arrayUnion(newSubDocRef.id),
  });
};
