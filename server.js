const express = require("express");
const path = require("path");
const serveStatic = require("serve-static")

const port = process.env.PORT || 3330;
const app = express();

app.use(express.static(__dirname));
app.use(serveStatic(path.join(__dirname, 'dist')));
app.listen(port);
console.log('server started ' + port);