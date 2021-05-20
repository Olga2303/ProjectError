import { initApi, signIn, createUser } from './api-handlers';
import { setToken, getToken } from './ls-handlers';
require('firebase/auth');
import '../style/style.scss';
import '../style/sign.scss';
import '../style/colors.scss'

initApi();

window.onload = () => {

    if(
        window.location.pathname !== '/sign-in.html' &&
        window.location.pathname !== '/sign-up.html' &&
        !getToken
    ) {
        window.location.href = 'sign-in.html'
    };
    
    if (window.location.pathname === '/sign-in.html') {
        const form = document.getElementById('form');

        form.addEventListener('submit', event => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            signIn(email, password).then( ({idToken} ) => {
                if (idToken) {
                    setToken(idToken);
                    window.location.href = '/'

                } else alert('Invalid email or password')
            });
        });
    }
    if (window.location.pathname === 'sign-up.html') {

        const form = document.getElementById('form');
        form.addEventListener ('submit', event => {
            event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const nickname = document.getElementById('nickname').value;
        const birth = document.getElementById('birth').value;
        const male = document.getElementById('male');
        const gender = male.checked ? 'male' : 'female'; 

        createUser(email, password, nickname, birth, gender)

        })
    }
};

const img = document.querySelectorAll('img');
setInterval(function() {
	
    [img[0].src, img[1].src, img[2].src, img[3].src] = 
    [img[1].src, img[2].src, img[3].src, img[0].src];
  
	
}, 3000);
