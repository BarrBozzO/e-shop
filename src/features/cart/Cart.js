import { action, computed, makeAutoObservable } from "mobx";
class Cart {
  static KEY = "cart";

  constructor() {
    const initValues = this._getPersistedData();

    this.data = new Map(initValues);
    makeAutoObservable(this);
  }

  @action
  add(productId) {
    const current = this.data.get(productId) || 0;
    this.data.set(productId, current + 1);
    this._persist();
  }

  @action
  remove(productId, reset = false) {
    const current = this.data.get(productId) || 0;
    const nextValue = current - 1;

    if (nextValue > 0 && !reset) {
      this.data.set(productId, nextValue);
    } else {
      this.data.delete(productId);
    }
    this._persist();
  }

  @computed
  get(productId) {
    if (!productId) {
      return this.data;
    }

    return this.data.get(productId) || null;
  }

  @computed
  getIds() {
    const items = this.get();
    const result = [];

    for (const item of items) {
      result.push(item[0]);
    }

    return result;
  }

  @computed
  getSize() {
    return this.data.size;
  }

  _getPersistedData = () => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(Cart.KEY)) || [];
  };

  _persist() {
    localStorage.setItem(Cart.KEY, JSON.stringify([...this.get()]));
  }
}

export default new Cart();
