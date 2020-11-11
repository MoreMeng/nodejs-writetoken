var request = require('request');
var options = {
  method: 'POST',
  url: 'http://ucws.nhso.go.th:80/ucwstokenp1/UCWSTokenP1',
  'headers': {
    'Accept-Encoding': ' gzip,deflate',
    'Content-Type': ' text/xml;charset=UTF-8',
    'SOAPAction': ' ""',
    'Content-Length': ' 488',
    'Host': ' ucws.nhso.go.th:80',
    'Connection': ' Keep-Alive'
  },
  body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tok="http://tokenws.ucws.nhso.go.th/">   <soapenv:Header/><soapenv:Body><tok:searchCurrentByPID><!--Optional:--><user_person_id>1839900250118</user_person_id><!--Optional:--><smctoken>t3bk778j5751946u</smctoken><!--Optional:--><person_id>3150300174300</person_id></tok:searchCurrentByPID></soapenv:Body></soapenv:Envelope>`,
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});