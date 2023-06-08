import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { appFireStore } from "../firebase/config";

export const useCollection = (transaction: any) => {
  const [documents, setDocuments] = useState<any>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const todosRef = collection(appFireStore, transaction);
    const q = query(todosRef, orderBy("createdTime", "desc"));

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
  }, [transaction]);

  return { documents, error };
};
