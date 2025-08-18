import { useReducer } from "react";
import ListComponent from "./assets/ListComponent";
const products = [
  { name: "Mela", price: 0.5 },
  { name: "Pane", price: 1.2 },
  { name: "Latte", price: 1.0 },
  { name: "Pasta", price: 0.7 },
];

function cartReducer(addedProducts, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const found = addedProducts.find((p) => p.name === action.payload.name);
      if (found) {
        return addedProducts.map((p) =>
          p.name === action.payload.name
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      } else {
        return [...addedProducts, { ...action.payload, quantity: 1 }];
      }
    }
    case "UPDATE_QUANTITY":
      if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
        return addedProducts;
      }
      return addedProducts.map((p) =>
        p.name === action.payload.name
          ? { ...p, quantity: action.payload.quantity }
          : p
      );
    case "REMOVE_ITEM":
      return addedProducts.filter((p) => p.name !== action.payload);
    default:
      return addedProducts;
  }
}

function App() {
  const [addedProducts, dispatchCart] = useReducer(cartReducer, []);

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
              addToCart={() =>
                dispatchCart({ type: "ADD_ITEM", payload: product })
              }
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
              <label>
                <strong>Quantità: </strong>
                <input
                  type="number"
                  min="1"
                  value={product.quantity}
                  onChange={(e) =>
                    dispatchCart({
                      type: "UPDATE_QUANTITY",
                      payload: {
                        name: product.name,
                        quantity: parseInt(e.target.value),
                      },
                    })
                  }
                  style={{
                    width: "40px",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                />
              </label>
              <button
                onClick={() =>
                  dispatchCart({ type: "REMOVE_ITEM", payload: product.name })
                }
              >
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
