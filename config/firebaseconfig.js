import { initializeApp } from 'firebase/app';

 // Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyADGR2d4q_9pBP1jPrFC3Dh0d0gNxBoy0k",
  authDomain: "atletaone-19bcb.firebaseapp.com",
  projectId: "atletaone-19bcb",
  storageBucket: "atletaone-19bcb.appspot.com",
  messagingSenderId: "971902937347",
  appId: "1:971902937347:web:098e56eb6ef9a0664fe136"
};
  
// Initialize Firebase

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}