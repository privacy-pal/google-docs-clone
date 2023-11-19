import { db } from "@config/firebase";
import moment from "moment";
import { useSession } from "next-auth/react";
import RecentDocument from "./RecentDocument";
import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";

interface RecentDocumentsProps {}

interface DocumentType {
  id: string;
  data: any; // Replace 'any' with your document's structure
}

const RecentDocuments: React.FC<RecentDocumentsProps> = ({}) => {
  const session = useSession();
  const [documents, setDocuments] = useState<DocumentType[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const userEmail = session?.data?.user?.email as string;
      if (!userEmail) return;

      const userDocRef = doc(db, "userDocs", userEmail);

      const docsColRef = collection(userDocRef, "docs");

      const docsQuery = query(docsColRef, orderBy("timestamp", "desc"));

      try {
        const querySnapshot = await getDocs(docsQuery);
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setDocuments(docs);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, [session]);

  return (
    <>
      {documents.map((doc) => (
        <RecentDocument
          key={doc.id}
          id={doc.id}
          filename={doc.data.filename as string}
          date={moment(doc.data.timestamp.toDate()).format("DD MMM YYYY")}
        />
      ))}
    </>
  );

};

export default RecentDocuments;
