// Work.js
import React, {Component} from 'react'
import _ from 'lodash'
import config from '../../config'

// Components
import Header from '../Partials/SiteComponents/Header'



// Dispatcher
import AppDispatcher from '../../Dispatcher/AppDispatcher'

export default class BlogPostPreviewRight extends Component {
	render(){
		return(
			<section className="flat-row flat-our">
                <div className="container">
                    <div className="row">
						<div className="col-md-6">
                            <img src={this.props.image}alt="images" className="object-fit" />
                            </div>
                        <div className="col-md-6">
                            <div className="flat-divider d96px"></div>
                            <div className="wrap-content-story">
                                <div className="title-section style2 ">
                                    <h1 className="title">{this.props.title}</h1>
									<p className="date-event date-style-2"> <span>{this.props.date}</span></p>
                                </div>
                                <div className="entry-post">
                                    <div className="read-more">
                                        {this.props.readMore}
                                    </div>
                                </div>
                                <p className="content-story" dangerouslySetInnerHTML={{ __html: this.props.content, class:"content-story"}} />

                            </div>
                        </div>

                        </div>

                    </div>

                </section>
		)
	}
}
