import firebase from 'firebase/app';
import { FIREBASE_CONFIG, authURL, baseURL } from './api-config';
import { setToken, getToken } from './ls-handlers';

export const initApi = async () => {
    firebase.initializeApp(FIREBASE_CONFIG);
};

export const signIn = (email, password) => {
    return fetch(authURL, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        })
    }).then( response => response.json());
};

export const createUser = async (email, password, nickname, birth, gender) => {
    const user = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => console.log('response', response))

    await fetch(`${baseURL}/user.json`, {
        method: 'POST',
        headers: {
            'Content_Type' : "application/json"
        },
        body: JSON.stringify({ email, nickname, birth, gender} )
    })
    .then(res => res.json())
    .then( result => console.log(result))

    await signIn(email, password).then(({idToken}) => {
        if(idToken) {
            setToken(idToken);
            window.location.href = '/';
        }else alert ('Invalid credentals...')
    });
   
};