export type ShoppingListItem = {
  id: string;
  created_at: string;
  quantityPurchased: number;
  isPurchased: boolean;
  shoppingListId: string;
  storageItemId: string;
};

export type ShoppingList = {
  id: string;
  created_at: string;
  name: string;
  items: ShoppingListItem[];
  store?: string;
};
