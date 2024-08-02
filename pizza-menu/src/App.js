import pizzaData from "./data";

function App() {
  return (
    <div>
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return <h1>Fast React Pizza Co.</h1>;
}

function Menu() {
  return (
    <div>
      <h2>Welcome to our Lovely Restaurant</h2>
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

function Footer() {
  return <footer>{new Date().toLocaleTimeString()}We're currently open</footer>;
}

export default App;
