// Work.js
import React, {Component} from 'react'
import _ from 'lodash'
import config from '../../config'

// Components
import HealthPosts from '../Partials/HealthPosts'

// Dispatcher
import AppDispatcher from '../../Dispatcher/AppDispatcher'

export default class HealthAndWellness extends Component {

	componentWillMount() {
        this.getPageData()
    }

    componentDidMount() {
        const data = this.props.data
    }

    getPageData() {
        AppDispatcher.dispatch({action: 'get-page-data', page_slug: 'health-wellness'})
    }


    render() {
		const data = this.props.data
        return (
            <div>
                <HealthPosts data = {this.props.data} />
            </div>
        )
    }
}
