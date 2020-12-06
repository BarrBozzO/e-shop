import { firestore } from '../../firebase';
import firebase from 'firebase';

export default async (req, res) => {
    try {
        const { body } = req;
        const { details, products } = body;

        if (!details) throw new Error('Details required!');
        else {
            if (!details.email) throw new Error('Email required!');
            if (!details.first) throw new Error('First Name required!');
            if (!details.last) throw new Error('Last Name required!');
            if (!details.zip) throw new Error('Zip required!');
            if (!details.state) throw new Error('State required!');
            if (!details.city) throw new Error('City required!');
            if (!details.address) throw new Error('Address required!');
            if (!details.address) throw new Error('Address required!');
        }

        if (!Array.isArray(products) || products.length === 0)
            throw new Error('Products required!');
        else {
            products.forEach((p, index) => {
                if (!p.id)
                    throw new Error(
                        `products[${index}] - Product id required!`
                    );
                if (!p.count)
                    throw new Error(
                        `products[${index}] - Product count required!`
                    );
                if (!p.size)
                    throw new Error(
                        `products[${index}] - Product size required!`
                    );
            });
        }

        const ordersRef = firestore.collection('orders');
        const created = await ordersRef.add({
            email: details.email,
            details,
            products
        });

        res.json({
            success: true
        });
    } catch (error) {
        res.status(500);
        res.json({ error: error.toString() });
    }
};
