import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const jokeButton = document.getElementById('getJokeButton');
const jokeDisplay = document.getElementById('joke');

jokeButton.addEventListener('click', async () => {
    try {
        const response = await fetch('jokes.xml');
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');

        const jokes = xmlDoc.getElementsByTagName('joke');
        if (jokes.length > 0) {
            const randomIndex = Math.floor(Math.random() * jokes.length);
            const randomJoke = jokes[randomIndex].textContent;
            jokeDisplay.textContent = randomJoke;
        } else {
            jokeDisplay.textContent = 'No jokes found in the XML file.';
        }
    } catch (error) {
        jokeDisplay.textContent = 'Oops! An error occurred while fetching the joke.';
    }
});



app.use(bodyParser.urlencoded({ extended: true }));

var userIsAuthorised = false;

function passwordCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "ILoveProgramming") {
    userIsAuthorised = true;
  }
  next();
}
app.use(passwordCheck);
///

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (userIsAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.redirect("/");
  }
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
