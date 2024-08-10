export default function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list🚀</em>
      </p>
    );
  }
  const itemsTotal = items.length;
  const packedQuantity = items.filter((it) => it.packed).length;
  const percentagePacked = Math.round((packedQuantity / itemsTotal) * 100);
  return (
    <footer className="stats">
      <em>
        {percentagePacked === 100
          ? "You got everything! Ready to go ✈️"
          : `💼You have ${itemsTotal} items on your list, and you already packed 
        ${packedQuantity} (${percentagePacked}%)`}
      </em>
    </footer>
  );
}
