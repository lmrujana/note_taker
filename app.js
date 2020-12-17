const express = require('express');
const fs = require('fs');
const path = require('path');
const json_data = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 4001;

//Constructing the path to the db
const DB_DIR = path.resolve(__dirname, "db");
const dbPath = path.join(DB_DIR, "db.json");

//Sets up the Express app to handle data parsing.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//a function that generates a random id
const newId = () => {
    let char = ['1234567890', 'abcdefghijklmnopqrstuvwxyz'];
    let id = "";
    for (let i = 0; i < 5; i++) {
        let charTypeSelector = Math.floor(Math.random() * char.length);
        let charType = char[charTypeSelector];
        let charSelector = Math.floor(Math.random() * charType.length);
        let charSelected = charType[charSelector];
        id = id + charSelected;
    };
    return id;
};

//A function that gives an id to a new note
const giveId = (prevNotesArray, newNote) => {
    let newNoteId = newId();
    if(prevNotesArray.find(note => note.id === newNoteId)){
        while(prevNotesArray.find(note => note.id === newNoteId)){
            newNoteId = newId();
        };
    } else {
        newNote.id = newNoteId;
    };
};

//Routes to HTML files
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

//Routes for the APIs
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "db/db.json"));
    // fs.readFile("db/db.json", "utf8", (err, data) => {
    //     if(err) throw err;
    //     let jsonObj = JSON.parse(data);
    //     res.send(jsonObj);
    //     console.log(jsonObj);
    // });
});

app.post("/api/notes", (req, res) => {
    // console.log(req.body);
    let newNote = req.body
    giveId(json_data, newNote);
    json_data.push(newNote);
    fs.writeFile(dbPath, JSON.stringify(json_data), (err) => err ? console.log(err) : console.log("New note created!"))

    // console.log(json_data);
    res.json(true)
});




app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
})