export default function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={bgColor && { backgroundColor: bgColor, color: textColor }}
      className="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
