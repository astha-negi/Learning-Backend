const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    res.setHeader('Content-Type', 'text/html');

    let message = '';

    if (req.url === '/home') {
        message = 'Welcome to the Home Page!';
    } 
    else if (req.url === '/products') {
        message = 'Check out our Products!';
    } 
    else if (req.url === '/contact') {
        message = 'Contact Us';
    } 
    else {
        res.statusCode = 404;
        message = 'Page Not Found';
    }

    res.write(`
        <html lang="en">
        <head>
            <title>Myntra</title>
        </head>
        <body>
            <h1>${message}</h1>
            <nav>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/products">Products</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                </ul>
            </nav>
            <p>Fashion and Lifestyle</p>
        </body>
        </html>
    `);

    res.end();
});

server.listen(4000, () => {
    console.log('Server is listening on port 4000');
});
