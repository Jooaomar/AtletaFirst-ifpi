import { initializeApp } from 'firebase/app';

 // Your web app's Firebase configuration
const config = {
 // suas credenciais do firebase
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
