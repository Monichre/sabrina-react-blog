// Work.js
import React, {Component} from 'react'
import ReactMarkdown from 'react-markdown'
import TRIM from '../../utils'

// Components


// Dispatcher
import AppDispatcher from '../../Dispatcher/AppDispatcher'

export default class BlogPostPreviewLeft extends Component {
    render() {
        return (

            <section className="flat-row flat-our blog-post-preview">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="flat-divider d47px"></div>
                            <div className="wrap-content-story-left">
                                <div className="title-section style2 ">
                                    <h1 className="title">{this.props.title}</h1>
                                </div>
                                <div className="entry-post">
                                    <div className="col-md-6 show_on_mobile">
                                        <img src={this.props.image}alt="images" className="object-fit" />
                                    </div>
                                    <p className="date-event date-style-2"> <span>{this.props.date}</span></p>
									<br />
                                </div>
								<div className="content-story">
                                    <ReactMarkdown source={TRIM(this.props.content)} />
                                </div>
								<div className="read-more">{this.props.readMore}</div>
                            </div>
                            <div className="flat-divider d47px"></div>
                        </div>
                        <div className="col-md-6 hide_on_mobile">
                            <img src={this.props.image}alt="images" className="object-fit" />
                        </div>

                    </div>

                </div>
            </section>
			)
		}
	}