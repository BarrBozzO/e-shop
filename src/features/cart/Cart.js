class Cart {
  static KEY = "cart";

  constructor() {
    const initValues = this._getPersistedData();

    this.data = new Map(initValues);
  }

  add(productId) {
    const current = this.data.get(productId) || 0;
    this.data.set(productId, current + 1);
    this._persist();
  }

  remove(productId) {
    this.data.delete(productId);
    this._persist();
  }

  get(productId) {
    if (!productId) {
      return this.data;
    }

    return this.data.get(productId) || null;
  }

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

export default Cart;
