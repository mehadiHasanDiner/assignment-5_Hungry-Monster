const searchBtn = document.getElementById('search-button');
searchBtn.addEventListener('click', getMealList);

const mealList = document.getElementById('meal');

// get meal list of food menu
function getMealList(){
    let searchInputTxt = document.getElementById('search-txt').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let mealRecipes = "";
        if(data.meals){
            data.meals.forEach(meal => {
                mealRecipes += `
                    <div class = "meal-list" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img onclick = "getMealDetails(${meal.idMeal})" src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-menu">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notMatch');
        } else{
            mealRecipes = "Sorry, nothing match with the meal name!";
            mealList.classList.add('notMatch');
        }

        mealList.innerHTML = mealRecipes;
    });
document.getElementById('search-txt').value="";

}

// get meal details by meal id
const getMealDetails = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => mealDetailsInfo(data.meals[0]));
}

const mealDetailsInfo = mealName => {
    const mealDetailsDiv = document.getElementById('meal-details-content');
    mealDetailsDiv.innerHTML = `
            <h2 class="recipe-title">${mealName.strMeal}</h2>
        <div class="recipe-meal-img">
            <img src="${mealName.strMealThumb}" alt="">
        </div>
            <div class="recipe-instruct">
                <h3>Ingredient</h3>
                <ul><ul>
                <li>${mealName.strIngredient1}</li>                
                <li>${mealName.strIngredient2}</li>                
                <li>${mealName.strIngredient3}</li>                
                <li>${mealName.strIngredient4}</li>                
                <li>${mealName.strIngredient5}</li>                
                <li>${mealName.strIngredient6}</li>                
                </ul></ul>
            </div>
    `;
    
}