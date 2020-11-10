const express = require('express')
const fs = require('fs')
const app = express()

app.use('/token', express.static(__dirname + '/token'))
app.use(express.static(__dirname + '/token'))

app.post('/token', function (request, respond) {
  var body = ''
  filePath = __dirname + '/token/data.txt'
  request.on('data', function (data) {
    body = data
  })

  request.on('end', function () {
    fs.writeFile(filePath, body, function () {
      respond.end()
    })
  })
})

app.listen(8009)