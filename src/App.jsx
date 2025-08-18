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

  const removeForomCart = (product) => {
    setAddedProducts((curr) => curr.filter((p) => p.name !== product.name));
  };

  const totalToPay = addedProducts.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );
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
          {addedProducts.map((product, i) => (
            <li key={i}>
              <p>{product.name}</p>
              <p>prezzo: {product.price}</p>
              <strong>Quantità: {product.quantity}</strong>
              <button onClick={() => removeForomCart(product)}>
                Rimuovi dal carrello
              </button>
            </li>
          ))}
        </ul>
        <h3>Totale Da Pagare: {totalToPay.toFixed(2)} €</h3>
      </div>
    </>
  );
}

export default App;
