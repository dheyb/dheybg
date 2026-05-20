
// login and register transition 

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

// register

var email = document.getElementById('email');
var pw = document.getElementById('pw');

 

function store() {
    localStorage.setItem('email', email.value);
    localStorage.setItem('pw', pw.value);
    window.location.href="sign-in.html"
}



function check() {

     // login 
   
    var storedMail = localStorage.getItem('email');
    var storedPw = localStorage.getItem('pw');

    
   
   
    var userMail = document.getElementById('userMail');
    var userPw = document.getElementById('userPw');

   
    if(userMail.value !== storedMail || userPw.value !== storedPw) {
        alert('login failed');
    }else {
        window.location.href="product.html"
    }
}
 
 