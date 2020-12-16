import useSWR from 'swr';

const fetcher = (url, token) =>
    fetch(url, {
        method: 'GET',
        headers: {
            Authorization: token
        }
    }).then((res) => res.json());

const useOrders = (token) => {
    return useSWR(token ? [`/api/orders`, token] : null, fetcher);
};

const useOrderStats = (token) => {
    return useSWR(token ? [`/api/orders/stats`, token] : null, fetcher);
};

export { useOrders, useOrderStats };
