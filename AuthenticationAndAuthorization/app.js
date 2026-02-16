// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require("express-session");
const MongoDBStore= require("connect-mongodb-session")(session);
const DB_path= "mongodb+srv://astha:Astha27@cluster0.ckrdv3g.mongodb.net/airbnb?appName=Cluster0"

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/error");
const {default: mongoose} = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
const store = new MongoDBStore({
  uri: DB_path,
  collection: 'sessions'
});
app.use(session({
  secret: 'my secret', // used to sign the session ID cookie, should be a long and random string in production
  resave: false, // forces the session to be saved back to the session store, even if it was never modified during the request. Setting this to false can help reduce unnecessary session store operations.
  saveUninitialized: true, // forces a session that is "uninitialized" to be saved to the store. An uninitialized session is one that is new but not modified.
  store // use the MongoDB store for session storage
}));
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn
  next();
})

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, 'public')));

app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

app.use(errorsController.pageNotFound);

const PORT = 3005;

mongoose.connect(DB_path).then(() =>{
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err =>{
  console.log("Failed to connect to MongoDB", err);
})
