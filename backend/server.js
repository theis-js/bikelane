//statics
import express from "express";
const app = express();
const port = 4000;

//view engine ejs
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
