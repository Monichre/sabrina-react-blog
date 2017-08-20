// Loading.js
import React, { Component } from 'react'
import './loading.css'

export default class Loading extends Component {
  render(){
    return (
		<div id='loading'>
			<div class="loading-container">
	  	  	<div class="dot"></div>
	  	  	<div class="dot"></div>
	  	  	<div class="dot"></div>
	  	  </div>
		</div>
    )
  }
}
