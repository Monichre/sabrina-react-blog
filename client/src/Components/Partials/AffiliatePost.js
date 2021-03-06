import React, { Component } from 'react'
import _ from 'lodash'
import ReactMarkdown from 'react-markdown'

export default class AffiliatePost extends Component {

    render() {
			const header_style = {
				padding: '12px 0'
			}
			const content_style = {
				background: '#fff',
				padding: '30px'
			}
			let affiliate_style
			if (this.props.image_bg){
				affiliate_style = {
					background: 'url(' + this.props.image_bg + ') #f5f5f5 no-repeat'
				}
			} else {
				affiliate_style = { background: '#f5f5f5'}
			}
			
			let content = this.props.article.fields.content > 0 ? 
				(<div className="col-md-4 col-md-offset-2">	
					<div style={content_style}>
						<ReactMarkdown source={this.props.article.fields.content} />
					</div>
				</div>) : null

        return (
            <div className="affiliate-preview">
                <section className="flat-row flat-imagebox affiliate-row" style={affiliate_style}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title-section stile2 affiliate-header" style={header_style}>
                                <h1 className="title text-left">{this.props.article.fields.title}</h1>
                            </div>
                        </div>
                    </div>
					<div className="container">
						<div className="row">
							{this.props.article.fields.affiliateItems.map(item =>
								<div className="item">
		                            <div className="imagebox effect1">
		                                <div className="box-wrap">
		                                    <div className="box-image">
		                                        <a href={item.fields ? item.fields.link : null} target="_blank"><img className="affiliate-object-fit" src={(item.fields && item.fields.photos[0] && item.fields.photos[0].fields !== undefined) ? item.fields.photos[0].fields.file.url : null} alt="img"/></a>
		                                    </div>
		                                    <div className="box-content">
		                                        <h5>{item.fields ? item.fields.title : null}</h5>
												<p className="content-story" dangerouslySetInnerHTML={{ __html: item.fields ? item.fields.description : null}} />
		                                    </div>
		                                </div>
		                            </div>
		                        </div>
							)}
							{content}
	                    </div>				
					</div>
                </section>
            </div>

        );
    }
}
