// Work.js
import React, {Component} from 'react'



// Components
import FashionPosts from '../Partials/FashionPosts'

// Dispatcher
import AppDispatcher from '../../Dispatcher/AppDispatcher'


export default class FashionAndStyle extends Component {

    componentWillMount() {
        this.getPageData()
    }

    componentDidMount() {
        const data = this.props.data
		// document.title = config.site.title + ' | ' + data.page.title

    }

    getPageData() {
        AppDispatcher.dispatch({action: 'get-page-data', page_slug: 'fashion-style'})
    }

    render() {
        return (
			<div id="Fashion">
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
  				<FashionPosts data = {this.props.data} />
			</div>

        )
    }
}
