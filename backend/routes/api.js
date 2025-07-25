import express from "express";
import {
  loginUser,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../services/database.js";
import { generateToken, authenticate } from "../services/tokenService.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const result = await loginUser(req.body.username, req.body.password);
    if (result.success && result.user.role === "admin") {
      const userToken = await generateToken({
        role: result.user.role,
        username: result.user.username,
      });
      console.log("User token generated: ", userToken);
      res.status(200).json({
        success: true,
        message: "Login successful",
        token: userToken,
        ...result,
      });
    } else if (result.success && result.user.role === "user") {
      res.status(403).json(result, { message: "You are not an Admin!" }); // Event Handler is in LoginCard.tsx - there is defined what happens when the status is 403
    } else {
      res.status(401).json(result, { message: "Invalid credentials" }); // Event Handler is in LoginCard.tsx - there is defined what happens when the status is 401
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/getAllUsers", authenticate, async (req, res) => {
  if (req.user.role === "admin") {
    getAllUsers()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      });
    console.log("Fetched all users successfully");
  } else if (req.user.role === "user") {
    res.status(403).json({ success: false, message: "Access denied" });
    console.log("Access denied for user role");
  } else {
    res.status(500).json({ success: false, message: "Server error" });
    console.log("Server error while fetching users");
  }
});

router.post("/deleteUser", authenticate, async (req, res) => {
  if (req.user.role === "admin") {
    deleteUser(req.body.id)
      .then((result) => {
        if (result.success) {
          res.status(200).json(result);
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      });
    console.log("User deleted successfully");
  } else {
    console.log("Access denied for user role");
  }
});

router.post("/updateUser", authenticate, async (req, res) => {
  if (req.user.role === "admin") {
    updateUser(
      req.body.username,
      req.body.first_name,
      req.body.last_name,
      req.body.password,
      req.body.email,
      req.body.id
    )
      .then((result) => {
        if (result.success) {
          res.status(200).json(result);
        } else {
          throw new Error("Failed to update user");
        }
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      });
    console.log("User updated successfully");
  }
});

export default router;
