const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const loader = document.querySelector(".loader");
const loaderContainer = document.querySelector(".loader-container");
const loaderText = document.querySelector(".loader-text");
const waitingTime = 30000;

let food_dict = {}
let file_name = '';
let ingredient_list = [];
let recipes = '';
// Event listeners
searchBtn.addEventListener('click', searchActivated);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

function showLoader(){
    loader.style.visibility = 'visible';
    loaderContainer.style.display = 'flex';
    loaderText.style.visibility = 'visible';
}

function hideLoader(){
    loader.style.visibility = 'hidden';
    loaderContainer.style.display= 'none';
    loaderText.style.visibility = 'hidden';
}

// Get meal list that matches with the ingredients
function searchActivated(){
    function getMealListPromise(){ 
        return new Promise((resolve, reject) => {
            let searchInputTxt = document.getElementById('search-input').value.trim();
            //send user input to python backend
            showLoader();
    
            $.ajax({ 
                url: '/process', 
                type: 'POST', 
                data: JSON.stringify({'data': searchInputTxt }),
                dataType: "json",
                contentType: 'application/json',
                success: function(response) { 
                    console.log("ajax successful", searchInputTxt);
    
                }, 
                error: function(error) {
                    console.log("error"); 
                    console.log(error); 
                },
                
                })
                .done(function(data) {
                    food_dict = data['result'];
                    console.log(food_dict);
                    resolve();
    
            }); 
        });
    
    };
    
    getMealListPromise()
    .catch((error) => {console.log(error)})
    .then(() => {
        let html = "";
        console.log("first part of promise.then");
            
            for (const key in food_dict) {
                console.log("Food dict key", food_dict[key]);
                html += `
                <div class="meal-item" id="${key}"">
                    <div class="meal-img">
                        <img src="${food_dict[key][food_dict[key].length - 1]}" width="256" height="256" alt="food">
                    </div>
                    <div class="meal-name">
                        <h3>${key}</h3>
                        <button class="recipe-btn">Get Ingredients</button>
                    </div>
                </div>`;
            };
            displayResultText = document.querySelector('#display-result');
            displayResultText.style.display = 'block';
    
    
            html += `
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Modal Title</h2>
                    <p></p>
                </div>
            </div>`
            mealList.innerHTML = html;
            console.log("html added");
            const modal = document.getElementById('myModal');
            const closeBtn = document.querySelector('.close');
    
    
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
            
            // Close the modal if the user clicks outside of it
            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
    
            let recipe_buttons = document.querySelectorAll('.recipe-btn');
            hideLoader();

            recipe_buttons.forEach((button) => {
            button.addEventListener('click', () => {
                modal.style.display = 'block';
                const mealName = button.parentElement.parentElement.querySelector('.meal-name h3').innerHTML;
                console.log("trying to log mealName", mealName);
                let modal_heading = document.querySelector(".modal-content h2");
                let modal_p = document.querySelector(".modal-content p");
                modal_heading.innerHTML = mealName;
                modal_p.innerHTML = "";
                modal_p.innerHTML += "<ul class='ingredient-ul'>";
                
                
                console.log(food_dict[mealName]);

                for (let i = 0; i < food_dict[mealName].length - 1; i ++){
                    modal_p.innerHTML += `
                    <li>
                        <a target="_blank" href="https://www.walmart.com/search?q=${food_dict[mealName][i].replace(/\s/g, '')}">${food_dict[mealName][i]}</a></li>`;
                }

                modal_p.innerHTML += "</ul>";
                
                modal_p.innerHTML += `<button class="recipe-btn" onclick="getRecipes('${mealName}')">Get Recipe</button>`;
                modal_p.innerHTML += `<div class="loading-message">mAi Fridge is generating your recipe...<span class="dots"></span></div>`;




            })});
    });
};
function displayFileName() {
    const fileInput = document.getElementById('photoInput');
    const fileNameSpan = document.querySelector('.selected-file-name');
    fileNameSpan.textContent = fileInput.files[0] ? fileInput.files[0].name : '';
}


