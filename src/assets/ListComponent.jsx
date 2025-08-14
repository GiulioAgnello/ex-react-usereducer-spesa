export default function ListComponent({ name, price, addToCart }) {
  return (
    <>
      <li>
        <h4>{name}</h4>
        <p>Prezzo: {price}</p>
        <button onClick={addToCart}>Add To Cart</button>
      </li>
    </>
  );
}
