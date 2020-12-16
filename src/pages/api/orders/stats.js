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

        const stats = snapshot.docs.reduce(
            (statistics, order) => {
                const data = order.data();

                const datetime = data.datetime.toMillis();
                statistics.total += 1;
                statistics.items += data.products.length;
                statistics.latest =
                    statistics.latest > datetime ? statistics.latest : datetime;

                return statistics;
            },
            { total: 0, items: 0, latest: 0 }
        );

        res.json({
            data: stats,
            error: null
        });
    } catch (error) {
        res.status(500);
        res.json({ error: error.toString() });
    }
};
