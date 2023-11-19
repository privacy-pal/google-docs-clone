import { db } from "@config/firebase";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  // @ts-ignore
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);

interface TextEditorProps {}

const TextEditor: React.FC<TextEditorProps> = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const session = useSession();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchDocument = async () => {
      const userEmail = session?.data?.user?.email as string;
      const docId = id as string;

      if (!userEmail || !docId) return;

      const docRef = doc(db, "userDocs", userEmail, "docs", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().editorState) {
        setEditorState(
          EditorState.createWithContent(
            convertFromRaw(docSnap.data().editorState)
          )
        );
      }
    };

    fetchDocument();
  }, [session, id]);


  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);

    const userEmail = session?.data?.user?.email as string;
    const docId = id as string;

    if (!userEmail || !docId) return;

    const docRef = doc(collection(doc(db, "userDocs", userEmail), "docs"), docId);

    setDoc(docRef, {
      editorState: convertToRaw(editorState.getCurrentContent()),
    }, { merge: true} )
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-16">
      {/*@ts-ignore*/}
      <Editor
        //@ts-ignore
        toolbarClassName="flex sticky top-0 z-50 !justify-center
      mx-auto"
        editorClassName="mt-6 bg-white shadow-lg max-w-5xl mx-auto
        mb-12 border p-10"
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default TextEditor;
