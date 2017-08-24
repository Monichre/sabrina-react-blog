import React, {Component} from 'react'
import _ from 'lodash'
import {Link} from 'react-router'
import AppDispatcher from '../../Dispatcher/AppDispatcher'
var config = require('../../config').config

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
                                        <form name="ajax-form" id="ajax-form" action="mail-it.php" method="post">
                                            <div className="col-sm-6" data-scroll-reveal="enter bottom move 100px over 0.6s after 0.2s">
                                                <label for="name"></label>
                                                <input name="name" id="name" type="text" placeholder="Name: *"/>
                                            </div>
                                            <div className="col-sm-6" data-scroll-reveal="enter bottom move 100px over 0.6s after 0.2s">
                                                <label for="email"></label>
                                                <input name="email" id="email" type="text" placeholder="E-Mail: *"/>
                                            </div>
                                            <div className="col-sm-12" data-scroll-reveal="enter bottom move 100px over 0.6s after 0.2s">
                                                <label for="message"></label>
                                                <textarea name="message" id="message" placeholder="Message"></textarea>
                                            </div>
                                            <div className="col-sm-12" data-scroll-reveal="enter bottom move 100px over 0.6s after 0.2s">
                                                <div id="button-con">
                                                    <button className="send_message" id="send">
                                                        <span data-hover="submit">Send</span>
                                                    </button>
                                                </div>
                                            </div>

                                        </form>
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
