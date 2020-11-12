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

export const fetchProduct = async (id) => {
  const snapshot = await firestore.doc(`products/${id}`).get();
  const product = await snapshot.data();

  return {
    id: snapshot.id,
    ...product,
  };
};

export const List = ListComponent;
export const Filter = FilterComponent;
