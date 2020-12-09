import { action, computed, makeAutoObservable } from 'mobx';
class Cart {
    static KEY = 'cart';

    constructor() {
        const initValues = this._getPersistedData();

        this.data = new Map(initValues);
        makeAutoObservable(this);
    }

    @action
    add(productId, size) {
        let current = this.data.get(productId);

        if (!current) {
            current = {
                total: 0,
                sizes: {
                    [size]: 0
                }
            };
        }

        const next = {
            total: current.total + 1,
            sizes: {
                ...current.sizes,
                [size]: (current.sizes[size] || 0) + 1
            }
        };

        this.data.set(productId, next);
        this._persist();
    }

    @action
    remove(productId, size, reset = false) {
        const current = this.data.get(productId);

        if (current === null) throw new Error('Wrong product ID');

        const next = {
            total: current.total - (reset ? current.sizes[size] : 1),
            sizes: {
                ...current.sizes,
                [size]: reset ? 0 : current.sizes[size] - 1
            }
        };
        this.data.set(productId, next);
        this._persist();
    }

    @action
    reset() {
        this.data.clear();
        this._persist();
    }

    @computed
    get(productId, size) {
        if (!productId) {
            return this.data;
        }

        const product = this.data.get(productId) || null;

        if (!product || product.total === 0) return null;

        return size ? product.sizes[size] : product;
    }

    @computed
    getProductIds() {
        const result = [];

        this.data.forEach((product, id) => {
            if (product.total === 0) return;
            result.push(id);
        });

        return result;
    }

    @computed
    getTotal() {
        let result = 0;
        this.data.forEach((product) => {
            result += product.total;
        });

        return result;
    }

    @computed
    getBySizes() {
        const result = [];

        this.data.forEach((product, id) => {
            if (product.total === 0) return;

            Object.keys(product.sizes).forEach((size) => {
                if (product.sizes[size] < 1) return;
                result.push({
                    id,
                    size,
                    total: product.sizes[size]
                });
            });
        });

        return result;
    }

    _getPersistedData = () => {
        if (typeof window === 'undefined') return [];
        return JSON.parse(localStorage.getItem(Cart.KEY)) || [];
    };

    _persist() {
        localStorage.setItem(Cart.KEY, JSON.stringify([...this.get()]));
    }
}

export default new Cart();
