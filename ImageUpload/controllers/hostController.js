const Home = require("../models/home");
const fs = require("fs");
const path = require('path');
const rootDir = require('../utils/pathUtil');

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.log("Home not found for editing");
        return res.redirect("/host/host-home-list");
      }
      res.render("host/edit-home", {
        home: home,
        pageTitle: "Edit Your Home",
        currentPage: "host-homes",
        editing: editing,
      });
    })
    .catch((err) => {
      console.log("Error fetching home for edit:", err);
      res.redirect("/host/host-home-list");
    });
};

exports.getHostHomes = (req, res, next) => {
  Home.find()
    .then((registeredHomes) => {
      res.render("host/host-home-list", {
        registeredHomes: registeredHomes,
        pageTitle: "Host Homes List",
        currentPage: "host-homes",
      });
    })
    .catch((err) => {
      console.log("Error fetching host homes:", err);
      res.redirect("/");
    });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, description } = req.body;
  // multer stores file info on req.file
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const photoPath = "/uploads/" + req.file.filename;
  const home = new Home({ houseName, price, location, rating, photo: photoPath, description });
  home
    .save()
    .then(() => {
      console.log("Home saved successfully");
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error saving home:", err);
      res.redirect("/host/host-home-list");
    });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, description } = req.body;
  Home.findById(id)
    .then((home) => {
      if (!home) {
        console.log("Home not found for update");
        return res.redirect("/host/host-home-list");
      }
      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;
      if (req.file) {
        // Delete old photo file if it exists (home.photo stores path like '/uploads/filename')
        const oldPhoto = home.photo;
        if (oldPhoto) {
          // make a filesystem path relative to project root
          const relPath = oldPhoto.startsWith('/') ? oldPhoto.slice(1) : oldPhoto;
          const oldFilePath = path.join(rootDir, relPath);
          fs.access(oldFilePath, fs.constants.F_OK, (accessErr) => {
            if (!accessErr) {
              fs.unlink(oldFilePath, (unlinkErr) => {
                if (unlinkErr) {
                  console.log('Error deleting old photo:', unlinkErr);
                } else {
                  console.log('Deleted old photo:', oldFilePath);
                }
              });
            } else {
              console.log('Old photo not found, skipping delete:', oldFilePath);
            }
          });
        }
      }
      // Keep previous photo unless a new file is uploaded
      if (req.file) {
        home.photo = "/uploads/" + req.file.filename;
      }
      home.description = description;
      return home.save();
    })
    .then((result) => {
      console.log("home updated", result);
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error updating home:", error);
      res.redirect("/host/host-home-list");
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Deleting home with id:", homeId);
  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.log('Home not found for deletion');
        return res.redirect('/host/host-home-list');
      }

      const oldPhoto = home.photo;
      if (oldPhoto) {
        const relPath = oldPhoto.startsWith('/') ? oldPhoto.slice(1) : oldPhoto;
        const oldFilePath = path.join(rootDir, relPath);
        fs.access(oldFilePath, fs.constants.F_OK, (accessErr) => {
          if (!accessErr) {
            fs.unlink(oldFilePath, (unlinkErr) => {
              if (unlinkErr) {
                console.log('Error deleting photo during home delete:', unlinkErr);
              } else {
                console.log('Deleted photo during home delete:', oldFilePath);
              }
            });
          } else {
            console.log('Photo not found during home delete, skipping:', oldFilePath);
          }
        });
      }

      return Home.findByIdAndDelete(homeId);
    })
    .then(() => {
      res.redirect('/host/host-home-list');
    })
    .catch((error) => {
      console.log('Error deleting home:', error);
      res.redirect('/host/host-home-list');
    });
};
