const http= require('http');

const server= http.createServer((req, res)=>{
    console.log(req.url, req.method, req.headers);
    if(req.url=== '/'){
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hello, World!\n');
    return res.end();
}else if(req.url=== '/about'){
    res.setHeader('Content-Type', 'text/plain');
    res.write('another port address!\n');
    return res.end();
}else{
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode= 404;
    res.write('Page not found\n');
    return res.end();
}
});
const port= 3000
server.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
});

