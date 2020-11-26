import { useSWRInfinite } from 'swr';
import { stringify } from 'qs';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const getKey = (category, filters) => (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData.cursor === null) return null;

    return `/api/products?${stringify({
        filters,
        category,
        cursor: previousPageData?.cursor
    })}`;
};

const useFetchProduct = ({ initialData, category, filters }) => {
    return useSWRInfinite(getKey(category, filters), fetcher, {
        initialData,
        revalidateAll: false
    });
};

export default useFetchProduct;
