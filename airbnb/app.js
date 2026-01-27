//core modules
const path= require('path');
// external modules
const express = require('express');
// local modules
const hostRouter= require('./routes/hostRouter');
const userRouter= require('./routes/userRouter');
const rootDir= require('./utils/pathUtil');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(userRouter);
app.use("/host", hostRouter);

app.use((req, res, next)=>{
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

const PORT= 3000;
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});
