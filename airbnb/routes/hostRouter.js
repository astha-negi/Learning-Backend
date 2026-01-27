//core modules
const path = require('path');
// external modules
const express = require('express');
const hostRouter = express.Router();
//local modules
const rootDir = require('../utils/pathUtil');

hostRouter.get("/add-home", (req, res, next)=>{
    res.sendFile(path.join(rootDir, 'views', 'addHome.html'));
});
hostRouter.post("/add-home", (req, res, next)=>{
    // console.log(req.body);
    res.sendFile(path.join(rootDir, 'views', 'homeAdded.html'));
});


module.exports = hostRouter;