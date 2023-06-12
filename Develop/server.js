const express = require("express");
const path = require("path");
const app = express();
const notes = require("./db/db.json");
const PORT = 3001;

app.use(express.static('public'));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    notes.push(newNote);
    res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    notes.splice(id, 1);
    res.json(notes);
});

app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "db/db.json")));



app.listen(PORT, () => console.log(`App listening on PORT http://localhost:${PORT}`));
