function displayRecipes(recipes) {
  const recipeResults = document.getElementById('recipeResults');
  recipeResults.innerHTML = '';

  if (recipes.length > 0) {
    recipes.forEach(recipe => {
      const recipeElement = document.createElement('div');
      recipeElement.classList.add('recipe-card');

      recipeElement.innerHTML = `
        <h3>${recipe.name}</h3>
        <p><strong>Garnish:</strong> ${recipe.garnish || 'None'}</p>
        <p><strong>Misc & Notes:</strong> ${recipe.misc || 'No notes'}</p>
        <ul>
          ${recipe.ingredients.map(ingredient => `
            <li>${ingredient.name}: ${ingredient.quantity}</li>
          `).join('')}
        </ul>
      `;
      recipeResults.appendChild(recipeElement);
    });
  } else {
    recipeResults.textContent = 'No recipes match your ingredients.';
  }
}