function matchRecipes(userIngredients, recipes) {
  return recipes.filter(recipe => {
    // Extract only ingredient names, ignoring blank/null/"0" values
    const recipeIngredientNames = recipe.ingredients
      .filter(item => item.quantity && item.quantity.trim() !== "0" && item.quantity.trim() !== "")
      .map(item => item.name.toLowerCase().trim());

    const userIngredientsFormatted = userIngredients.map(ingredient => ingredient.toLowerCase().trim());

    console.log(`Checking recipe: ${recipe.name}`);
    console.log("Filtered Recipe Ingredients:", recipeIngredientNames);
    console.log("User Ingredients:", userIngredientsFormatted);

    // If the recipe has NO valid ingredients, skip it
    if (recipeIngredientNames.length === 0) {
      console.log(`Skipping recipe: ${recipe.name} (no valid ingredients)`);
      return false;
    }

    // Ensure the user has ALL ingredients required for the recipe
    const userHasAllIngredients = recipeIngredientNames.every(recipeIngredient =>
      userIngredientsFormatted.includes(recipeIngredient)
    );

    console.log(`Recipe ${recipe.name} match status: ${userHasAllIngredients}`);

    return userHasAllIngredients;
  });
}