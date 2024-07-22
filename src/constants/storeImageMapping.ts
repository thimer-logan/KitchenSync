import { Store } from "@/types/shopping-list";

const storeImageMapping: { [key: string]: string } = {
  sobeys: "/images/sobeys.svg",
  superstore: "/images/superstore.svg",
  walmart: "/images/walmart.svg",
  costco: "/images/costco.svg",
  nofrills: "/images/nofrills.svg",
};

export const stores: Store[] = [
  {
    id: "1",
    name: "Sobeys",
    image: storeImageMapping.sobeys,
  },
  {
    id: "2",
    name: "Superstore",
    image: storeImageMapping.superstore,
  },
  {
    id: "3",
    name: "Walmart",
    image: storeImageMapping.walmart,
  },
  {
    id: "4",
    name: "Costco",
    image: storeImageMapping.costco,
  },
  {
    id: "5",
    name: "No Frills",
    image: storeImageMapping.nofrills,
  },
];
