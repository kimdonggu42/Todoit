import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  CollectionReference,
  Query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { appFireStore } from "../firebase/config";

export const useCollection = (transaction: any, myQuery: any) => {
  const [documents, setDocuments] = useState<any>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const todosRef: CollectionReference = collection(appFireStore, transaction);

    let q: Query = todosRef;

    if (myQuery) {
      const [fieldName, operator, fieldValue] = myQuery;
      if (fieldValue !== undefined) {
        q = query(todosRef, where(fieldName, operator, fieldValue), orderBy("createdTime", "desc"));
      }
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
  }, [transaction, myQuery]);

  return { documents, error };
};

// import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { appFireStore } from "../firebase/config";

// export const useCollection = (transaction: any, myQuery: any) => {
//   const [documents, setDocuments] = useState<any>([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const todosRef = collection(appFireStore, transaction);
//     const q = query(todosRef, orderBy("createdTime", "desc"));

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const updatedDocuments = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setDocuments(updatedDocuments);
//         setError(null);
//       },
//       (err: any) => {
//         setError(err.message);
//       }
//     );

//     return unsubscribe;
//   }, [transaction]);

//   return { documents, error };
// };
