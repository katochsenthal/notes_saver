const express = require("express");
const path = require("path");
const fs = require("fs");
const { get } = require("express/lib/response");

const port = process.env.PORT || 3001;

const app = express();

const notes = [];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.js"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  let file = fs.readFileSync("db/db.json");
  let content = JSON.parse(file);
  res.json(content);
});

app.post("/api/notes", (req, res) => {
  const file = fs.readFileSync("db/db.json");
  const content = JSON.parse(file);
  console.log(content);
  const note = { ...req.body, id: content.length + 1 };

  content.push(note);
  fs.writeFileSync("db/db.json", JSON.stringify(content));
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.delete("/api/notes/:id", (req, res) => {
  let fileContent = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteID = req.params.id;
  let index = 0;
  fileContent = fileContent.filter((note) => {
    console.log("line 47:", note);
    return note.id != noteID;
  });
  for (not of fileContent) {
    not.id = index.toString();
    index++;
  }
  res.json(fileContent);
  fs.writeFileSync("./db/db.json", JSON.stringify(fileContent));
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
