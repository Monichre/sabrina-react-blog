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
        const data = this.props.data

        return (
            <div id="Health">
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
                                <h1 className="title">{data.page.fields.title}</h1>
	                          </div>
	                      </div>
	                  </div>
	              </div>
	          </div>
                <HealthPosts data = {this.props.data} />
            </div>
        )
    }
}
