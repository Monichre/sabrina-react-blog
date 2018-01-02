import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import AppDispatcher from '../../Dispatcher/AppDispatcher'
import Axios from 'axios'
import EmailStatus from '../Partials/SiteComponents/EmailStatus'
import ReactMarkdown from 'react-markdown'


class Form extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			email: '',
			message: '',
			email_sent: false,
			displayEmailModal: false
		}

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleMessageChange = this.handleMessageChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault()
		this.sendTheEmail()
	}
	handleNameChange(event) {
		let name = event.target.value
		this.setState({ name: name })

	}
	handleEmailChange(event) {
		let email = event.target.value
		this.setState({ email: email })
	}
	handleMessageChange(event) {
		let message = event.target.value
		this.setState({ message: message })
	}
	sendTheEmail() {
		let _this = this
		Axios.post('/send-mail', {
			name: this.state.name,
			email_address: this.state.email,
			message: this.state.message
		})
			.then(function (res) {
				if (res.status === 200) {
					_this.setState({ email_sent: true })
				}
			})
			.catch(function (error) {
			})
	}
	handleEmailCloseClick() {
		this.setState({ email_sent: false })
	}
	render() {

		let EMAIL_MODAL
		if (this.state.email_sent) {
			EMAIL_MODAL = <EmailStatus closeEmail={this.handleEmailCloseClick.bind(this)} />

		}
		return (
			<div>

				{EMAIL_MODAL}

				<form name="react-form" id="react-form" onSubmit={this.handleSubmit}>
					<div className="col-sm-6" data-scroll-reveal="enter bottom move 100px over 0.6s after 0.2s">
						<label for="name"></label>
						<input name="name" id="name" type="text" placeholder="Name: *" value={this.state.name.value} onChange={this.handleNameChange} />
					</div>
					<div className="col-sm-6" data-scroll-reveal="enter bottom move 100px over 0.6s after 0.2s">
						<label for="email"></label>
						<input name="email" id="email" type="text" placeholder="Email: *" value={this.state.email.value} onChange={this.handleEmailChange} />
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
			</div>
		)
	}
}

export default class About extends Component {

	componentWillMount() {
		this.getPageData()
	}

	componentDidMount() {
		const data = this.props.data

	}

	getPageData() {
		AppDispatcher.dispatch({ action: 'get-page-data', page_slug: 'About' })
	}



	render() {
		const data = this.props.data
		const contactPage = data.pages.find(page => page.sys.id === "644zcWA1i0MkSss6u8EcYg")
		const image_bg = data.page.fields.backgroundPhoto.fields.file.url
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
				<Helmet>
					<title>Theresa on the Town | {data.page.fields.title}</title>
					<meta name="description" content={data.page.fields.metaDescription} />
					<meta name="keywords" content={data.page.fields.metaTags} />
				</Helmet>

				<div id="form-half"></div>

				<div id="AboutContactTopLayer">
					<section className="col-md-6">
						<div className="row">
							<div className="col-xs-12">
								<div className="row">
									<section className="about-me">
										<div className="title-section">
											<h1 className="title">About Me</h1>
										</div>
										<div className="blockquote-testimo">
											<ReactMarkdown source={data.page.fields.content} />
										</div>
									</section>
									<div className="contact-me">
										<div className="title-section">
											<h1 className="contact-header">{contactPage.fields.title}</h1>
										</div>
										<p>{contactPage.fields.content}</p>
									</div>
								</div>
								<Form />
							</div>
						</div>
					</section>
				</div>
			</div>
		)
	}
}
