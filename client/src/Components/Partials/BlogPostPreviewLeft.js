// Work.js
import React, {Component} from 'react'
import ReactMarkdown from 'react-markdown'
import TRIM from '../../utils'

// Components


// Dispatcher
import AppDispatcher from '../../Dispatcher/AppDispatcher'

export default class BlogPostPreviewLeft extends Component {
    render() {
        let subTitle
        if (this.props.subTitle) {
            subTitle = <h5 className="sub_title">{this.props.subTitle}</h5>
        } else {
            subTitle = <h5 className="sub_title"></h5>
        }
 
        return (

            <section className="flat-row flat-our blog-post-preview">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="flat-divider d47px"></div>
                            <div className="wrap-content-story-left">
                                <div className="title-section style2 ">
                                    <h1 className="title">{this.props.title}</h1>
                                    {subTitle}
                                    <p className="date-event date-style-2 show_on_mobile"> <span>{this.props.date}</span></p>
                                </div>
                                <div className="entry-post">
                                    <div className="show_on_mobile">
                                    <img src={this.props.image + '?w=555&h=500'} alt={this.props.title} className="" />
                                    </div>
                                    <p className="date-event date-style-2 hide_on_mobile"> <span>{this.props.date}</span></p>
                                </div>
								<div className="content-story">
                                <ReactMarkdown source={TRIM(this.props.content)} disallowedTypes={['Image']} escapeHtml={false}/>
                                </div>
								<div className="read-more">{this.props.readMore}</div>
                            </div>
                            <div className="flat-divider d47px"></div>
                        </div>
                        <div className="col-md-6 hide_on_mobile">
                            <img src={this.props.image + '?w=555&h=500'} alt={this.props.title} className="object-fit" />
                        </div>

                    </div>

                </div>
            </section>
			)
		}
	}
