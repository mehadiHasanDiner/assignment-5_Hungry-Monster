const searchBtn = document.getElementById('search-button');
searchBtn.addEventListener('click', getMealList);

const mealList = document.getElementById('meal');
mealList.addEventListener('click', getMealDetails);

const mealContent = document.querySelector('.meal-details-content');

// get meal list of food menu
function getMealList(){
    let searchInputTxt = document.getElementById('search-txt').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-list" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-menu">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">View Meal</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notMatch');
        } else{
            html = "Sorry, nothing match with the meal name!";
            mealList.classList.add('notMatch');
        }

        mealList.innerHTML = html;
    });
}

// get recipe of the meal
function getMealDetails(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipe(data.meals));
    }
}

function mealRecipe(meal){
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
    <div class = "recipe-meal-img">
        <img src = "${meal.strMealThumb}" alt = "">
    </div>
        <div class = "recipe-instruct">
            <h3>Ingredient</h3>
            <ul><ul>
            <li>${meal.strIngredient1}</li>
            <li>${meal.strIngredient2}</li>
            <li>${meal.strIngredient3}</li>
            <li>${meal.strIngredient4}</li>
            <li>${meal.strIngredient5}</li>
            </ul></ul>
        </div>
    `;
    mealContent.innerHTML = html;
    mealContent.parentElement.classList.add('showMenu');
}