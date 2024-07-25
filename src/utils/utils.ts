import { Recipe } from "@/types/recipe";
import { ShoppingListItem } from "@/types/shopping-list";
import { StorageItem } from "@/types/storage";

export function groupShoppingListItemsByStorageItem(
  shoppingListItems: ShoppingListItem[]
): Record<string, ShoppingListItem[]> {
  const groupedItems: Record<string, ShoppingListItem[]> = {};

  shoppingListItems.forEach((item) => {
    if (!groupedItems[item.storageItem.id]) {
      groupedItems[item.storageItem.id] = [];
    }

    groupedItems[item.storageItem.id].push(item);
  });

  return groupedItems;
}

export function getAverageQuantityBought(
  shoppingListItems: ShoppingListItem[]
): number {
  const totalQuantity = shoppingListItems.reduce(
    (acc, item) => acc + item.quantityPurchased,
    0
  );
  return totalQuantity / shoppingListItems.length;
}

export function getIngredientsRequiredFromRecipes(
  recipes: Recipe[],
  storageItems: StorageItem[]
): ShoppingListItem[] {
  const requiredItems: { [key: string]: ShoppingListItem } = {};

  // Aggregate required ingredients from all recipes
  // recipes.forEach(recipe => {
  //   recipe.ingredients.forEach(ingredient => {
  //     if (!requiredItems[ingredient.item]) {
  //       requiredItems[ingredient.item] = { ...ingredient };
  //     } else {
  //       requiredItems[ingredient.item].quantity += ingredient.quantity;
  //     }
  //   });
  // });

  // Subtract inventory quantities from required items
  // inventory.forEach(inventoryItem => {
  //   if (requiredItems[inventoryItem.item]) {
  //     requiredItems[inventoryItem.item].quantity -= inventoryItem.quantity;
  //     if (requiredItems[inventoryItem.item].quantity <= 0) {
  //       delete requiredItems[inventoryItem.item];
  //     }
  //   }
  // });

  // Convert to array format
  return Object.values(requiredItems);
}
