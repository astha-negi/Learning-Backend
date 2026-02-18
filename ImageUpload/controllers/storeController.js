const Home = require("../models/home");
const User= require("../models/user");
const path = require('path');
const rootDir = require('../utils/pathUtil');
exports.getIndex = (req, res, next) => {
  console.log("session value:", req.session);
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      pageTitle: "airbnb Home",
      currentPage: "index",
      registeredHomes: registeredHomes,
    })
  });
};

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      pageTitle: "Homes List",
      currentPage: "Home",
      registeredHomes: registeredHomes,
    })
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

exports.getFavouriteList = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favourites');
  res.render("store/favourite-list", {
    favouriteHomes: user.favourites,
    pageTitle: "My Favourites",
    currentPage: "favourites",
  });
};

exports.postAddToFavourite = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }
  res.redirect("/favourites");
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter(fav => fav != homeId);
    await user.save();
  }
  res.redirect("/favourites");
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(homeId);
  Home.findById(homeId).then((home) => {
    if(!home){
      console.log("Home not found");
      res.redirect("/homes");
    }else{
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "home-details",
      });
    }
  });
};

exports.getHouseRules = (req, res, next) => {
  // require login to download rules
  if (!req.session?.isLoggedIn) {
    return res.redirect('/login');
  }

  const homeId = req.params.homeId;
  // Use a generic rules filename; you can customize per-home if desired
  const rulesFileName = 'House Rules.pdf';
  const filePath = path.join(rootDir, 'rules', rulesFileName);

  res.download(filePath, 'Rules.pdf', (err) => {
    if (err) {
      console.log('Error sending rules file:', err);
      return res.status(404).send('Rules file not found');
    }
  });
};