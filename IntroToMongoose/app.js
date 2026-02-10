// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/error");
const {default: mongoose} = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3000;

const DB_path= "mongodb+srv://astha:Astha27@cluster0.ckrdv3g.mongodb.net/airbnb?appName=Cluster0"
mongoose.connect(DB_path).then(() =>{
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err =>{
  console.log("Failed to connect to MongoDB", err);
})
