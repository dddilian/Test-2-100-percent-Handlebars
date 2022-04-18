(function () {
    //Compile all partials that will be used int the templates

    let headerTemplate = Handlebars.compile(document.getElementById("header-template").innerHTML);
    let recepieTemplate = Handlebars.compile(document.getElementById("recepie-template").innerHTML);
    let ingredientTemplate = Handlebars.compile(document.getElementById("ingredient-template").innerHTML);
    let searchDivTemplate = Handlebars.compile(document.getElementById("searchDiv-template").innerHTML);

    //Register all partials that will be used in the templates
    Handlebars.registerPartial("header", headerTemplate);
    Handlebars.registerPartial("recepie", recepieTemplate);
    Handlebars.registerPartial("ingredient", ingredientTemplate);
    Handlebars.registerPartial("searchDiv", searchDivTemplate);

    //Main listeners
    window.addEventListener("load", router);
    window.addEventListener("hashchange", router);

    //при първоначално зареждане, когато hash реално ни е празен стринг ''
    if (location.hash == '') {
        location.hash = "#allRecepies";
    }

})();

//!Invoke the function (може да се ползва и IIFE)
// registerPartials();


//!Create new recepie
function onCreateRecepieSubmit(e) {
    e.preventDefault();

    let formData = new FormData(document.forms.createRecepieFrom);

    let newRecTitle = formData.get("newRecTitle");
    let newRecLinkToSimilarRec = formData.get("newRecLinkToSimilarRec");
    let newRecIngredients = formData.get("newRecIngredients");
    let newRecImgUrl = formData.get("newRecImgUrl");

    // console.log(newRecTitle, newRecLinkToSimilarRec, newRecIngredients, newRecImgUrl);
    if (newRecTitle.trim() == "" || newRecLinkToSimilarRec.trim() == "" || newRecIngredients.trim() == "" || newRecImgUrl.trim() == "") {
        let createRecErrorP = document.getElementById("createRecErrorP");
        createRecErrorP.style.display = "block";

        setTimeout(() => {
            createRecErrorP.style.display = "none";
        }, 1500);

    } else {
        let newRec = new Recepie(newRecTitle, newRecLinkToSimilarRec, newRecIngredients, newRecImgUrl);
        recepiesManager.add(newRec);
        //redirect to allRecepies
        location.hash("#allRecepies");
    }

}

//!Login
function onLoginSubmit(e) {
    e.preventDefault();

    //console.log(document.forms.loginForm); 
    //лесен начин за взимане на формата, която ни трябва, по id="loginForm"
    let formData = new FormData(document.forms.loginForm);
    let username = formData.get("loginUsername");
    let password = formData.get("loginPassword");

    if (userStorage.existsUser(username)) { //проверяваме дали изобщо има такъв регистриран юзър

        if (userStorage.validUser(username, password)) { //после проверяваме дали паролата му е вярна

            userManager.login(username, password); //и, ако е вярна - логваме го

            location.hash = "#allRecepies";
        } else {
            loginErrorP.style.display = "block";
            return;
        }

    } else { //ако човекът не сществува, не може да се логне и трябва да се покаже error
        loginErrorP.style.display = "block";
    }

};

//!Logout
function onLogout(e) {
    e.preventDefault();
    userManager.logout();
    //redirect to logn
    location.hash = "#login";
}

//!Add to favorites or remove from favorites
function addOrRemove(e) {
    e.preventDefault();

    //Get the id of the clicked recepie
    let recepieId = e.target.dataset.id;

    //If recepie is already liked and in favorites
    if (userManager.recepieIsLiked(recepieId)) {

        //remove recepie id from user favorite recepies
        userManager.removeFromFavorites(recepieId);

        //If location is #favRecepies
        if (location.hash === "#favRecepies") {
            //remove the DOM element now
            e.target.parentElement.parentElement.remove();
        } else { //If not, just change the text content of the clicked button
            e.target.textContent = "Добави в любими";
        }

    } else { //like the recepie
        userManager.addToFavorites(recepieId);
        e.target.textContent = "Премахни от любими";
    }

};


//!Can't implement with 100% usage of Handlebars
function nameFiltering(e) {
    console.log(e);
    // let nameFilteredRecepies = recepiesManager.filterByName(e.target.value);
    // console.log(nameFilteredRecepies);
    // return nameFilteredRecepies;
}

//!Can't implement with 100% usage of Handlebars
function ingredientFiltering(e) {
    console.log(e);
    // recepiesManager.filterByIngredient();
}

//!Cook recepie
function cookRecepie(e) {
    //Get the id of the clicked recepie
    let recepieId = e.target.dataset.id;
    userManager.addToCookedRecepies(recepieId);
}