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
   
    const data = req.body
    const email_info = {
        from: `${data.name}, ${data.email_address}`,
        to: 'liamhellis@gmail.com', 
        subject: 'Hello from Theresa on the Town ✔', 
        text: data.message,
        html: `<b>${data.message}</b>`
    }
    let res_status
    transporter.sendMail(email_info, (error, info) => {
        if (error) {
            res_status = false
            console.log(error)
            return res_status
        } else {
            res_status = true
            console.log('Message %s sent: %s', info.messageId, info.response)
        }
    })
    res.json({success: res_status})

})

app.listen(app.get('port'), function() {
    console.log('server running on: ' + app.get('port'))
})

module.exports = app