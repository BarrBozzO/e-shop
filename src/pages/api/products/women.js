import { firestore } from "../../../firebase";
import firebase from "firebase";

const PAGE_SIZE = 20;

export default async (req, res) => {
  try {
    const {
      query: { id, cursor },
    } = req;

    if (!req.query.id) {
      // debugger;
      let query = firestore.collection("products").where("sex", "==","female").where("age", "==","adult").orderBy(firebase.firestore.FieldPath.documentId()).limit(PAGE_SIZE);

      if (cursor) {
        query = query.startAfter(cursor); // prev doc.id
      }

      const snapshot = await query.get();

      const data = snapshot.docs.map((product) => ({
        id: product.id,
        data: product.data(),
      }));

      res.json({ data, cursor: data[data.length - 1].id });
    } else {
      const ids = Array.isArray(id) ? id : [id];

      const snapshot = await firestore
        .collection("products")
        .where(firebase.firestore.FieldPath.documentId(), "in", ids)
        .get();
  
      const data = snapshot.docs.map((product) => ({
        id: product.id,
        data: product.data(),
      }));
  
      res.json(data);
    }
  } catch (error) {
    res.json({ error: error.toString() });
  }
};
