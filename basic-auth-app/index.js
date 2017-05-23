var express = require('express')
var auth = require('basic-auth')
var app = express()

app.get('/', function (req, res) {

  var credentials = auth(req)
 
  if (!credentials || credentials.name !== 'john' || credentials.pass !== 'secret') {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('Access denied')
  } else {
    res.end('Access granted')
  }

})

app.listen(8080, function () {
  console.log('Example app listening on port 3000!')
})
