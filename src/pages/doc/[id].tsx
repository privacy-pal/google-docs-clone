import { db } from "@config/firebase";
import IsAuth from "@feature/auth/IsAuth";
import EditorPage from "@feature/document/editor/EditorPage";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
import { doc, getDoc, DocumentSnapshot } from 'firebase/firestore';

interface DocProps {}

const Doc: React.FC<DocProps> = () => {
  const session = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [snapshot, setSnapshot] = useState<DocumentSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      const userEmail = session?.data?.user?.email as string;
      const docId = id as string;

      if (!userEmail || !docId) {
        setLoading(false);
        return;
      }

      const docRef = doc(db, "userDocs", userEmail, "docs", docId);
      try {
        const docSnap = await getDoc(docRef);
        setSnapshot(docSnap);
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [session, id]);

  if (!loading && !snapshot?.data()?.filename) {
    router.replace("/");
    return null;
  }

  return (
    <IsAuth>
      <Head>
        <title>{snapshot?.data()?.filename}</title>
      </Head>
      <EditorPage snapshot={snapshot} />
    </IsAuth>
  );
};

export default Doc;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
