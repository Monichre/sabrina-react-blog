import React, {Component} from 'react'
import _ from 'lodash'
import {Link} from 'react-router'
import AppDispatcher from '../../Dispatcher/AppDispatcher'
// import NodeMailer from 'nodemailer'
var config = require('../../config').config


class Form extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			email:'',
			message:''
		}

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleMessageChange = this.handleMessageChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event){
		event.preventDefault()
		console.log(this.state)
	}
	handleNameChange(event) {
		let name = event.target.value
		console.log(name)
		this.setState({name: name})

	}
	handleEmailChange(event) {
		let email = event.target.value
		console.log(email)
		this.setState({email: email})
	}
	handleMessageChange(event) {
		let message = event.target.value
		console.log(message)
		this.setState({message: message})
	}
	sendTheEmail(){
		// create reusable transporter object using the default SMTP transport
		// let transporter = NodeMailer.createTransport({
		//     host: 'smtp.gmail.com',
		//     port: 465,
		//     secure: true, // secure:true for port 465, secure:false for port 587
		//     auth: {
		//         user: 'liamhellis@gmail.com',
		//         pass: '102IndiaStreet'
		//     }
		// });
		//
		// // setup email data with unicode symbols
		// const mailOptions = {
		// 		from: this.state.name,
		// 	    to: 'liamhellis@gmail.com', // list of receivers
		// 	    subject: 'Hello from Theresa on the Town ✔', // Subject line
		// 	    text: this.state.message, // plain text body
		// 	    html: `<b>${this.state.message}</b>`
		// }
		//
		// // send mail with defined transport object
		// transporter.sendMail(mailOptions, (error, info) => {
		//     if (error) {
		//         return console.log(error);
		//     }
		//     console.log('Message %s sent: %s', info.messageId, info.response);
		// });
	}
	render(){
		return (
			<form name="react-form" id="react-form" onSubmit={this.handleSubmit}>
				<div className="col-sm-6" data-scroll-reveal="enter bottom move 100px over 0.6s after 0.2s">
					<label for="name"></label>
					<input name="name" id="name" type="text" placeholder="Name: *" value={this.state.name.value} onChange={this.handleNameChange}/>
				</div>
				<div className="col-sm-6" data-scroll-reveal="enter bottom move 100px over 0.6s after 0.2s">
					<label for="email"></label>
					<input name="email" id="email" type="text" placeholder="Email: *" value={this.state.email.value} onChange={this.handleEmailChange}/>
				</div>
				<div className="col-sm-12" data-scroll-reveal="enter bottom move 100px over 0.6s after 0.2s">
					<label for="message"></label>
					<textarea name="message" id="message" placeholder="Message: *" value={this.state.message.value} onChange={this.handleMessageChange}></textarea>
				</div>
				<div className="col-sm-12" data-scroll-reveal="enter bottom move 100px over 0.6s after 0.2s">
					<div id="button-con">
						<button className="send_message" id="send" type='submit'>
							<span data-hover="submit">Send</span>
						</button>
					</div>
				</div>

			</form>
		)
	}
}

export default class About extends Component {

    componentWillMount() {
        this.getPageData()
    }

    componentDidMount() {
        const data = this.props.data
		console.log(data)
		// document.title = config.site.title + ' | ' + data.page.title

    }

    getPageData() {
        AppDispatcher.dispatch({action: 'get-page-data', page_slug: 'about'})
    }



    render() {
		const data = this.props.data
		const image_bg = data.page.metafield.photo.url
		const about_styles = {
			position: 'relative',
			height: '100vh',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundImage: 'url(' + image_bg + ')'
		}

        return (
            <div id="about" style={about_styles}>
                <section className="col-md-6" id="form-half">
                    <div className="container-fluid">
                        <div className="row"></div>
                        <div className="row">
                            <div className="col-sm-4">

                                <div className="col-sm-12 contact-top">
                                    <address>
                                        <div className="section-headline">
                                            <h3>Contact Me
                                            </h3>
                                        </div>
										<span>
											Theresa on the Town
                                            <br />
                                                NYC
										</span>
                                    </address>
                                </div>
								<br /><br />
							</div>
                            <div className="col-sm-12">
                                <Form />
                            </div>
                        </div>
                    </div>
                </section>
				<div id="form-second-half">
					<div className="col-md-12">
		                <div className="title-section">
		                    <div className="top-section">Find Out</div>
		                    <h1 className="title">About Me</h1>
		                </div>
						<div class="blockquote-testimo">
	                        <p>About Me Content from page</p>
	                    </div>
						<div className="title-testimonial">
	                        <h6 className="title">Sabrina Smith</h6>
	                        <p>Owner</p>
	                    </div>
		            </div>
				</div>

			</div>
		)
	}
}
