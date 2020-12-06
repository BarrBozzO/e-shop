import { firestore } from '../../firebase';
import firebase from 'firebase';

export default async (req, res) => {
    try {
        const { body } = req;
        // debugger;

        // check if logged in
        const { details } = body;

        if (!details) throw new Error('');

        const ordersRef = firestore.collection('orders');
        const created = await ordersRef.add({
            details
        });

        res.json({
            success: true
        });
    } catch (error) {
        res.status(500);
        res.json({ error: error.toString() });
    }
};
