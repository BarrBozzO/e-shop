import React, { useEffect, useState } from "react";

function List({ products: initProducts }) {
  const [products, setProducts] = useState(initProducts);

  useEffect(async () => {
    setProducts(products);
  }, []);

  if (!Array.isArray(products) || !products.length) return null;

  return (
    <div>
      {products.map((product) => {
        return product.data.name;
      })}
    </div>
  );
}

export default List;
