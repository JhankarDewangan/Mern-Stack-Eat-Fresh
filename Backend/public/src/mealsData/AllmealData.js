// Storing all possible meals at one place
let allMeals = {
  allCarbs: [
    "Rice/Roti",
    "Rice",
    "Pulao",
    "Veg Fried Rice",
    "Chicken Fried Rice",
    "Mixed Fried Rice",
  ],
  allbreakfast: [
    "upma",
    "veg sandwich",
    "idli",
    "chicken sandwich",
    "puri sabji",
    "Aloo Maratha",
    "Masala Maggi",
    "Egg Masala",
    "Chicken Maggi",
    "Masala Dosa",
    "Sambar Vada",
    "Uttapam",
    "Cheese Dosa",
    "Poha",
    "Pav Bhaji",
    "khichdi",
    "Dhokla",
    "chole Bhature",
    "chole Kulche",
    "",
  ], // Storing all possible Breakfast
  allLunch: [
    "Chicken Curry",
    "Fish Curry",
    "Kadhai Paneer",
    "Dal Makhani",
    "Dal",
    "Alu Sabji",
    "Chana Sabji",
    "Mixed Veg",
    "Navratna Korma",
    "Mutton Curry",
    "Alu Palakh",
    "Bhindi Sabji",
    "Egg Curry",
    "katla Fish",
    "Palakh Paneer",
    "Alu Mix Veg",
    "Dahi",
    "Papad",
    "Tomato Chutney",
    "Alu Matar",
    "Chole",
    "Gobi Alu",
    "Soyabean Masala",
    "Mushroom Curry",
    "Mushroom Masala",
    "Cabbage Dum Aalo",
    "Muli ki Sabji",
    "Mixed Dal",
    "Navratna Dal",
    "Fish Masla",
    "Chicken Masla",
    "Paneer Do Pyaza",
    "Dal Tadka",
    "Matar Paneer",
    "Butter Paneer",
    "Reshi Paneer",
    "Reshmi Chicken",
  ], // Storing all possible Lunch
  allDinner: [
    "Chicken Curry",
    "Fish Curry",
    "Kadhai Paneer",
    "Dal Makhani",
    "Dal",
    "Alu Sabji",
    "Chana Sabji",
    "Mixed Veg",
    "Navratna Korma",
    "Mutton Curry",
    "Alu Palakh",
    "Bhindi Sabji",
    "Egg Curry",
    "katla Fish",
    "Palakh Paneer",
    "Alu Mix Veg",
    "Dahi",
    "Papad",
    "Tomato Chutney",
    "Alu Matar",
    "Chole",
    "Gobi Alu",
    "Soyabean Masala",
    "Mushroom Curry",
    "Mushroom Masala",
    "Cabbage Dum Aalo",
    "Muli ki Sabji",
    "Mixed Dal",
    "Navratna Dal",
    "Fish Masla",
    "Chicken Masla",
    "Paneer Do Pyaza",
    "Dal Tadka",
    "Matar Paneer",
    "Butter Paneer",
    "Reshi Paneer",
    "Reshmi Chicken",
  ], // Storing all possible Dinner
};

allMeals.allbreakfast.sort();
allMeals.allDinner.sort();
allMeals.allLunch.sort();

export default allMeals;
