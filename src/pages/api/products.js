import { firestore } from "../../firebase";
import firebase from "firebase";

export default async (req, res) => {
  try {
    const {
      query: { id },
    } = req;
    if (!req.query.id) {
      return res.json([]);
    }

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
  } catch (error) {
    res.json({ error });
  }
};