function uploadPhoto() {
    var formData = new FormData(document.getElementById('uploadForm'));

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerHTML = data.message;
        file_name = data.filename;

        sendPhoto(file_name);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    async function sendPhoto(filepath) {
        let promise = new Promise((resolve, reject) => {

            $.ajax({ 
                url: '/detect', 
                type: 'POST', 
                data: JSON.stringify({'data': filepath}),
                dataType: 'json',
                contentType:'application/json',
                // contentType: 'application/json',
                success: function(response) { 
                    console.log("ajax for filename successful");
    
                }, 
                error: function(error) {
                    console.log("error"); 
                    console.log(error); 
                }
                
                })
                .done(function(data) {
                    console.log(data);
                    resolve(data);
            });
        })
        ingredient_list = await promise;
        document.getElementById('result').innerHTML = "<h3 class='ingredient-identified-h3'>Ingredients identified in your Fridge: </h3>";
        html = "<ul class='ingredient-ul'>";

        
        ingredient_list.forEach((ingredient, index) => {html += `<li>
        <input type="checkbox" class="ingredient-checkbox" id="ingredient${index + 1}">
        <label class="ingredient-label" for="ingredient${index + 1}">${ingredient}</label>
        </li>`});
        html += `<button class="action-button" onclick="getSelectedIngredients()">Find recipe for selected ingredients</button>`
        document.getElementById('result').innerHTML += html;
      }
}

function displayUploadBtn(){
    setTimeout(()=>{
        let uploadbtn = document.querySelector(".upload-button");
    uploadbtn.style.visibility = 'visible';
    }, 2000);
    
}

function getSelectedIngredients() {
    const checkboxes = document.querySelectorAll('.ingredient-ul input[type="checkbox"]:checked');
    const selectedIngredients = Array.from(checkboxes).map(checkbox => checkbox.nextElementSibling.innerText);
    let ingredients_string = selectedIngredients.join(', '); 
    let searchTxt = document.querySelector('#search-input');
    searchTxt.value = ingredients_string;
    searchActivated();

    console.log('Selected Ingredients:', selectedIngredients);
    // You can further process or use the selected ingredients as needed
}
function getRecipes(mealname) {
    let ingredient_list = food_dict[mealname].slice(0, -1);
    let loadingMessage = document.querySelector('.loading-message');

    // Show the loading message before making the AJAX call
    loadingMessage.style.display = 'block';

    async function generateRecipes(mealname, ingredient_list) {
        let ingredient_list_str = ingredient_list.join(", ");

        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/generateRecipes',
                type: 'POST',
                data: JSON.stringify({'mealname': mealname, 'ingredient_list': ingredient_list_str}),
                dataType: 'json',
                contentType: 'application/json',
                success: function(response) {
                    console.log("Ajax for getRecipes successful", response);
                    resolve(response); // Resolve with the response data
                },
                error: function(error) {
                    console.log("Error in getRecipes Ajax", error);
                    reject(error); // Reject with the error
                },
                complete: function() {
                    // Hide the loading message when the AJAX call is complete
                    loadingMessage.style.display = 'none';
                }
            });
        });
    }

    generateRecipes(mealname, ingredient_list)
    .then((response) => {
        // Process the response and update the UI
        let recipe = response.recipe;
        let modal_p = document.querySelector(".modal-content p");
        let recipe_bulletpoint = recipe.split("*");

        for (let i = 0; i < recipe_bulletpoint.length; i++){
            if (recipe_bulletpoint[i]){
                modal_p.innerHTML += `<p><b>${i + 1}.</b> ${recipe_bulletpoint[i]}</p>`;
            }
            else{
                i -= 1;
            }
        }
    })
    .catch((error) => {
        console.error("Error in getRecipes", error);
    });
}
