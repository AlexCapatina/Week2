const http = require("http"); //CommonJS Module Pattern(CJS)
const fs = require("fs");
const mime = require("mime-types");

let lookup = mime.lookup;//alias for mime.lookup

const port = 3000;

const server = http.createServer(function(req, res)
{
    //console.log(__dirname);
    
    let path = req.url;//alias for req.url

    if(path == "/" || path == "/home"){
        path = "/index.html"
    }

    let mime_type = lookup(path.substring(1));
    console.log(`MIME TYPE: ${mime_type}`);

    //when we create a server instance, it is immutable = cannot be changed until the server is restarted
    fs.readFile(__dirname + path, function(err,data)
    {
        if(err)
        {
            res.writeHead(404);//file not found
            console.log(`ERROR: ${err.message}`);//output to dev console
            return res.end(err.message);//output the error message
        }
        //no error
        res.setHeader("X-Content-Type-Options", "nosniff");//security guard
        res.writeHead(200, {"Content-Type": mime_type});//status ok
        res.end(data);//output file that was read to the page
        console.log(`DATA: ${data}`);
    })
});

server.listen(port, function()
{
    console.log(`Server running at Port: ${port}`)
});