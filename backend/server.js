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
} from "./database.js";

//view engine ejs
app.set("view engine", "ejs");

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/api/login", async (req, res) => {
  console.log(req.body);

  loginUser(req.body.username, req.body.password)
    .then((result) => {
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(401).json(result);
      }
    })
    .catch((err) => {
      console.error("Error logging in:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
