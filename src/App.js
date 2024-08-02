import pizzaData from "./data";

function App() {
  return (
    <div>
      <h1>Hello React</h1>
      <PizzaList />
    </div>
  );
}

function PizzaList() {
  return (
    <ul>
      {pizzaData.map((p) => (
        <Pizza pizza={p} />
      ))}
    </ul>
  );
}

function Pizza({ pizza }) {
  return (
    <li>
      <img src={pizza.photoName} alt={pizza.name} />
      <h2>{pizza.name}</h2>
      <p>{pizza.ingredients}</p>
    </li>
  );
}

export default App;
