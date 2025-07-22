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
  console.log(req.body);

  try {
    const result = await loginUser(req.body.username, req.body.password);
    if (result.success) {
      const userToken = await generateToken({ username: req.body.username });
      res.status(200).json(
        result, // This is the user data that logged in
        { message: "Login successful", token: userToken }
      );
    } else {
      res.status(401).json(result, { message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/api/getAllUsers", async (req, res) => {
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
