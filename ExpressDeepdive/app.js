// core modules
const http= require('http');
// external modules
const express = require ('express');
const bodyParser = require('body-parser');
// local modules
const app = express();
const PORT= 3002;
app.use((req, res, next)=>{
    console.log('In the first middleware!', req.url, req.method);
    next();
})
app.use((req, res, next)=>{
    console.log('In the second middleware!', req.url, req.method);
    next();
})
// app.use((req, res, next)=>{
//     console.log('In the third middleware!', req.url, req.method);
//     res.send('<h1>Hello from Express.js server!</h1>');
// })
app.get('/', (req, res, next)=>{
    console.log('Handling / for GET');
    res.send('<h1>Hello from Express.js server!</h1>');
});

app.get('/contact-us', (req, res, next)=>{
    console.log('Handling /contact-us for GET');
    res.send(
    `<h1>Please give your details here</h1>
    <form action="/contact-us" method="POST">
      <input type="text" name="name" placeholder="Enter your name" />
      <input type="email" name="email" placeholder="Enter your Email" />
      <input type="Submit" />
    </form>
    `);
});
app.use(bodyParser.urlencoded());
app.post('/contact-us', (req, res, next)=>{
    console.log('Handling /contact-us for POST', req.url, req.method, req.body);
    res.send('<h1>Thanks for submitting your details.</h1>');
});
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});