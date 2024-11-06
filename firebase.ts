import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzfRQKguyYmvfVvoyursm7Ie7LqZ6ReRU",
  authDomain: "fcm-test-3257c.firebaseapp.com",
  projectId: "fcm-test-3257c",
  storageBucket: "fcm-test-3257c.appspot.com",
  messagingSenderId: "487281548554",
  appId: "1:487281548554:web:740605a122fd831680aef3",
  measurementId: "G-HT8D1H3M0V",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
