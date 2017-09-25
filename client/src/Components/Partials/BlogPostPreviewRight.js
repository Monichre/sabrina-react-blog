// Work.js
import React, {Component} from 'react'
import _ from 'lodash'
import config from '../../config'

// Components




// Dispatcher
import AppDispatcher from '../../Dispatcher/AppDispatcher'

export default class BlogPostPreviewRight extends Component {
	render(){
		return(
			<section className="flat-row flat-our blog-post-preview">
                <div className="container">
                    <div className="row">
						<div className="col-md-6 hide_on_mobile">
                            <img src={this.props.image}alt="images" className="object-fit" />
                        </div>
                        <div className="col-md-6">
                            <div className="flat-divider d96px"></div>
                            <div className="wrap-content-story">
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
								<div className="content-story" dangerouslySetInnerHTML={{ __html: this.props.content}} />
								<div className="read-more">{this.props.readMore}</div>
                            </div>
                        </div>

                        </div>

                    </div>

                </section>
		)
	}
}
