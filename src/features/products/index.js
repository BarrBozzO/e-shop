import firebase from 'firebase';
import { firestore } from '../../firebase';
import ListComponent from './List';
import FilterComponent from './Filter';
import Nav from './Nav';
import useFetchProducts from './useFetchProducts';

const PAGE_SIZE = 20;

export const fetchProducts = async ({ sex, age, seo, type } = {}) => {
    let query = firestore
        .collection('products')
        .orderBy(firebase.firestore.FieldPath.documentId())
        .limit(PAGE_SIZE);

    if (sex) {
        query = query.where('sex', '==', sex);
    }

    if (age) {
        query = query.where('age', '==', age);
    }

    if (seo) {
        query = query.where('seo', 'array-contains', seo);
    }

    if (type) {
        query = query.where('type', '==', type);
    }

    const snapshot = await query.get();
    const data = snapshot.docs.map((product) => ({
        id: product.id,
        data: product.data()
    }));

    return data;
};

export const fetchProduct = async (id) => {
    const snapshot = await firestore.doc(`products/${id}`).get();
    const product = snapshot.data();

    return {
        id: snapshot.id,
        ...product
    };
};

export const List = ListComponent;
export const Filter = FilterComponent;

export { useFetchProducts, Nav };
