import React, { useContext } from "react";
import list from "../context/data"; 
import { CartContext } from "../context/CartContext";

const Movies = () => {
  const { addToCart, warning } = useContext(CartContext);

  return (
    <div className="page">
      <h1>Available Products</h1>
      {warning && <p style={{ color: "red" }}>{warning}</p>}

      <div className="product-grid">
        {list.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.img} alt={item.service} />
            <h3>{item.service}</h3>
            <p>{item.serviceInfo}</p>
            <p><strong>${item.price.toFixed(2)}</strong></p>
            <button onClick={() => addToCart({
              id: `item-${item.id}`,
              name: item.service,
              price: item.price,
              type: item.type,
            })}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
