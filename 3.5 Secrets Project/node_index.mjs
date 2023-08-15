import fs from "fs";
import xml2js from "xml2js";

const parser = new xml2js.Parser();

fs.readFile("jokes.xml", (err, data) => {
  if (err) {
    console.error("Error reading XML file:", err);
    return;
  }

  parser.parseString(data, (parseErr, result) => {
    if (parseErr) {
      console.error("Error parsing XML:", parseErr);
      return;
    }

    const jokes = result.jokes.joke;
    if (jokes && jokes.length > 0) {
      const randomIndex = Math.floor(Math.random() * jokes.length);
      const randomJoke = jokes[randomIndex];
      console.log(randomJoke);
    } else {
      console.log("No jokes found in the XML file.");
    }
  });
});
