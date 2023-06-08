import { addDoc, collection } from "firebase/firestore";
import { useReducer } from "react";
import { appFireStore, timestamp } from "../firebase/config";

const initState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const storeReducer = (state: any, action: any) => {
  switch (action.type) {
    case "isPending":
      return { isPending: true, document: null, success: false, error: null };
    case "addDoc":
      return { isPending: false, document: action.payload, success: true, error: null };
    case "error":
      return { isPending: false, document: null, success: false, error: action.payload };
    default:
      return state;
  }
};

export const useFireStore = (transaction: any) => {
  const [response, dispatch] = useReducer(storeReducer, initState);

  const addDocument = async (doc: any) => {
    dispatch({ type: "isPending" });
    try {
      const createdTime = timestamp.fromDate(new Date());
      const docRef = await addDoc(collection(appFireStore, transaction), { ...doc, createdTime });
      console.log(docRef);
      dispatch({ type: "addDoc", payload: docRef });
    } catch (err: any) {
      dispatch({ type: "error", payload: err.message });
    }
  };

  const deleteDocunemt = (id: any) => {};

  return { addDocument, deleteDocunemt, response };
};
