import { StorageItem } from "./storage";

export type ShoppingListItem = {
  id: string;
  created_at: string;
  quantityPurchased: number;
  isPurchased: boolean;
  shoppingListId: string;
  storageItem: StorageItem;
};

export type ShoppingList = {
  id: string;
  created_at: string;
  name: string;
  items: ShoppingListItem[];
  completed: boolean;
  store?: string;
};

export type Store = {
  id: string;
  name: string;
  image: string;
};
