const express = require("express");
const path = require("path");
const fs = require("fs");
const { get } = require("express/lib/response");

const PORT = 3001;

const app = express();

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
  const note = { ...req.body, id: content.length + 1 };

  content.push(note);
  fs.writeFileSync("db/db.json", JSON.stringify(content));
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
