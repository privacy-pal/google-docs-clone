//import firebase from "firebase";
import { DocumentSnapshot, DocumentData } from "firebase/firestore";
import EditorHeader from "./EditorHeader";
import TextEditor from "./TextEditor";

interface EditorPageProps {
  snapshot:
    | DocumentSnapshot<DocumentData>
    | null;
}

const EditorPage: React.FC<EditorPageProps> = ({ snapshot }) => {
  return (
    <>
      <EditorHeader filename={snapshot?.data()?.filename as string} />
      <TextEditor />
    </>
  );
};

export default EditorPage;
