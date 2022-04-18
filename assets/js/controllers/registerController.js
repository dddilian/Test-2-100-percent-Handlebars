
// //hide error p
// registerErrorP.style.display = 'none';

// //register form inputs
// let usernameRegisterInput = document.getElementById("registerUsername");
// let passwordRegisterInput = document.getElementById("regPassword1");
// let rePasswordRegisterInput = document.getElementById("regPassword2");




// //event-ите в текущия контролер:
// //register event
// registerBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     registerErrorP.style.display = 'none';

//     let username = usernameRegisterInput.value.trim();
//     let password = passwordRegisterInput.value.trim();
//     let rePassword = rePasswordRegisterInput.value.trim();

//     if (username.trim() === "") {
//         registerErrorP.innerText = "Username can't be blank!";
//         registerErrorP.style.display = 'block';
//     } else if (password !== rePassword || password.trim() == "" || rePassword.trim() == "") { //ако паролите не са еднакви - error за различни пароли
//         registerErrorP.innerText = "Passwords don't match and can't be blank!";
//         registerErrorP.style.display = 'block';
//     } else if (userStorage.existsUser(usernameRegisterInput.value)) { //ако съществува такъв юзър - error за existing user
//         registerErrorP.innerText = "User already exists";
//         registerErrorP.style.display = 'block';
//     } else { //ако не съществува такъв юзър - ще го създадем
//         userStorage.addUser(username, password);
//         registerErrorP.style.display = 'none';
//     }

// });

// //2.go to login page event
// allGoToLoginButtons.forEach(btn => {

//     btn.addEventListener('click', (e) => {
//         e.preventDefault(); // винаги при SPA приложение preventDefault() за клик евента на събмит бутона във форма

//         //скриваме Register страницата
//         // register.style.display = "none";
//         //показваме Login страницата
//         // login.style.display = "flex";

//         //зачистваме ипутите
//         usernameRegisterInput.value = "";
//         passwordRegisterInput.value = "";
//         rePasswordRegisterInput.value = "";
//         registerErrorP.style.display = 'none';
//         location.hash = "#login"
//     });

// })