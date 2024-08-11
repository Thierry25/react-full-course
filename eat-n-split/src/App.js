import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [addFriendIsOpen, setAddFriendOpen] = useState(false);
  const [friendsList, setFriendsList] = useState(initialFriends);
  const [showSplitBill, setShowSplitBill] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend(friend) {
    if (friend === null) return;
    setFriendsList((friendsList) => [...friendsList, friend]);
    handleAddFriendForm();
  }

  function handleSplit(value) {
    setFriendsList((friends) =>
      friends.map((f) =>
        f?.id === selectedFriend.id ? { ...f, balance: f.balance + value } : f
      )
    );
    setSelectedFriend(null);
  }

  function handleAddFriendForm() {
    setAddFriendOpen((o) => !o);
  }

  function handleSelectedFriend(friend) {
    if (friend !== selectedFriend) {
      setSelectedFriend(friend);
      setShowSplitBill(true);
    } else {
      setSelectedFriend(null);
      setShowSplitBill(false);
    }
    setAddFriendOpen(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friendsList={friendsList}
          selectedFriend={selectedFriend}
          onSelectFriend={handleSelectedFriend}
        />
        {addFriendIsOpen && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleAddFriendForm}>
          {addFriendIsOpen ? "Close" : "Add Friend"}
        </Button>
      </div>
      {showSplitBill && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplit}
        />
      )}
    </div>
  );
}

function FriendsList({ friendsList, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friendsList.map((f) => (
        <Friend
          friend={f}
          key={f.id}
          selectedFriend={selectedFriend}
          onSelectFriend={onSelectFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}{" "}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}$
        </p>
      )}{" "}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function FormAddFriend({ onAddFriend }) {
  const [friendName, setFriendName] = useState("");
  const [friendPic, setFriendPic] = useState("https://i.pravatar.cc/48");

  function submitAddFriend(e) {
    e.preventDefault();

    if (!friendName || !friendPic) return;
    const id = crypto.randomUUID;
    const friend = {
      id,
      name: friendName,
      image: `${friendPic}?=${id}`,
      balance: 0,
    };
    onAddFriend(friend);

    setFriendName("");
    setFriendPic("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={submitAddFriend}>
      <label>🤼Friend name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />

      <label>🏙️ Image url</label>
      <input
        type="text"
        value={friendPic}
        onChange={(e) => setFriendPic(e.target.value)}
      />

      <Button onClick={submitAddFriend}>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const friendName = selectedFriend?.name;

  const [billValue, setBillValue] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const friendExpense = billValue ? billValue - paidByUser : "";

  function handleSplitBill(e) {
    e.preventDefault();

    if (!billValue || !paidByUser) return;
    const newBalance = whoIsPaying === "user" ? friendExpense : -paidByUser;
    onSplitBill(newBalance);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSplitBill}>
      <h2>Split a bill with {friendName}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
      />

      <label>🧔🏽‍♂️ Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > billValue
              ? paidByUser
              : Number(e.target.value)
          )
        }
      />

      <label>🤼 {friendName}'s expense</label>
      <input type="text" value={friendExpense} disabled />

      <label>🤑 Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{friendName}</option>
      </select>

      <Button onClick={handleSplitBill}>Split bill</Button>
    </form>
  );
}
