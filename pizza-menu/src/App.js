import pizzaData from "./data";

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <PizzaList />
    </main>
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
    <li className="pizza">
      <img src={pizza.photoName} alt={pizza.name} />
      <div>
        <h3>{pizza.name}</h3>
        <p>{pizza.ingredients}</p>
      </div>
      <span>{Number(pizza.price) + 2.15}</span>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 8;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer>{new Date().toLocaleTimeString()} We're currently open</footer>
  );
}

export default App;
