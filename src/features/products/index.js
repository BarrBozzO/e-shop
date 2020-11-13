import { firestore } from "../../firebase";
import ListComponent from "./List";
import FilterComponent from "./Filter";

export const fetchProducts = async ({ sex, age }) => {
  let query = firestore.collection("products");

  if (sex) {
    query = query.where("sex", "==", sex);
  }

  if (age) {
    query = query.where("age", "==", age);
  }

  const snapshot = await query.get();

  return await snapshot.docs.map((product) => ({
    id: product.id,
    data: product.data(),
  }));
};

export const List = ListComponent;
export const Filter = FilterComponent;
