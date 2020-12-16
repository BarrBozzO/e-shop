import { action, computed, makeAutoObservable } from 'mobx';
class Favorites {
    static KEY = 'favs';

    constructor() {
        const initValues = this._getPersistedData();

        this.data = new Set(initValues);
        makeAutoObservable(this);
    }

    @computed
    has(productId) {
        return this.data.has(productId);
    }

    _add(productId) {
        this.data.add(productId);
        this._persist();
    }

    _remove(productId) {
        this.data.delete(productId);
        this._persist();
    }

    @action
    toggle(productId) {
        return this.has(productId)
            ? this._remove(productId)
            : this._add(productId);
    }

    @computed
    get() {
        const result = [];
        this.data.forEach((item) => result.push(item));

        return result;
    }

    _getPersistedData = () => {
        if (typeof window === 'undefined') return [];
        return JSON.parse(localStorage.getItem(Favorites.KEY)) || [];
    };

    _persist() {
        localStorage.setItem(Favorites.KEY, JSON.stringify(this.get()));
    }
}

export default new Favorites();
