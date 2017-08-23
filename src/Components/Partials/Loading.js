// Loading.js
import React, { Component } from 'react'
import './loading.css'

export default class Loading extends Component {
  render(){
    return (
		<div id='loading'>
			<div className="loading-container">
	  	  	<div className="dot"></div>
	  	  	<div className="dot"></div>
	  	  	<div className="dot"></div>
	  	  </div>
		</div>
    )
  }
}
