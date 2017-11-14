// Footer.js
import React, { Component } from 'react'
import IFrame from 'react-iframe'
import Axios from 'axios'
import SubscriptionStatus from './SubscriptionStatus'



export default class Footer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			subscriptionEmail: '',
			email_sent: false
		}
	}
	handleInput(e) {
		console.log(e.target.value)
		this.setState({
			subscriptionEmail: e.target.value
		})
	}
	sendSubscription(e){
		e.preventDefault()
		let _this = this
        Axios.post('/subscribe', {
            email_address: this.state.subscriptionEmail
        })
        .then(function(res) {
			console.log(res)
            
            if (res.status === 200) {
                _this.setState({email_sent: true})
            }
        })
        .catch(function (error) {
            console.log(error)
        })
	}

  render(){

	const data = this.props.data
	const footerText = data.footerCTA
	const popup_style = {
		backgroundColor: '#000000'
	}
	const style = {
		width: '100%',
		border: 0,
		overflow: 'hidden'
	}
	let text
	let placeholder
	if (this.state.email_sent) {
		
		text = "Sent!"
		placeholder = 'Thank You!'
		
	} else {
		text = "subscribe"
		placeholder = 'Email'
		
	}

    return (
      <footer>
		  <br />
		  <br />
        <div>	
		
			<div className="iframe-widget">
				<IFrame
					style={style}
					className="lightwidget-widget"
					url="https://lightwidget.com/widgets/63cb858f80325e56b899aaf55b521c74.html"/>
				<script src="https://lightwidget.com/widgets/lightwidget.js"></script>
			</div>
			<footer id="main-footer">
				<div className="container-fluid footer-bottom">
					<div className="row">

						<div className="footer-form">
							<div className="col-md-6">
								<div className="section-headline">
									<h3>{footerText.fields.header}</h3>
								</div>
								<p>{footerText.fields.subHeader}</p>
							</div>
							<div className="col-md-6">
								<form id="footer_subscribe-form" onSubmit={this.sendSubscription.bind(this)}>
										<input id="footer_input" type="text" placeholder={placeholder} name="footer_input" required="required" value={this.state.subscriptionEmail} className="subscribe-style" onChange={this.handleInput.bind(this)}/>
										<button id="footerButton" type="send" className="w-button subscribe-button">{text}</button>
								</form>
							</div>
						</div>

					</div>
					<hr />
					<div className="row">
						<div className="col-xs-12">
							<div className="footer-social-block">
								<a href="https://www.instagram.com/theresaonthetown/" target="_blank" rel="noopener"><i className="fa fa-lg fa-instagram w-inline-block social-wrap"></i></a>
								<a href="https://www.youtube.com/channel/UCvZKd-eUuq8A66J-uLr4CZQ" target="_blank" rel="noopener"><i className="fa fa-lg fa-youtube w-inline-block social-wrap"></i></a>
								<a href="https://www.facebook.com/theresaonthetown/" target="_blank" rel="noopener"><i className="fa fa-lg fa-facebook w-inline-block social-wrap"></i></a>
								<a href="https://www.pinterest.com/theresaonthetwn/" target="_blank" rel="noopener"><i className="fa fa-lg fa-pinterest w-inline-block social-wrap"></i></a>
							</div>
						</div>
						<div className="col-sm-3">
							<div className="footer-text">
								<span className="footer-text-span">Theresa on the Town</span>
							</div>
						</div>
						<div className="col-sm-6">

						</div>
						<div className="col-sm-3">
							<div id="loveCraft">
								<a href="http://www.lovecraft.io/"><span className="loveCraft"><span className="blue">Love</span><span className="red">Craft</span><span className="white">.io</span></span></a>
							</div>
						</div>

					</div>
				</div>
			</footer>
		</div>
      </footer>
    )
  }
}
