import { useState, useEffect, useRef } from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

/* 
  Expected Arguments:
  c - collection name
  q - query array

  Expected usage:
  const { documents } = useCollection('rooms', ['members', 'array-contains', authUser.uid])
*/

export const useCollection = (c, _q) => {
  const [documents, setDocuments] = useState(null);

  // The reference won't trigger a useEffect inifinte loop
  const q = useRef(_q).current;

  useEffect(() => {
    let ref = collection(db, c);
    if (q) {
      ref = query(ref, where(...q));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(results);
    });

    return () => unsub();
  }, [c, q]);

  return { documents };
};
