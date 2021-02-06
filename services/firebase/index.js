import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
	apiKey: 'AIzaSyAarNxo3DgdRBcGmXCqBkZCH59v20OOgnQ',
	authDomain: 'playbook-2061c.firebaseapp.com',
	databaseURL: 'https://playbook-2061c.firebaseio.com',
	projectId: 'playbook-2061c',
	storageBucket: 'playbook-2061c.appspot.com',
	messagingSenderId: '52368741283',
	appId: '1:52368741283:web:2dc3ed8ba9efbfa9df4016',
};

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

const auth = firebase.auth();
const database = firebase.firestore();

export { auth, firebase, database };
