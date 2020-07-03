import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import UserForm from "./components/UserForm";
import User from "./components/User";
const initialUser = {
  name: "",
  bio: "",
};

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(initialUser);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => {
        // console.log("get response.data", response.data);
        setUsers(response.data);
      })
      .catch((err) => console.log("error: ", err));
  }, []);

  const addNewUser = () => {
    axios
      .post("http://localhost:5000/api/users", user)
      .then((response) => {
        //console.log("get response.data", response.data);
        setUsers(response.data);
        setUser(initialUser);
      })
      .catch((err) => console.log("error: ", err));
  };

  const editUser = () => {
    axios
      .put(`http://localhost:5000/api/users/${user.id}`, user)
      .then((response) => {
        const newUsers = users.map((u) => {
          if (u.id === user.id) {
            return response.data;
          } else {
            return u;
          }
        });
        setUsers(newUsers);
        setUser(initialUser);
        setEdit(false);
      })
      .catch((err) => console.log("err", err));
  };

  const deleteUser = (user) => {
    //console.log("user in deleteUser", user.id);
    axios
      .delete(`http://localhost:5000/api/users/${user.id}`)
      .then((response) => {
        setUsers(response.data);
      });
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddNewUser = (e) => {
    e.preventDefault();
    addNewUser();
  };
  const handleEditUser = (e) => {
    e.preventDefault();
    editUser();
  };

  return (
    <div className="App">
      <div className="user-home">
        <div className="user">
          {users.map((user) => (
            <User
              key={user.id}
              user={user}
              deleteUser={deleteUser}
              editUser={editUser}
              handleChange={handleChange}
              edit={edit}
              setEdit={setEdit}
              setUser={setUser}
            />
          ))}
        </div>
        <UserForm
          handleAddNewUser={handleAddNewUser}
          user={user}
          setUser={setUser}
          handleChange={handleChange}
          handleEditUser={handleEditUser}
          edit={edit}
          setEdit={setEdit}
        />
      </div>
    </div>
  );
}

export default App;
