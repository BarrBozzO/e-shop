const admin = require('firebase-admin');

if (!admin.apps.length) {
    admin.initializeApp({
        name: '',
        credential: admin.credential.cert(
            JSON.parse(process.env.FIREBASE_CONFIG)
        ),
        databaseURL: 'https://e-shop-11.firebaseio.com'
    });
}

export default async (req, res) => {
    try {
        const { email } = await admin
            .auth()
            .verifyIdToken(req.headers.authorization);

        const snapshot = await admin
            .firestore()
            .collection('orders')
            .where('email', '==', email)
            .limit(100)
            .get();

        const productsIds = [];
        let orders = snapshot.docs.map((order) => {
            const data = order.data();

            data.products.forEach((product) => {
                productsIds.push(product.id);
            });

            return {
                id: order.id,
                ...data,
                datetime: data.datetime ? data.datetime.toMillis() : null
            };
        });

        if (!orders.length) {
            res.json({
                data: [],
                error: null
            });
        }

        const snapshotProducts = await admin
            .firestore()
            .collection('products')
            .where(admin.firestore.FieldPath.documentId(), 'in', productsIds)
            .get();

        const productsMap = snapshotProducts.docs.reduce((map, product) => {
            map[product.id] = {
                ...product.data()
            };
            return map;
        }, {});

        res.json({
            data: { orders, products: productsMap },
            error: null
        });
    } catch (error) {
        res.status(500);
        res.json({ error: error.toString() });
    }
};
