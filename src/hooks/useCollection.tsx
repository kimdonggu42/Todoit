import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  CollectionReference,
  Query,
  WhereFilterOp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { appFireStore } from "../firebase/config";

export const useCollection = (transaction: string, myQuery: [string, WhereFilterOp, string]) => {
  const [documents, setDocuments] = useState<any>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const todosRef: CollectionReference = collection(appFireStore, transaction);

    let q: Query = todosRef;
    const [fieldName, operator, fieldValue] = myQuery;

    if (myQuery && fieldValue !== undefined) {
      q = query(todosRef, where(fieldName, operator, fieldValue), orderBy("createdTime", "desc"));
    } else {
      q = query(todosRef, orderBy("createdTime", "desc"));
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const updatedDocuments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(updatedDocuments);
        setError(null);
      },
      (err: any) => {
        setError(err.message);
      }
    );

    return unsubscribe;
  }, []);

  return { documents, error };
};
