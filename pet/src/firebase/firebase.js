// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBXcIqpaIgzneSgRW0UgIdGIEj10wgILQE',
  authDomain: 'finalprojex.firebaseapp.com',
  projectId: 'finalprojex',
  storageBucket: 'finalprojex.appspot.com',
  messagingSenderId: '807311215394',
  appId: '1:807311215394:web:f77519debc024a9e12337b',
  measurementId: 'G-1QHRJHEHS1',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
