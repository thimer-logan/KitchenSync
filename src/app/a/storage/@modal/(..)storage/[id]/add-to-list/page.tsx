import AddToShoppingListModal from "@/components/shopping-list/AddToShoppingListModal";
import React from "react";

export default function AddToListModal({ params }: { params: { id: string } }) {
  return <AddToShoppingListModal id={params.id} />;
}
