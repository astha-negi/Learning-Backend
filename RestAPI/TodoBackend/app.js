// Core Module
const path = require('path');

// External Module
const express = require('express');
const mongoose = require('mongoose');
const DB_path= "mongodb+srv://astha:Astha27@cluster0.ckrdv3g.mongodb.net/todo?appName=Cluster0"
const cors = require("cors");
const bodyParser = require("body-parser");
//Local Module
const todoItemsRouter = require("./routes/todoItemsRouter");
const errorController= require("./controllers/error");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/api/todo", todoItemsRouter);
app.use(errorController.pageNotFound);

const PORT = 3009;

mongoose.connect(DB_path).then(() =>{
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err =>{
  console.log("Failed to connect to MongoDB", err);
})
