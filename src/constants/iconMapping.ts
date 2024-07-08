import {
  FaApple,
  FaBreadSlice,
  FaCarrot,
  FaCheese,
  FaEgg,
  FaFish,
  FaIceCream,
  FaLemon,
  FaPizzaSlice,
} from "react-icons/fa";
import { GiBroccoli } from "react-icons/gi";
import {
  MdLocalCafe,
  MdLocalDrink,
  MdLocalDining,
  MdFastfood,
  MdRestaurant,
  MdKitchen,
} from "react-icons/md";

const storageIconMapping: { [key: string]: React.ElementType } = {
  // Vegetables
  broccoli: GiBroccoli,
  lettuce: MdLocalDining,
  spinach: MdLocalDining,
  kale: MdLocalDining,
  carrot: FaCarrot,
  potato: MdLocalDining,
  tomato: MdLocalDining,
  cucumber: MdLocalDining,
  onion: MdLocalDining,
  garlic: MdLocalDining,
  pepper: MdFastfood,

  // Fruits
  apple: FaApple,
  banana: MdLocalDining,
  orange: FaLemon,
  lemon: FaLemon,
  strawberry: MdLocalDining,
  blueberry: MdLocalDining,
  grape: MdLocalDining,
  watermelon: MdLocalDining,
  pineapple: MdLocalDining,

  // Protein
  chicken: MdLocalDining,
  beef: MdLocalDining,
  pork: MdLocalDining,
  fish: FaFish,
  egg: FaEgg,
  tofu: MdLocalDining,

  // Dairy
  milk: MdLocalCafe,
  cheese: FaCheese,
  butter: MdLocalDining,
  yogurt: MdLocalDining,
  icecream: FaIceCream,

  // Grains and Breads
  rice: MdLocalDining,
  bread: FaBreadSlice,
  pasta: MdLocalDining,
  flour: MdLocalDining,
  cereal: MdLocalDining,

  // Beverages
  water: MdLocalDrink,
  juice: MdLocalDrink,
  coffee: MdLocalCafe,
  tea: MdLocalCafe,
  beer: MdLocalDrink,
  wine: MdLocalDrink,
  liquor: MdLocalDrink,

  // Snacks and Sweets
  chocolate: MdLocalDining,
  candy: MdLocalDining,
  chips: MdFastfood,
  cookies: MdLocalDining,
  cake: FaIceCream,
  muffin: MdLocalDining,
  pastry: MdLocalDining,

  // Miscellaneous
  spice: MdLocalDining,
  herb: MdLocalDining,
  salt: MdLocalDining,
  sugar: MdLocalDining,
  oil: MdLocalDining,
  vinegar: MdLocalDining,
  honey: MdLocalDining,
  jam: MdLocalDining,

  // General Food Categories
  meal: MdLocalDining,
  dessert: FaIceCream,
  drink: MdLocalDrink,
  groceries: MdKitchen,
  brunch: MdRestaurant,
  lunch: MdRestaurant,
  dinner: MdRestaurant,
  takeout: MdFastfood,
  ramen: MdLocalDining,
  soup: MdLocalDining,
  bbq: MdLocalDining,
  kitchen: MdKitchen,
  restaurant: MdRestaurant,

  // Default
  default: MdLocalDining,
};

export default storageIconMapping;
