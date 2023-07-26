import express from "express";
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("<h1>Hello Austin, Tx.</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>Koray Adams</h1><h4>Jr. Software Developer</h4>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>2405 Montopolis Dr, Austin, Tx.</h1>");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
