import React, { Component } from 'react'

import Axios from 'axios'

export default class BlogSignUp extends Component {
    
        constructor(props) {
            super(props)
            this.state = {
                name: '',
                email: '',
                email_sent: false
            }
        }
    
        handleSubmit(event){
            event.preventDefault()
            this.sendTheEmail()
        }
        handleFormEmail(event) {
            this.setState({email: event.target.value})
        }
        handleFormName(event) {
            this.setState({name: event.target.value})
        }
        sendTheEmail(){
            let _this = this
            Axios.post('/subscribe', {
                name: this.state.name,
                email_address: this.state.email
            })
            .then(function(res) {
                if (res.status === 200) {
                    _this.setState({
                        email_sent: true,
                    })
                }
            })
            .catch(function (error) {
                alert(error)
            })
        }
    
        render() {
           
            let text
            if (this.state.email_sent) {
                text = "Sent!"
            } else {
                text = "Sign Up!"
            }
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-md-offset-3">
                            <div className="reservation-page-left">
                                <div className="reservation-page-form">
                                    <div className="title-section">
                                        <h1 className="title">{this.props.cta.fields.header}</h1>
                                    </div>
                                    <br />
                                    <p className="content-story" style={{textAlign: 'center'}}>{this.props.cta.fields.subHeader}</p>
                                    <form id="reservation-form" onSubmit={this.handleSubmit.bind(this)}>
                                        <div className="reservation-page-input-box">
                                            <input type="text" className="form-control" placeholder="Name" value={this.state.name} name="name" id="blogPost-form-name" data-error="Subject field is required" required="" onChange={this.handleFormName.bind(this)}/>
                                        </div>	
                                        <div className="reservation-page-input-box">
                                            <input type="text" className="form-control" placeholder="Email" value={this.state.email} name="Email" id="blogPost-form-email" data-error="Subject field is required" required="" onChange={this.handleFormEmail.bind(this)}/>
                                        </div>
                                        <div className="reservation-booking">
                                            <button type="submit" className="book-now-btn">{text}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }