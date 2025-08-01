document.getElementById('findRecipes').addEventListener('click', async () => {
  const ingredientList = document.querySelectorAll('#ingredientList li');

  // Extract only the ingredient name, ignoring the remove button
  const userIngredients = Array.from(ingredientList).map(li => {
    return li.firstChild.textContent.trim().toLowerCase();
  });

  console.log("User ingredients:", userIngredients); // Debugging output

  const recipes = await fetchRecipes(); // Fetch recipes from Google Sheets
  console.log("Fetched recipes:", recipes); // Debugging output

  const matchedRecipes = matchRecipes(userIngredients, recipes); // Match user ingredients
  console.log("Matched recipes:", matchedRecipes); // Debugging output

  displayRecipes(matchedRecipes); // Display results
});