import React, { Component } from 'react'
import _ from 'lodash'
import {Helmet} from "react-helmet";

// Components
import TravelPosts from '../Partials/TravelPosts'
import PostsByCountry from '../Partials/PostsByCountry'
import AmCharts from '@amcharts/amcharts3-react'
import AppDispatcher from '../../Dispatcher/AppDispatcher'

const mapConfig =  require('../Map/Map').mapConfig
var config = require('../../config').config


// Dispatcher


export default class Travel extends Component {

  componentWillMount(){
    this.getPageData()
  }

  componentDidMount(){
    const data = this.props.data
	console.log(data)
    // document.title = config.site.title + ' | ' + data.page.title
  }

  getPageData(){
    AppDispatcher.dispatch({
      action: 'get-page-data',
      page_slug: 'travel'
    })
  }

  render(){

    const data = this.props.data
	const travel_style = {
		backgroundColor: '#f5f5f5',
		marginTop: 0
    }
    const map_style = {
        paddingTop: '50px'
    }

    return (
      <div id="travel">
		  <div className="page-title" style={travel_style}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-section">
                            <h1 className="title">Travel</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		<div className="row">
            <div className="col-xs-12">
                <div className="map-container" style={map_style}>
					<div id="chartdiv">
						<AmCharts.React {...mapConfig} />
					</div>
                </div>
            </div>
        </div>
        <br />
        <div className="page-title" style={travel_style}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-section">
                            <h1 className="title">Recent Posts</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		  <TravelPosts data = {data} />
		  <div className="page-title" style={travel_style}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-section">
                            <h1 className="title">Postcard Life</h1>
							<h5>Follow my travels</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		  <div className="travel-images-menu">
		        <PostsByCountry data = {data} />
		  </div>
      </div>
    )
  }
}
