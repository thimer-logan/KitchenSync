export type ShoppingListItem = {
  ingredientId: string;
  quantityNeeded: number;
  quantityPurchased: number;
  isPurchased: boolean;
  unit: string;
};

export type ShoppingList = {
  id: string;
  dateCreated: string;
  items: ShoppingListItem[];
};
