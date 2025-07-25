//statics
import express from "express";
import cors from "cors";
const app = express();
const port = 5002;
import cookieParser from "cookie-parser";
import router from "./routes/api.js";

//view engine ejs
app.set("view engine", "ejs");

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Express backend server is running at http://localhost:${port}`);
});

// error handling code
app.use((err, req, res, next) => {
  // Log the error stack and send a generic error response
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
