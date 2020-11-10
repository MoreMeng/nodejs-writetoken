var express = require ('express'), fs = require ('fs');
url = require ('url');
var app = express ();

app.use ('/json', express.static (__dirname + '/json'));
app.use (express.static (__dirname + '/json'));

app.post ('/receive', function (request, respond) {
  var body = '';
  filePath = __dirname + '/json/data.txt';
  request.on ('data', function (data) {
    body += data;
  });

  request.on ('end', function () {
    fs.writeFile (filePath, body, function () {
      respond.end ();
    });
  });
});

app.listen (8009);
