import React, { Component } from 'react'
import { Helmet } from 'react-helmet'


// Components
import FashionPosts from '../Partials/FashionPosts'

// Dispatcher
import AppDispatcher from '../../Dispatcher/AppDispatcher'


export default class FashionAndStyle extends Component {

	componentWillMount() {
		this.getPageData()
	}
	getPageData() {
		AppDispatcher.dispatch({ action: 'get-page-data', page_slug: 'Fashion & Style' })
	}

	render() {
		const data = this.props.data
		return (
			<div id="Fashion">
				<Helmet>
					<title>Theresa on the Town | {data.page.fields.title}</title>
					<meta name="description" content={data.page.fields.metaDescription}/>
					<meta name="keywords" content={data.page.fields.metaTags}/>
                </Helmet>
				<div className="page-title">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="title-section">
									<h1 className="title">Fashion & Style</h1>
								</div>
							</div>
						</div>
					</div>
				</div>
				<FashionPosts data={this.props.data} />
			</div>

					)
    }
}
