import { useSWRInfinite } from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const getKey = (category) => (pageIndex, previousPageData) => {
    return `/api/products/${category}?${previousPageData && previousPageData.cursor ? `cursor=${previousPageData.cursor}` : ''}`;
  }

const useFetchProduct = ({ initialData, category}) => {
    return useSWRInfinite(getKey(category), fetcher, { initialData, refreshInterval: 0 });
}

export default useFetchProduct;