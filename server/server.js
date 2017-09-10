const express = require('express')
const NodeMailer = require('nodemailer')
const path = require('path')
const bodyParser = require('body-parser')

const config =  {

  email_info : {
    host: 'smtp.gmail.com',
	  port: 465,
	  secure: true,  // secure:true for port 465, secure:false for port 587
	  auth: {
	      user: 'liamhellis@gmail.com',
	      pass: '102IndiaStreet'
	  }
  }
}
const app = express()
const transporter = NodeMailer.createTransport({
    host: config.email_info.host,
    port: config.email_info.port,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: config.email_info.auth.user,
        pass: config.email_info.auth.pass
    }
})

app.set('port', (process.env.PORT || 3001))

// app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Cache-Control', 'no-cache')
    next()
})

app.get('*', (req, res) => {
    res.json({
        success: true
    })
});

app.post('/send-mail', (req, res) => {
    console.log(req)

    console.log(req)

    const email_info = {
        from:'Theresa on the town',
        to: 'liamhellis@gmail.com', // list of receivers
        subject: 'Hello from Theresa on the Town ✔', // Subject line
        text: 'Is it working?', // plain text body
        html: `<b>Is it working?</b>`
    }
    transporter.sendMail(email_info, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message %s sent: %s', info.messageId, info.response)
    })

})

app.listen(app.get('port'), function() {
    console.log('server running on: ' + app.get('port'))
})

module.exports = app