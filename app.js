const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4001;

//Sets up the Express app to handle data parsing.
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) =>{
    res.sendFile(path.join(__dirname, "public/notes.html"));
});



app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
})