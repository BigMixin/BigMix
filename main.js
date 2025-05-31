document.getElementById('findRecipes').addEventListener('click', async () => {
  const ingredientList = document.querySelectorAll('#ingredientList li');
  const userIngredients = Array.from(ingredientList).map(li => li.textContent.trim());

  console.log("User ingredients:", userIngredients); // Debugging output

  const recipes = await fetchRecipes(); // Fetch recipes from Google Sheets
  console.log("Fetched recipes:", recipes); // Debugging output

  const matchedRecipes = matchRecipes(userIngredients, recipes); // Match user ingredients
  console.log("Matched recipes:", matchedRecipes); //  Debugging output

  displayRecipes(matchedRecipes); // Display results
});