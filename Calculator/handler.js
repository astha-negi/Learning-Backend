const { sumRequestHandler } = require("./sum");

const requestHandler= (req, res)=>{
    console.log(req.url, req.method);
    if(req.url=== '/'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Calculator</title></head>');
    res.write('<body>')
    res.write('<h1>Welcome to calculator</h1>');
    res.write('<a href="/calculator">Go to Calculator</a>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
    }
    else if(req.url.toLowerCase()=== '/calculator' && req.method==='GET'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Calculator</title></head>');
    res.write('<body>')
    res.write('<h1>Here is calculator</h1>');
    res.write('<form action="/calculate-result" method="POST">');
    res.write('<input type="text" placeholder="Enter first number " name="firstNumber"/><br><br>');
    res.write('<input type="text" placeholder="Enter second number " name="secondNumber"/><br><br>');
    res.write('<input type="submit" value="Sum"/>');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
    }
    else if(req.url.toLowerCase()=== '/calculate-result' && req.method==='POST'){
    return sumRequestHandler(req, res);
    }
    else{
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Calculator</title></head>');
    res.write('<body>')
    res.write('<h1>404 Not Found</h1>');
    res.write('<a href="/">Go to Home</a>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
    }
}
exports.requestHandler= requestHandler;