const fs = require("fs");
const http = require("http");
const querystring = require("querystring");
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url==="/add-task") {
    if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
      let body = "";
      req.on("data", (chunks) => {
        body += chunks;
      });
      req.on("end", () => {
        console.log(body);
        const formdata = querystring.parse(body);
        console.log(formdata);
        res.end("Message sent!");
      });
    } else {
      res.end("Not a form data");
    }
  } else {
    if (req.url === "/home") {
      res.writeHead(200, "Okay", { "content-type": "text/html" });
      let data = fs.createReadStream("index.html", "utf-8");
      data.pipe(res);
    } else if (req.url === "/css") {
      res.writeHead(200, "Okay", { "content-type": "text/css" });
      let data = fs.createReadStream("index.css", "utf-8");
      data.pipe(res);
    } else {
      res.writeHead(404, "Not found", { "content-type": "text/html" });
      res.end("<h1>Page Not Found</h1>");
    }
  }
});

server.listen(5000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is up and running");
  }
});
