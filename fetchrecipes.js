async function fetchRecipes() {
  const sheetId = '1O_dAdxwY0coWtxj2GxUqAUBj3WBze_nKtqCmRNTVBfk'; // Replace with actual Sheet ID
  const apiKey = 'AIzaSyDhKe9FOct_MYUIAVK_YmNBUPD7HP0uqPw'; // Replace with actual API Key
  const range = 'Recipes'; // Adjust if needed

  try {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`);
    const data = await response.json();

    console.log("Fetched Recipe Data:", data); // Debugging log

    if (!data.values) {
      console.error('No data found in the spreadsheet.');
      return [];
    }

    const rows = data.values;
    const headers = rows[0]; // First row contains column names

    return rows.slice(1).map(row => {
      // Extract columns: Id, Name, Garnish, Misc & Notes
      const recipeId = row[0];
      const recipeName = row[1];
      const garnish = row[2] || 'None';
      const miscNotes = row[3] || 'No notes';

      // Extract ingredient data (ignoring first four columns)
      const ingredients = headers.slice(4).map((ingredient, index) => ({
        name: ingredient.trim().toLowerCase(), // Normalize formatting
        quantity: row[index + 4] || '0' // Default if no value
      }));

      return { id: recipeId, name: recipeName, garnish, misc: miscNotes, ingredients };
    });

  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

// Fetch ingredients for dropdown
async function fetchIngredients() {
  const sheetId = '1O_dAdxwY0coWtxj2GxUqAUBj3WBze_nKtqCmRNTVBfk'; // Replace with actual Sheet ID
  const apiKey = 'AIzaSyDhKe9FOct_MYUIAVK_YmNBUPD7HP0uqPw'; // Replace with actual API Key
  const range = 'Recipes'; // Adjust if needed

  try {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`);
    const data = await response.json();

    console.log("Fetched Ingredient Data:", data); // Debugging log

    if (!data.values) {
      console.error('No ingredient data found.');
      return [];
    }

    // Extract ingredient column headers (ignoring first four columns)
    const ingredientNames = data.values[0].slice(4).map(name => name.trim().toLowerCase());
    console.log("Extracted Ingredients:", ingredientNames); // Debugging log

    return ingredientNames;

  } catch (error) {
    console.error('Error fetching ingredients:', error);
    return [];
  }
}

// Populate ingredient dropdown dynamically
async function populateDropdown() {
  const ingredientDropdown = document.getElementById('ingredientDropdown');
  const ingredients = await fetchIngredients();

  console.log("Dropdown Ingredients:", ingredients); // Debugging log

  // Clear existing options (excluding default)
  ingredientDropdown.innerHTML = '<option value="" disabled selected>Select an ingredient</option>';

  // Populate dropdown with ingredients from the sheet
  ingredients.forEach(ingredient => {
    const option = document.createElement('option');
    option.value = ingredient;
    option.textContent = ingredient;
    ingredientDropdown.appendChild(option);
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', populateDropdown);