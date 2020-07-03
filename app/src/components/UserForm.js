import React from "react";

const UserForm = (props) => {
  const initialUser = {
    name: "",
    bio: "",
  };

  const cancelNewPost = (e) => {
    e.preventDefault();
    props.setUser(initialUser);
    props.setEdit(false);
    props.setError("");
  };

  return (
    <div className="user-form">
      <div style={{ width: "100%" }}>
        <h2
          style={{
            background: "#afeeed",
            textAlign: "center",
          }}
        >
          {props.edit ? "Update User" : "Add new User"}
        </h2>
      </div>
      <form
        onSubmit={props.edit ? props.handleEditUser : props.handleAddNewUser}
      >
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            name="name"
            onChange={props.handleChange}
            value={props.user.name}
          />
        </label>

        <label htmlFor="age">
          Bio
          <input
            id="bio"
            type="text"
            name="bio"
            onChange={props.handleChange}
            value={props.user.bio}
          />
        </label>
        {props.error && <div className="error">{props.error}</div>}
        <div style={{ display: "flex" }}>
          <button type="submit">Submit</button>
          <button style={{ marginLeft: "1rem" }} onClick={cancelNewPost}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default UserForm;
