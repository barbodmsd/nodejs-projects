import fs from "fs";
import { __dirname } from "../server.js";

// get all users
export const getAllUsers = (req, res, next) => {
  try {
    const users = JSON.parse(fs.readFileSync(__dirname + "/data/users.json"));
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "something is wrong" });
  }
};

// get user by id
export const getUserById = (req, res, next) => {
  try {
    const { id } = req.params;
    const users = JSON.parse(fs.readFileSync(__dirname + "/data/users.json"));
    const user = users.filter((e) => e.id == id);
    if (user.length > 0) {
      return res.status(200).json(user);
    }
    return res.status(400).json({ message: "invalid id" });
  } catch (error) {
    res.status(500).json({ message: "something is wrong" });
  }
};

// register
export const register = (req, res, next) => {
  try {
    const data = req.body;
    const users = JSON.parse(fs.readFileSync(__dirname + "/data/users.json"));
    const newId = users[users.length - 1].id + 1;
    users.push({ ...data, id: newId });
    fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(users));
    return res.status(200).json({ data: users, message: "register successful" });
  } catch (error) {
    res.status(500).json({ message: "something is wrong" });
  }
};

// login
export const login = (req, res, next) => {
  try {
    const data = req.body;
    const users = JSON.parse(fs.readFileSync(__dirname + "/data/users.json"));
    const user = users.filter((e) => e.username == data.username);
    if (
      user.length == 0 ||
      user[0].username != data.username ||
      user[0].password != data.password
    ) {
      return res
        .status(400)
        .json({ message: "username or password incorrect" });
    }
    return res
      .status(200)
      .json({
        data: { token: "54dsfdjkdsnfdsf6ds5c6sdsjd" },
        message: "login successful",
      });
  } catch (error) {
    res.status(500).json({ message: "something is wrong" });
  }
};
