import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import TravelPosts from '../Partials/TravelPosts'
import PostsByCountry from '../Partials/PostsByCountry'
import AmCharts from '@amcharts/amcharts3-react'
import AppDispatcher from '../../Dispatcher/AppDispatcher'
const mapConfig =  require('../Map/Map').mapConfig

export default class Travel extends Component {

  componentWillMount(){
    this.getPageData()
  }

  componentDidMount(){
    const data = this.props.data
	
    
  }

  getPageData(){
    AppDispatcher.dispatch({
      action: 'get-page-data',
      page_slug: 'Travel'
    })
  }

  render(){

    const data = this.props.data.travel
    const polaroids = this.props.data.polaroids
    const page = this.props.data.page
    const pageTitle = page.fields.title
    const headers = this.props.data.section_headers
    console.log(headers)
    let polaroid_header

    const includesPageTag = (header) => (Object.keys(header.fields).includes('sectionReference') ||  header.fields.sectionReference)
    headers.forEach(function(header) {
        if (includesPageTag(header) && (header.fields.sectionReference === 'Polaroid') || header.fields.sectionReference === 'polaroid') {
            polaroid_header = header
        }
        
    })
	const travel_style = {
		backgroundColor: '#f5f5f5',
		marginTop: 0
    }
    const map_style = {
        paddingTop: '50px'
    }

    return (
      <div id="travel">
          <Helmet>
                <title>Theresa on the Town | {page.fields.title}</title>
                <meta name="description" content={page.fields.metaDescription}/>
                <meta name="keywords" content={page.fields.metaTags}/>
            </Helmet>
		  <div className="page-title" style={travel_style}>
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
                        <h1 className="title">{polaroid_header.fields.headerTitle}</h1>
                        <h5 className="title_section_subHeader">{polaroid_header.fields.subHeader}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		  <div className="travel-images-menu">
		        <PostsByCountry data = {polaroids} />
		  </div>
      </div>
    )
  }
}
