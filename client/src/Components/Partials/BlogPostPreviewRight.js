// Work.js
import React, {Component} from 'react'
import AppDispatcher from '../../Dispatcher/AppDispatcher'
import ReactMarkdown from 'react-markdown'
import CONSTANTS from '../../constants'
import { Link } from 'react-router-dom'

export default class BlogPostPreviewRight extends Component {
	render(){
        let subTitle
        if (this.props.subTitle) {
            subTitle = <h5 className="sub_title">{this.props.subTitle}</h5>
        } else {
            subTitle = <h5 className="sub_title"></h5>
        }
		return(
			<section className="flat-row flat-our blog-post-preview">
                <div className="container">
                    <div className="row">
						<div className="col-md-6 hide_on_mobile">
                            <Link to={this.props.article_link}><img src={this.props.image} alt={this.props.title} className="object-fit" /></Link>
                        </div>
                        <div className="col-md-6">
                            <div className="col-sm-12">
                                <div className="flat-divider d47px"></div>
                                <div>
                                    <div className="title-section style2 ">
                                        <h1 className="title"><Link to={this.props.article_link}>{this.props.title}</Link></h1>
                                        {subTitle}
                                    <p className="date-event date-style-2 show_on_mobile"> <span>{this.props.date}</span></p>
                                    </div>
                                    <div className="entry-post">
                                        <div className="show_on_mobile">
                                            <Link to={this.props.article_link}><img src={this.props.image} alt={this.props.title} className="object-fit" /></Link>
                                        </div>
                                        <p className="date-event date-style-2 hide_on_mobile"> <span>{this.props.date}</span></p>
                                    </div>
                                    <div className="content-story">
                                        <ReactMarkdown source={this.props.previewContent} />
                                    </div>
                                    <div className="read-more">{this.props.readMore}</div>
                                </div>
                                <div className="flat-divider d47px"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
		)
	}
}
