//import express
const express = require("express");
const shortid = require("shortid");
const cors = require("cors");
//create a server
const server = express();

//middleware -to teach express new tricks
server.use(express.json()); //how to parse JSON from the body
server.use(cors());

let users = [
  {
    id: "7ht664mn", // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
];
//--------------Test api -----------------
server.get("/", (req, res) => {
  res.json({ api: "api running..." });
});
//--------------GET request for /api/users -----------------
server.get("/api/users", function (req, res) {
  try {
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

//--------------POST request for /api/users -----------------
server.post("/api/users", function (req, res) {
  const userInfo = req.body; //read the data from the body
  const findUserByNameBio = (user) => {
    return user.name == userInfo.name && user.bio === userInfo.bio;
  };

  if (!(userInfo.name && userInfo.bio)) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user." });
  } else if (users.find(findUserByNameBio)) {
    res.status(400).json({ message: `${userInfo.name} already exists` });
  } else if (userInfo) {
    users = [
      ...users,
      {
        id: shortid.generate(),
        ...req.body,
      },
    ];
    res.status(201).json(users); //201 when created, return the collection
  } else {
    res.status(500).json({
      message: "There was an error while saving the user to the database",
    });
  }
});

//--------------GET request for /api/users/:id -----------------
server.get("/api/users/:id", function (req, res) {
  const userInfo = req.body;
  const id = req.params.id;
  foundUser = users.find((user) => user.id === id);

  try {
    if (foundUser) {
      res.status(200).json(foundUser);
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist.",
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The user information could not be retrieved." });
  }
});

//--------------DELETE request for /api/users/:id -----------------
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);
  console.log("req.params", id, "foundUser", foundUser);

  if (foundUser) {
    const userRemoved = { ...foundUser };
    users = users.filter((user) => user.id != id);
    res.status(200).json(users);
  } else if (!foundUser) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    res.status(500).json({ message: "The user could not be removed" });
  }
});
//--------------PUT request for /api/users/:id -----------------
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  const findUserById = (user) => {
    return user.id == id;
  };
  const foundUser = users.find(findUserById);
  if (!foundUser) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (!(name && bio)) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user." });
  } else if (foundUser) {
    if (name) foundUser.name = name;
    if (bio) foundUser.bio = bio;

    res.status(200).json(foundUser);
  } else {
    res
      .status(500)
      .json({ message: "The user information could not be modified." });
  }
});

//listen for incoming requests
const port = 5000;
server.listen(port, () =>
  console.log(`\n == API running on port ${port} == \n`)
);
