// Core Module
const path = require('path');

// External Module
const express = require('express');
const {default: mongoose} = require('mongoose');
const DB_path= "mongodb+srv://astha:Astha27@cluster0.ckrdv3g.mongodb.net/todo?appName=Cluster0"

//Local Module
const errorController= require("./controllers/error");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(rootDir, 'public')));

app.use(errorsController.pageNotFound);

const PORT = 3009;

mongoose.connect(DB_path).then(() =>{
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err =>{
  console.log("Failed to connect to MongoDB", err);
})
