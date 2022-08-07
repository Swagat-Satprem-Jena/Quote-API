const http = require("http");
const fs = require("fs");
const requests = require("requests");

const htmlFile = fs.readFileSync("index.html", "utf-8");

const replacePlaceHolders = (originalFile, upd) => {
    originalFile = originalFile.replace("{%quote%}", upd.q);
    originalFile = originalFile.replace("{%author%}", upd.a);
    return originalFile;
}


const server = http.createServer((req, res) => {
    if(req.url === "/")
    {
        requests("https://zenquotes.io/api/random")
        .on("data", (chunk) => {
            // console.log(chunk);
            let quoteObj = JSON.parse(chunk);
            // console.log(quoteObj);
            let realTimeData = replacePlaceHolders(htmlFile, quoteObj[0]);
            // console.log(htmlFile);
            res.write(realTimeData);
        })

        .on("end", (err) => {
            if(err)
            console.log(err);
            res.end();
        })
    }
});

server.listen(8000, "127.0.0.1");

