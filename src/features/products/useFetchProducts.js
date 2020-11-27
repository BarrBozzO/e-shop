import { useSWRInfinite } from 'swr';
import { stringify } from 'qs';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const getKey = (category, filters) => (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData.cursor === null) return null;

    const qParams = {};

    if (filters) {
        qParams.filters = JSON.stringify(filters);
    }

    if (category) {
        qParams.category = category;
    }

    if (previousPageData && previousPageData.cursor) {
        qParams.cursor = previousPageData.cursor;
    }

    return `/api/products?${stringify(qParams)}`;
};

const useFetchProduct = ({ initialData, category, filters }) => {
    return useSWRInfinite(getKey(category, filters), fetcher, {
        initialData,
        revalidateOnFocus: false
    });
};

export default useFetchProduct;
