document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('addIngredient').addEventListener('click', () => {
    const ingredientDropdown = document.getElementById('ingredientDropdown');
    const ingredientList = document.getElementById('ingredientList');

    const selectedIngredient = ingredientDropdown.value;

    if (selectedIngredient) {
      const newIngredient = document.createElement('li');
      newIngredient.textContent = selectedIngredient;
      ingredientList.appendChild(newIngredient);
    }
  });
});