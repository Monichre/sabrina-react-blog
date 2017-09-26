// Work.js
import React, {Component} from 'react'


// Components
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
        AppDispatcher.dispatch({action: 'get-page-data', page_slug: 'health-wellness'})
    }


    render() {
		const data = this.props.data
        return (
            <div id="Health">
				<div className="page-title">
	              <div className="container">
	                  <div className="row">
	                      <div className="col-md-12">
	                          <div className="title-section">
	                              <h1 className="title">Health & Wellness</h1>
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
