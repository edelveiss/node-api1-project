import React from "react";

const User = (props) => {
  const toggleTrue = () => {
    props.setEdit(true);
    props.setUser(props.user);
  };
  const handleDeleteUser = (e) => {
    e.preventDefault();
    props.deleteUser(props.user);
  };

  return (
    <div className="user-list ">
      <div>
        <h2>Name: {props.user.name}</h2>
        <h2>Bio: {props.user.bio}</h2>
        <button onClick={toggleTrue} className="item-button">
          Update
        </button>

        <button onClick={handleDeleteUser} className="item-button">
          Delete
        </button>
      </div>
    </div>
  );
};
export default User;
