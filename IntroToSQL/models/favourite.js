// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

module.exports = class Favourite {
  static addToFavourite(id, callback) {
     Favourite.getFavourites((favourites) => {
           if(favourites.includes(id)){
            callback("Home already in favourites")
           }else{
              favourites.push(id);
              fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
           }
         });
  }


static getFavourites(callback){
  fs.readFile(favouriteDataPath, (err, data) => {
    callback(!err ? JSON.parse(data) : []);
  });
}

static deleteById(delHomeId, callback) {
  Favourite.getFavourites((homeIds) => {
    homeIds = homeIds.filter(id => id !== delHomeId);
    fs.writeFile(
      favouriteDataPath,
      JSON.stringify(homeIds),
      (error) => {
        if (error) {
          console.log("Delete failed", error);
        }
        callback(homeIds);
      }
    );
  });
}

}
