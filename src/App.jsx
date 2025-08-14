import { useState } from "react";
import ListComponent from "./assets/ListComponent";
const products = [
  { name: "Mela", price: 0.5 },
  { name: "Pane", price: 1.2 },
  { name: "Latte", price: 1.0 },
  { name: "Pasta", price: 0.7 },
];
function App() {
  const [addedProducts, setAddedProducts] = useState([]);
  function addToCart(product) {
    setAddedProducts((prev) => {
      const found = prev.find((p) => p.name === product.name);
      if (found) {
        return prev.map((p) =>
          p.name === product.name ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  }
  return (
    <>
      <h1>Ex Reducer</h1>
      <div className="cart">
        <h2>list of thinks</h2>
        <ul>
          {products.map((product, i) => (
            <ListComponent
              key={i}
              name={product.name}
              price={product.price}
              addToCart={() => addToCart(product)}
            />
          ))}
        </ul>
      </div>
      <div className="cart">
        <h2>Cart</h2>
        <ul>
          {addedProducts.map((product, idx) => (
            <li key={idx}>
              <p>{product.name}</p>
              <p>prezzo: {product.price}</p>
              <strong>Quantità: {product.quantity}</strong>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
