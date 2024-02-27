import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKuj7PX7AKtL8yK-Urn1NEz4WXWu1pdB4",
  authDomain: "divesea-3c85a.firebaseapp.com",
  projectId: "divesea-3c85a",
  storageBucket: "divesea-3c85a.appspot.com",
  messagingSenderId: "36297357410",
  appId: "1:36297357410:web:7af01189f7bd438865b93b",
  measurementId: "G-1522PGM5CS",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
