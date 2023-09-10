document.addEventListener('DOMContentLoaded', function () {
    const result = document.getElementById('main');
    const searchButton = document.getElementById('searchbutton');
    const favButton = document.getElementById('favButton');
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const favorites = [];
  
    searchButton.addEventListener('click', function () {
      let userInp = document.getElementById('user-inp').value;
  
      if (userInp.length == 0) {
        result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
      } else {
        fetch(url + userInp)
          .then((response) => response.json())
          .then((data) => {
            let myMeal = data.meals[0];
            console.log(myMeal.strInstructions);
  
            // Check if a meal was found
            if (myMeal) {
              let count = 1;
              let ingredients = [];
  
              // Extract ingredients and measures
              for (let i in myMeal) {
                let ingredient = '';
                let measure = '';
  
                if (i.startsWith('strIngredient') && myMeal[i]) {
                  ingredient = myMeal[i];
                  measure = myMeal[`strMeasure` + count];
                  count += 1;
                  ingredients.push(`${measure}, ${ingredient}`);
                }
              }
  
              // Create the HTML structure and style it
              result.innerHTML = `
                <div class="mealContainer">
                  <img src="${myMeal.strMealThumb}" alt="MealImage">
                  <div class="mealDescription" id="mealDescription">
                    <p class="FoodName">${myMeal.strMeal}</p>
                    
                    <div class="ingredientsContainer" id="ingredientsContainer">
                       
                    </div>
                    
                    <div class="footer">
                      <button class="addToFavButton" id="addToFavButton" type="button">Add to Favorites</button>
                      <button class="recipeButton" id="recipeButton" type="button">Recipe</button>
                    </div>
                  </div>
                </div>
                <div id="recipe">
                  <button id="hide-recipe">X</button>
                  <pre id="instruction">${myMeal.strInstructions}</pre>
                </div>
              `;
  
              let ingredientCon = document.getElementById('ingredientsContainer');
              let parent = document.createElement('ul');
              let recipe = document.getElementById('recipe');
              let hideRecipe = document.getElementById('hide-recipe');
              let showRecipe = document.getElementById('recipeButton');
              let addToFavButton = document.getElementById('addToFavButton');
  
              ingredients.forEach((i) => {
                let child = document.createElement('li');
                child.innerText = i;
                parent.appendChild(child);
                ingredientCon.appendChild(parent);
              });
  
              hideRecipe.addEventListener('click', () => {
                recipe.style.display = 'none';
              });
  
              showRecipe.addEventListener('click', () => {
                recipe.style.display = 'block';
              });
  
              addToFavButton.addEventListener('click', () => {
                addToFavorites(myMeal);
              });
            } else {
              // Handle the case where no meal is found
              result.innerHTML = '<h3>No meal found!</h3>';
            }
          })
          .catch((error) => {
            result.innerHTML = '<h3>Invalid Input</h3>';
          });
      }
    });
  
    favButton.addEventListener('click', () => {
      // Display the favorites view
      displayFavorites();
    });
  
    // Function to add a recipe to favorites
    function addToFavorites(recipe) {
      if (recipe) {
        if (!favorites.some((fav) => fav.idMeal === recipe.idMeal)) {
          // Add to favorites if it's not already there
          favorites.push(recipe);
          alert('Added to Favorites');
        } else {
          alert('This recipe is already in your Favorites');
        }
      }
    }
  
    // Function to display the favorites view
    function displayFavorites() {
      if (favorites.length === 0) {
        alert('Your Favorites list is empty');
      } else {
        // Create the HTML structure for the favorites view
        const favoritesView = document.createElement('div');
        favoritesView.id = 'favoritesView';
        favoritesView.innerHTML = `
          <div id="favoritesContent">
            <button id="closeFavorites">&times;</button>
            <h2>Favorites</h2>
            <div id="favoriteRecipes">
              ${favorites
                .map(
                  (fav) => `
                <div class="favoriteRecipe">
                  <img src="${fav.strMealThumb}" alt="${fav.strMeal}" />
                  <p>${fav.strMeal}</p>
                </div>`
                )
                .join('')}
            </div>
          </div>
        `;
  
        // Add the favorites view to the body
        document.body.appendChild(favoritesView);
  
        // Add a click event listener to the close button
        const closeFavorites = document.getElementById('closeFavorites');
        closeFavorites.addEventListener('click', () => {
          // Remove the favorites view
          document.body.removeChild(favoritesView);
        });
      }
    }
  });
  