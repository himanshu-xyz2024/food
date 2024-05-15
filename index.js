let calorieNeeds;

function calculateBMR() {
  var age = parseInt(document.getElementById('age').value);
  var height = parseInt(document.getElementById('height').value);
  var weight = parseInt(document.getElementById('weight').value);
  var gender = document.getElementById('gender').value;
  var activity = parseFloat(document.getElementById('activity').value);

  var bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  calorieNeeds = parseInt((bmr * activity) / 10);
  return calorieNeeds;
}

// Calculate automatically when input changes
document.querySelectorAll('input, select').forEach(item => {
  item.addEventListener('input', () => {
    calculateBMR();
    console.log(calorieNeeds); // Logging calorieNeeds after input changes
  });
});

function calculateFood() {
  var calorieNeeds = calculateBMR();
  var allergies = document.getElementById('allergies').value;
  console.log(allergies);
  // Include diet type and allergies in the API request
  fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=3faae6d3&app_key=5c2c36e96887eff88f2646b9c904b110&nutrition-type=cooking&health=${allergies}-free&calories=${calorieNeeds}-300&category=generic-foods`)
    .then(response => response.json())
    .then(data => {
      console.log(data); 
      document.getElementById('food').innerHTML = '<h2>Food Suggestions:</h2>';
      data.hints.forEach(hint => {
        document.getElementById('food').innerHTML += '<p>' + hint.food.label + '</p>';
      });
    })
    .catch(error => console.error('Error fetching food data:', error));
}