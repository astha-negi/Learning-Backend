// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require("express-session");
const MongoDBStore= require("connect-mongodb-session")(session);
const {default: mongoose} = require('mongoose');
const multer= require("multer");
const DB_path= "mongodb+srv://astha:Astha27@cluster0.ckrdv3g.mongodb.net/airbnb?appName=Cluster0"

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/error");

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
  req.isLoggedIn = !!req.session?.isLoggedIn;
  res.locals.isLoggedIn = req.isLoggedIn;
  res.locals.user = req.session?.user || null;

  // Temporary request logging middleware (remove after debugging)
  try {
    const sessionSummary = req.session
      ? { id: req.sessionID || req.session.id, isLoggedIn: req.session.isLoggedIn, userId: req.session.user?._id }
      : null;
    const userSummary = res.locals.user
      ? { _id: res.locals.user._id, email: res.locals.user.email, userType: res.locals.user.userType }
      : null;
    console.log('REQ_LOG', { url: req.originalUrl, cookieHeader: req.headers.cookie, session: sessionSummary, resLocals: { isLoggedIn: res.locals.isLoggedIn, user: userSummary } });
  } catch (e) {
    console.log('REQ_LOG: error summarizing request', e);
  }
  // Also log the session as stored in the store (helps confirm persistence)
  try {
    if (store && req.sessionID) {
      store.get(req.sessionID, (err, storedSession) => {
        if (err) {
          console.log('STORE_GET_ERR', err);
        } else {
          console.log('STORE_SESSION', { id: req.sessionID, storedSession });
        }
      });
    }
  } catch (e) {
    console.log('STORE_GET_EXCEPTION', e);
  }

  next();
});
const randomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, randomString(10) + '-' + file.originalname);
  }
});
const fileFilter= (req, file, cb) => {
  if(file.mimetype===("image/jpeg") || file.mimetype===("image/png") || file.mimetype===("image/jpg")){
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const multerOptions= {
  storage,
  fileFilter
}
app.use(express.urlencoded({ extended: true }));
app.use(multer(multerOptions).single('photo'));
// serve uploaded files
app.use('/uploads', express.static(path.join(rootDir, 'uploads')));
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

const PORT = 3007;

mongoose.connect(DB_path).then(() =>{
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err =>{
  console.log("Failed to connect to MongoDB", err);
})
