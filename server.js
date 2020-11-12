const request = require('request')
const express = require('express')
const fs = require('fs')
const parseString = require('xml2js').parseString
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

  let modify = fs.stat(filePath, (err, stats) => {
    if (err) {
      throw err;
    }

    let token = fs.readFileSync(filePath)

    console.log(`${token}`)
    console.log(`File Data Last Modified: ${stats.mtime}`);

    let msg = `${token}<br/>${stats.mtime}`

    res.send(msg)
  })
})

app.get('/nhso/:cid', (req, res) => {
  let rfs = fs.readFileSync(filePath) + ''
  // console.log(`${rfs}`)
  // 1159900139892#64aqmw668uhi2473
  const token = rfs.split('\#')
  // console.log(token[1])
  let url = 'http://ucws.nhso.go.th:80/ucwstokenp1/UCWSTokenP1'

  let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tok="http://tokenws.ucws.nhso.go.th/">   <soapenv:Header/><soapenv:Body><tok:searchCurrentByPID><user_person_id>${token[0]}</user_person_id><smctoken>${token[1]}</smctoken><person_id>${req.params.cid}</person_id></tok:searchCurrentByPID></soapenv:Body></soapenv:Envelope>`

  // let args = {
  //   user_person_id: token[0],
  //   smctoken: token[1],
  //   person_id: req.params.cid,
  //   length: xml.length
  // }
  // console.log(args);

  let options = {
    method: 'POST',
    url: url,
    'headers': {
      'Accept-Encoding': 'gzip,deflate',
      'Content-Type': 'text/xml;charset=UTF-8',
      'SOAPAction': '""',
      'Content-Length': xml.length,
      'Host': 'ucws.nhso.go.th:80',
      'Connection': 'Keep-Alive'
    },
    body: xml
  }
  request(options, (error, response) => {
    if (error) throw new Error(error)
    console.log(response.body)

    parseString(response.body, (err, result) => {
      console.log(result)

      let profile = result["S:Envelope"]["S:Body"][0]["ns2:searchCurrentByPIDResponse"][0]["return"][0]

      console.log(profile)
      console.log(profile.person_id[0])
      // console.log(`${profile.title_name[0]} ${profile.fname[0]} ${profile.lname[0]}`)
      // console.log(`${profile.hmain[0]} ${profile.hmain_name[0]}`)
      // console.log(`${profile.primary_tumbon_name[0]} ${profile.primary_amphur_name[0]} ${profile.primary_province_name[0]}`)
      // // console.log(profile.purchaseprovince_name[0])
      // console.log(`${profile.subinscl[0]} ${profile.subinscl_name[0]}`)

      res.send(`${profile.title_name[0]} ${profile.fname[0]} / ${profile.primary_province_name[0]} / ${profile.subinscl[0]} ${profile.subinscl_name[0]}`)
    })
  })
})

app.listen(8009, () => {
  console.log('server started')
})