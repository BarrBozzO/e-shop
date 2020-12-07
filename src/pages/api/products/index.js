import { firestore } from '../../../firebase';
import firebase from 'firebase';

const PAGE_SIZE = 20;

export default async (req, res) => {
    try {
        const {
            query: { id, cursor, category, filters }
        } = req;

        if (!id) {
            let isOrdered = false;
            let query = firestore.collection('products');

            if (category) {
                switch (category) {
                    case 'women':
                        {
                            query = query
                                .where('age', '==', 'adult')
                                .where('sex', '==', 'female');
                        }
                        break;
                    case 'men':
                        {
                            query = query
                                .where('age', '==', 'adult')
                                .where('sex', '==', 'male');
                        }
                        break;
                    case 'kids':
                        {
                            query = query.where('age', '==', 'kid');
                        }
                        break;
                }
            }

            if (filters) {
                const { sort, type, seo } = JSON.parse(filters);

                if (sort) {
                    switch (sort) {
                        case 'recommended': {
                            isOrdered = true;
                            break;
                        }
                        case 'newest': {
                            query = query.orderBy('isNew', 'asc');
                            isOrdered = true;
                            break;
                        }
                        case 'lowest-price': {
                            query = query.orderBy('price.value', 'asc');
                            isOrdered = true;
                            break;
                        }
                        case 'highest-price': {
                            query = query.orderBy('price.value', 'desc');
                            isOrdered = true;
                            break;
                        }
                    }
                }

                if (type) {
                    query = query.where('type', '==', type);
                }

                if (seo) {
                    query = query.where('seo', 'array-contains', seo);
                }
            }

            if (!isOrdered) {
                query = query.orderBy(
                    firebase.firestore.FieldPath.documentId()
                );
            }

            if (cursor) {
                // debugger;
                const prev = await firestore
                    .collection('products')
                    .doc(cursor)
                    .get();
                query = query.startAfter(prev); // prev doc.id
            }

            const snapshot = await query.limit(PAGE_SIZE).get();

            const data = snapshot.docs.map((product) => ({
                id: product.id,
                data: product.data()
            }));

            res.json({
                data,
                cursor: data.length ? data[data.length - 1].id : null
            });
        } else {
            const ids = Array.isArray(id) ? id : [id];

            const snapshot = await firestore
                .collection('products')
                .where(firebase.firestore.FieldPath.documentId(), 'in', ids)
                .get();

            const data = snapshot.docs.map((product) => ({
                id: product.id,
                data: product.data()
            }));

            res.json({ data });
        }
    } catch (error) {
        res.json({ error: error.toString() });
    }
};
