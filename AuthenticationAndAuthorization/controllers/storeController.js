const Home = require("../models/home");
const Favourite = require("../models/favourite");
const favourite = require("../models/favourite");

exports.getIndex = (req, res, next) => {
  console.log("session value:", req.session);
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      pageTitle: "airbnb Home",
      currentPage: "index",
      registeredHomes: registeredHomes,
      isLoggedIn: req.isLoggedIn
    })
  });
};

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      pageTitle: "Homes List",
      currentPage: "Home",
      registeredHomes: registeredHomes,
      isLoggedIn: req.isLoggedIn
    })
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn
  })
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find().populate('houseId').then((favourites) => {
    Home.find().then((registeredHomes) => {
      const favouriteHomes= favourites.map(fav => fav.houseId);
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
        isLoggedIn: req.isLoggedIn
      });
    });
  });
};
exports.postAddToFavourite = (req, res, next) => {
  const homeId= req.body.id;
  Favourite.findOne({houseId: homeId}).then((existingFav) => {
    if(existingFav){
      console.log("Home already in favourites");
      return res.redirect("/favourites");
    }
    const fav = new Favourite({houseId: homeId});
    fav.save().then(() => {
      console.log("Home added to favourites");
    }).catch(err => {
      console.log("Error while adding to favourites: ", err);
    });
    res.redirect("/favourites");
  });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({houseId: homeId}).then(result => {
    console.log('Fav Removed: ', result);
  }).catch(err => {
    console.log("Error while removing favourite: ", err);
  }).finally(() => {
    res.redirect("/favourites");
  });
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
        isLoggedIn: req.isLoggedIn
      });
    }
  });
};