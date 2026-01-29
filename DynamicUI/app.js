//core modules
const path= require('path');
// external modules
const express = require('express');
// local modules
const {hostRouter}= require('./routes/hostRouter');
const userRouter= require('./routes/userRouter');
const rootDir= require('./utils/pathUtil');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(userRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next)=>{
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

const PORT= 3000;
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});
