export enum Units {
  Grams = "g",
  Kilograms = "kg",
  Milligrams = "mg",
  Liters = "l",
  Milliliters = "ml",
  Cups = "cup",
  Tablespoons = "tbsp",
  Teaspoons = "tsp",
  Pounds = "lb",
  Ounces = "oz",
  FluidOunces = "fl oz",
  Pints = "pt",
  Quarts = "qt",
  Gallons = "gal",
  Pinch = "pinch",
  Bunch = "bunch",
  Slices = "slice",
  Pieces = "pcs",
  Packs = "pack",
  Jars = "jar",
  Bottles = "bottle",
  Cans = "can",
  Boxes = "box",
  Bags = "bag",
}

export type StorageItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  unit: Units;
  brand?: string;
  created_at?: string;
};
