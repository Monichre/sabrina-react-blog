const express = require('express')
const NodeMailer = require('nodemailer')
const path = require('path')
const bodyParser = require('body-parser')

// var host;
// if (NODE_ENV === 'production') {
//     host = 'theresaonthetown.com'
// } else {
//     host = 
// }

const config =  {

  email_info : {
    host: 'box1052.bluehost.com',
	  port: 465,
	  secure: true,  // secure:true for port 465, secure:false for port 587
	  auth: {
	      user: 'sabrina@theresaonthetown.com',
	      pass: 'Happysabby1984@'
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

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));


// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.post('/send-mail', (req, res) => {
   
    const data = req.body
    const email_info = {
        from: `${data.name}, ${data.email_address}`,
        to: 'sabrina@theresaonthetown.com', 
        subject: 'New Message from your Website ✔', 
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

app.post('/subscribe', (req, res) => {
    
     const data = req.body
     const email_info = {
         from: `${data.email_address}`,
         to: 'sabrina@theresaonthetown.com', 
         subject: 'New Subscription to your Newsletter ✔', 
         text: `${data.email_address}`,
         html: `<b>${data.email_address}</b>`
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

 app.post('/webhook/contentful-images', (req, res) => {
    
     const data = req.body

     console.log(data)


    // $.post('https://api.shortpixel.com/v2/reducer_dev.php',JSON.stringify({
    //     "key": "<<YOUR_KEY_HERE>>",
    //     "plugin_version": "JS123",
    //     "lossy": 1,
    //     "resize": 0,
    //     "cmyk2rgb": 1,
    //     "refresh": 0,
    //     "urllist": ["https://www.your.domain/first/image.jpg", "https://www.your.domain/second/image.jpg"]
    // }), function (data) {
    //     alert('success');
    // });
 
 })

app.listen(app.get('port'), function() {
    console.log('server running on: ' + app.get('port'))
})

module.exports = app
