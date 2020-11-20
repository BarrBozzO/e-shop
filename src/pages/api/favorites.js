import { firestore } from "../../firebase";
import firebase from "firebase";

export default async (req, res) => {
  try {
    if (!req.query.id) {
      return res.json([]);
    }

    const snapshot = await firestore
      .collection("products")
      .where(firebase.firestore.FieldPath.documentId(), "in", [...req.query.id])
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
