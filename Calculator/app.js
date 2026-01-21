const http= require ('http');
const {requestHandler}= require('./handler');
const server= http.createServer(requestHandler);
const PORT= 5000;
server.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});