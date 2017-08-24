import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'




export default class AffiliatePost extends Component {

    render() {
        return (
            <div className="affiliate-preview">
                <section className="flat-row flat-imagebox index-1">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="title-section stile2 ">
                                <div className="top-section text-left">
                                    <p>Featured Affiliate</p>
                                </div>
                                <h1 className="title text-left">{this.props.title}</h1>
                            </div>
                        </div>

                    </div>
					<div className="container">
						<div className="row">
	                        <div className="flat-divider d10px"></div>
							{this.props.images.map(image =>
								<div className="item">
		                            <div className="imagebox effect1">
		                                <div className="box-wrap">
		                                    <div className="box-image">
		                                        <a href="#"><img src={image.url} alt="img"/></a>
		                                    </div>
		                                    <div className="box-content">
		                                        <h5>Description</h5>
		                                        <p>Goes here</p>
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
