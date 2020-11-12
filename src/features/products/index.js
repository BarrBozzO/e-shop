import { firestore } from "../../firebase";
import ListComponent from "./List";
import FilterComponent from "./Filter";

export const fetchProducts = async () => {
  const snapshot = await firestore.collection("products").get();

  return await snapshot.docs.map((product) => ({
    id: product.id,
    data: product.data(),
  }));
};

export const List = ListComponent;
export const Filter = FilterComponent;
