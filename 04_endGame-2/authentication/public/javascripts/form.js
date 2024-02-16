
const loginLink = document.getElementById('loginChange')
const registerLink = document.getElementById('registerChange')
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');


loginLink.addEventListener('click', function () {
    loginForm.classList.remove('form-hidden');
    registerForm.classList.add('form-hidden');
    
  // Add logic to switch to the login form or perform other actions
});

registerLink.addEventListener('click', function () {
    // loginForm.style.display = "none"
    // registerForm.style.display = "block"
    loginForm.classList.add('form-hidden');
    registerForm.classList.remove('form-hidden');
  // Add logic to switch to the register form or perform other actions
});