const Home = require("../models/home");
const Favourite = require("../models/favourite");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites((favourites) => {
    Home.fetchAll().then(([registeredHomes]) => {
      const favouriteHomes=registeredHomes.filter(home=>favourites.includes(home.id));
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    });
  });
};
exports.postAddToFavourite = (req, res, next) => {
  // console.log("Came to add to favourites", req.body);
  Favourite.addToFavourite(req.body.id, (error) => {
    if(error){
      console.log("Error adding to favourites", error);
    }
    res.redirect("/favourites");
  });
}

exports.postDeleteFromFavourite = (req, res, next) => {
  Favourite.deleteById(req.params.homeId, (error) => {
    if(error){
      console.log("Error deleting from favourites", error);
    }
    res.redirect("/favourites");
  });
}

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(homeId);
  Home.findById(homeId).then(([rows]) => {
    const home = rows[0];
    if(!home){
      console.log("Home not found");
      res.redirect("/homes");
    }else{
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "home-details",
  })
    }
  });
};