import { initializeApp } from 'firebase/app';

import {
  getDocs,
  getFirestore,
  collection,
  query,
  where,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBUE5b6FPtNMXn3NLqv8AoUMCt7Ww_RcR4',
  authDomain: 'crown-clothing-542d5.firebaseapp.com',
  projectId: 'crown-clothing-542d5',
  storageBucket: 'crown-clothing-542d5.appspot.com',
  messagingSenderId: '892436515973',
  appId: '1:892436515973:web:56a5759aff08d41edcedec',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const fetchShopPageEntries = async () => {
  const shopPageEntries = [];

  const querySnapshot = await getDocs(collection(db, 'inventory'));

  querySnapshot.forEach((doc) => {
    shopPageEntries.push({
      title: doc.data().title,
      items: doc.data().items.slice(0, 4),
    });
  });

  return shopPageEntries;
};

export const fetchCategorySlugProps = async (categorySlug) => {
  let categorySlugProps = {};

  const queryRef = query(
    collection(db, 'inventory'),
    where('title', '==', categorySlug)
  );

  const querySnapshot = await getDocs(queryRef);

  querySnapshot.forEach((doc) => {
    categorySlugProps = doc.data();
  });

  return categorySlugProps;
};

export const fetchCategorySlugParams = async () => {
  const querySnapshot = await getDocs(collection(db, 'inventory'));

  const categorySlugParams = querySnapshot.docs.map((doc) => ({
    categorySlug: doc.data().title,
  }));

  return categorySlugParams;
};
