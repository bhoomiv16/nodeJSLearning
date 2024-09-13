const { createReadStream } = require("fs");
const http = require("http");
const {parse}=require("querystring")





let server = http.createServer((req, res) => {
    if (req.method==="POST") {
        if(req.headers["content-type"]==="application/x-www-form-urlencoded"){
            let body="";
            req.on("data",(chunks)=>{
                body+=chunks;
            })
            req.on("end",()=>{
                console.log(body);
                
                console.log(parse(body));
                res.end("Messsage sent!")
            })
        }
        else{
            res.end("Not a form data")
        }
        
    } else {
        if (req.url === "/" || req.url === "/home") {
            res.writeHead(200, "Okay", { "content-type": "text/html" });
            let data = createReadStream("./Home.html", "utf-8");
            data.pipe(res);
          } else if (req.url === "/about") {
            res.writeHead(200, "Okay", { "content-type": "text/html" });
            let data = createReadStream("./About.html", "utf-8");
            data.pipe(res);
          } else if (req.url === "/contact") {
            res.writeHead(200, "Okay", { "content-type": "text/html" });
            let data = createReadStream("./Contact.html", "utf-8");
            data.pipe(res);
          }
          else if (req.url==="/css") {
            res.writeHead(200, { "Content-Type": "text/css" });
            let data = createReadStream("./index.css", "utf-8");
            data.pipe(res);
          }
          else{
            res.writeHead(404,"Not found",{"content-type":"text/html"})
            let data=createReadStream("./PageNotFound.html","utf-8")
            data.pipe(res);
          }
        
    }
 
});

server.listen(5000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is up and running in port 5000");
  }
});
