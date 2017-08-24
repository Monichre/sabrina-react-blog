// Work.js
import React, {Component} from 'react'
import _ from 'lodash'
import config from '../../config'

// Components


// Dispatcher
import AppDispatcher from '../../Dispatcher/AppDispatcher'

export default class BlogPostPreviewLeft extends Component {
    render() {
        return (

            <section className="flat-row flat-our">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="flat-divider d96px"></div>
                            <div className="wrap-content-story-left">
                                <div className="title-section style2 ">
                                    <h1 className="title">{this.props.title}</h1>
                                </div>
                                <div className="entry-post">
									<p className="date-event date-style-2"> <span>{this.props.date}</span></p>
                                    <div className="read-more">
                                        <a href="#">{this.props.readMore}</a>
                                    </div>
                                </div>

								<p className="content-story" dangerouslySetInnerHTML={{ __html: this.props.content}} />

                            </div>
                        </div>
                        <div className="col-md-6">
                            <img src={this.props.image}alt="images" className="object-fit" />

                            </div>

                        </div>

                    </div>

                </section>
			);
		}
	}
