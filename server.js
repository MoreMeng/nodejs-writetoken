const soapRequest = require('easy-soap-request')
const express = require('express')
const soap = require('soap')
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

app.get('/nhso/:cid', (req, res) => {
  let rfs = fs.readFileSync(filePath) + ''
  // console.log(`${rfs}`)
  // 1159900139892#64aqmw668uhi2473
  const token = rfs.split('\#')
  // console.log(token[1])
  // let url = 'http://ucws.nhso.go.th/ucwstokenp1/UCWSTokenP1?WSDL';
  // let args = {
  //   user_person_id: token[0],
  //   smctoken: token[1],
  //   person_id: req.params.cid
  // }
  // console.log(args);
  // example data
  var url = 'http://ucws.nhso.go.th/ucwstokenp1/UCWSTokenP1';
  // var url = 'http://tokenws.ucws.nhso.go.th/UCWSTokenP1/searchCurrentByPIDRequest';
  var sampleHeaders = {
    'SOAPAction': 'http://tokenws.ucws.nhso.go.th/UCWSTokenP1/searchCurrentByPIDRequest',
    'operation': 'searchCurrentByPID',
    'Content-Type': 'text/xml;charset=UTF-8',
  }
  var xml = `<S:Envelope
  xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAPENV="http://schemas.xmlsoap.org/soap/envelope/">
   <SOAP-ENV:Header/>
   <S:Body>
   <ns2:searchCurrentByPID xmlns:ns2="http://tokenws.ucws.nhso.go.th/">
        <user_person_id>${token[0]}</user_person_id>
        <smctoken>${token[1]}</smctoken>
        <person_id>${req.params.cid}</person_id>
        </ns2:searchCurrentByPID>
    </S:Body>
  </S:Envelope>`;

  // console.log(xml);
  // usage of module
  (async () => {
    const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 10000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;
    console.log(headers);
    console.log(body);
    console.log(statusCode);
  })();

})

app.listen(8009)