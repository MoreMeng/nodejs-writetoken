const express = require('express')
const fs = require('fs')
const app = express()

const filePath = __dirname + '/token/data.txt'

app.use('/token', express.static(__dirname + '/token'))
app.use(express.static(__dirname + '/token'))

app.post('/token', (req, res) => {
  let body = ''
  req.on('data', data => {
    body = data
  })

  req.on('end', () => {
    fs.writeFile(filePath, body, () => {
      res.end()
    })
  })
})

app.get('/token', (req, res) => {
  let token = fs.readFileSync(filePath)
  console.log(`${token}`)
})
app.listen(8009)
