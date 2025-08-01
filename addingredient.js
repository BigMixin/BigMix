document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('addIngredient').addEventListener('click', () => {
    const ingredientDropdown = document.getElementById('ingredientDropdown');
    const ingredientList = document.getElementById('ingredientList');
    const selectedIngredient = ingredientDropdown.value;

    if (!selectedIngredient) return;

    // Prevent duplicates
    const existingIngredients = Array.from(ingredientList.children).map(li => li.textContent.trim().toLowerCase());
    if (existingIngredients.includes(selectedIngredient.toLowerCase())) {
      alert("You've already added that ingredient.");
      return;
    }

    // Create new list item
    const newIngredient = document.createElement('li');
    newIngredient.textContent = selectedIngredient;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '×';
    removeBtn.setAttribute('aria-label', `Remove ${selectedIngredient}`);
    removeBtn.style.marginLeft = '8px';
    removeBtn.style.cursor = 'pointer';
    removeBtn.addEventListener('click', () => {
      ingredientList.removeChild(newIngredient);
    });

    newIngredient.appendChild(removeBtn);
    ingredientList.appendChild(newIngredient);

    // Reset dropdown
    ingredientDropdown.selectedIndex = 0;
  });
});