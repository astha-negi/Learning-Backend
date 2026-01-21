const sumRequestHandler= (req, res)=>{
    console.log('Inside sumRequestHandler', req.url);
    const body=[]
    req.on('data', (chunk)=>{
        body.push(chunk);
    });
    req.on('end', ()=>{
        const fullBody= Buffer.concat(body).toString();  
        const params= new URLSearchParams(fullBody);
        const bodyObj= Object.fromEntries(params);
        const result= Number(bodyObj.firstNumber) + Number(bodyObj.secondNumber);
        console.log('Sum is:', result);      
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Calculator Result</title></head>');
        res.write('<body>')
        res.write(`<h1>Sum is: ${result}</h1>`);
        res.write('<a href="/calculator">Go back to Calculator</a>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
})
}
exports.sumRequestHandler= sumRequestHandler;