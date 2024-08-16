import { useState } from "react";
import MyModal from "./Modal";
import Button from "./Button";
export default function Header({
  users,
  onAddUser,
  currentUser,
  onSetCurrentUser,
}) {
  const userData = users.map((u) => ({ id: u.id, name: u.name }));
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="topnav">
      <select
        value={currentUser}
        onChange={(e) => onSetCurrentUser(Number(e.target.value))}
      >
        {userData.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
      <p onClick={() => setShowModal((shown) => !shown)}>Create new user</p>
      {showModal && (
        <AddNewUser
          showModal={showModal}
          onHandleShown={setShowModal}
          onAddUser={onAddUser}
        />
      )}
    </div>
  );
}

function AddNewUser({ showModal, onHandleShown, onAddUser }) {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function createNewUser() {
    if (!username || !image) return;

    const id = Date.now();
    const newUser = {
      id,
      name: username,
      image: `${image}?=${id}`,
    };

    onAddUser(newUser);
    setUsername("");
    setImage("https://i.pravatar.cc/48");
    onHandleShown();
  }
  return (
    <MyModal show={showModal} title="YOUR NEW COURSE" onHide={onHandleShown}>
      <div className="form-enroll-course">
        <label>Username</label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input
          style={{
            padding: "1rem 2rem 1rem 2rem",
            display: "inline-block",
            marginLeft: "2em",
            marginRight: "2em",
          }}
          type="text"
          placeholder="User name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>User profile pict</label>
        &nbsp; &nbsp;
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br />
        <Button onClick={createNewUser} bgColor="green" textColor="#fff">
          Create User
        </Button>
      </div>
    </MyModal>
  );
}
