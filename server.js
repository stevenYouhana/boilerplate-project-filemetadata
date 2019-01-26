'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({storage: storage, limits: {fileSize: 30000000}});

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  console.log("upload post!");
  res.send({name: req.file.originalname, size: req.file.size});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
