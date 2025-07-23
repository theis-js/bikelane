//statics
import express from "express";
import cors from "cors";
const app = express();
const port = 5002;
import {
  loginUser,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from "./services/database.js";
import { generateToken, authenticate } from "./services/tokenService.js";
import cookieParser from "cookie-parser";

//view engine ejs
app.set("view engine", "ejs");

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.post("/api/login", async (req, res) => {
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
      // PROBLEM BELOW DOESNT WORK
      // FIX LATER
      res.redirect("http://localhost:5003");
    } else {
      res.status(401).json(result, { message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/api/getAllUsers", authenticate, async (req, res) => {
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

app.post("/api/deleteUser", authenticate, async (req, res) => {
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

app.listen(port, () => {
  console.log(`Express backend server is running at http://localhost:${port}`);
});

// error handling code
app.use((err, req, res, next) => {
  // Log the error stack and send a generic error response
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
