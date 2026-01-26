// core modules
const http= require('http');
// external modules
const express = require ('express');
// local modules
const app = express();
app.use((req, res, next)=>{
    console.log('In the first middleware!', req.url, req.method);
    next();
})
app.use((req, res, next)=>{
    console.log('In the second middleware!', req.url, req.method);
    res.send('<h1>Hello from Express.js server!</h1>');
})
 
const PORT= 3002                
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});