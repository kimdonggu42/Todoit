import { addDoc, updateDoc, deleteDoc, collection, doc } from "firebase/firestore";
import { useReducer } from "react";
import { appFireStore, timestamp } from "../firebase/config";

const storeReducer = (state: any, action: any) => {
  switch (action.type) {
    case "isPending":
      return { isPending: true, document: null, success: false, error: null };
    case "addDoc":
      return { isPending: false, document: action.payload, success: true, error: null };
    case "updateDoc":
      return { isPending: false, document: action.payload, success: true, error: null };
    case "deleteDoc":
      return { isPending: false, document: action.payload, success: true, error: null };
    case "error":
      return { isPending: false, document: null, success: false, error: action.payload };
    default:
      return state;
  }
};

const initialState = {
  document: null,
  isPending: false,
  success: false,
  error: null,
};

export const useFireStore = (transaction: any) => {
  const [response, dispatch] = useReducer(storeReducer, initialState);

  const addDocument = async (addDocument: any) => {
    dispatch({ type: "isPending" });
    try {
      const createdTime = timestamp.fromDate(new Date());
      const docRef = await addDoc(collection(appFireStore, transaction), {
        ...addDocument,
        createdTime,
      });
      dispatch({ type: "addDoc", payload: docRef });
    } catch (err: any) {
      dispatch({ type: "error", payload: err.message });
    }
  };

  const updateDocument = async (id: string, updatedFields: any) => {
    dispatch({ type: "isPending" });
    try {
      const docRef = doc(appFireStore, transaction, id);
      await updateDoc(docRef, updatedFields);
      dispatch({ type: "updateDoc", payload: docRef });
    } catch (err: any) {
      dispatch({ type: "error", payload: err.message });
    }
  };

  const deleteDocument = async (id: string) => {
    dispatch({ type: "isPending" });
    try {
      const docRef = await deleteDoc(doc(collection(appFireStore, transaction), id));
      dispatch({ type: "deleteDoc", payload: docRef });
    } catch (err: any) {
      dispatch({ type: "error", payload: err.message });
    }
  };

  return { addDocument, updateDocument, deleteDocument, response };
};
