import express from "express";

import {
  create,
  deleteUser,
  getAllUsers,
  getUserById,
  
} from "../controller/userController.js";

const route = express.Router();

route.post("/user", create);
route.get("/users", getAllUsers);
route.get("/user/:id", getUserById);
route.delete("/delete/user/:id", deleteUser);

export default route;
