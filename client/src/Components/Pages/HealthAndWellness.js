import React, {Component} from 'react'
import { Helmet } from 'react-helmet'
import HealthPosts from '../Partials/HealthPosts'

// Dispatcher
import AppDispatcher from '../../Dispatcher/AppDispatcher'

export default class HealthAndWellness extends Component {

	componentWillMount() {
        this.getPageData()
    }

    componentDidMount() {
        
    }

    getPageData() {
        AppDispatcher.dispatch({action: 'get-page-data', page_slug: 'Health & Wellness'})
    }


    render() {
        const data = this.props.data.health
        const page = this.props.data.page
		const pageTitle = page.fields.title

        return (
            <div id="Health">
                <Helmet>
					<title>Theresa on the Town | {page.fields.title}</title>
					<meta name="description" content={page.fields.metaDescription}/>
					<meta name="keywords" content={page.fields.metaTags}/>
                </Helmet>
				<div className="page-title">
	              <div className="container">
	                  <div className="row">
	                      <div className="col-md-12">
	                          <div className="title-section">
                                <h1 className="title">{page.fields.title}</h1>
	                          </div>
	                      </div>
	                  </div>
	              </div>
	          </div>
                <HealthPosts data = {data} />
            </div>
        )
    }
}
