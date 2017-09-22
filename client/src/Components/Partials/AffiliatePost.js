import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'




export default class AffiliatePost extends Component {


    render() {
			const header_style = {
				padding: '12px 0'
			}
			let affiliate_style
			if (this.props.image_bg){
				affiliate_style = {
					background: 'url(' + this.props.image_bg + ') #f5f5f5 no-repeat'
				}
			} else {
				affiliate_style = { background: '#f5f5f5'}
			}

        return (
            <div className="affiliate-preview">
                <section className="flat-row flat-imagebox affiliate-row" style={affiliate_style}>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="title-section stile2 affiliate-header" style={header_style}>
                                <h1 className="title text-left">{this.props.title}</h1>
                            </div>
                        </div>

                    </div>
					<div className="container">
						<div className="row">
							{this.props.affiliateItems.map(item =>
								<div className="item">
		                            <div className="imagebox effect1">
		                                <div className="box-wrap">
		                                    <div className="box-image">
		                                        <a href="#"><img className="affiliate-object-fit" src={item.object.metadata.photo.url} alt="img"/></a>
		                                    </div>
		                                    <div className="box-content">
		                                        <h5>{item.object.title}</h5>
												<p className="content-story" dangerouslySetInnerHTML={{ __html: item.object.content}} />
		                                    </div>
		                                </div>
		                            </div>
		                        </div>
							)}
	                    </div>
					</div>
                </section>
            </div>

        );
    }
}
