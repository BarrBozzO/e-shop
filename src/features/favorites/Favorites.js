class Favorites {
  static KEY = "favs";

  constructor() {
    const initValues = this._getPersistedData();
    this.data = new Set(initValues);
  }

  has(productId) {
    return this.data.has(productId);
  }

  add(productId) {
    this.data.add(productId);
    this._persist();
  }

  size() {
    return this.data.size;
  }

  remove(productId) {
    this.data.delete(productId);
    this._persist();
  }

  get() {
    const result = [];
    this.data.forEach((item) => result.push(item));

    return result;
  }

  _getPersistedData = () => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(Favorites.KEY)) || [];
  };

  _persist() {
    localStorage.setItem(Favorites.KEY, JSON.stringify(this.get()));
  }
}

export default Favorites;
