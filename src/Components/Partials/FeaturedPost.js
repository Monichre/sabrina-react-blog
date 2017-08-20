// Work.js
import React, {Component} from 'react'
import _ from 'lodash'
import config from '../../config'

// Components


// Dispatcher
import AppDispatcher from '../../Dispatcher/AppDispatcher'

export default class FeaturedPost extends Component {
	render(){
		return (
			<section className="flat-row flat-event clearfix">

				<div className="row">
					<div className="col-md-7">
						<div className="img-our">
							<img src="img/fashion-1.jpg" alt="images"/>
						</div>
					</div>

					<div className="col-md-5">
						<div className="flat-divider d45px"></div>
						<div className="title-section style2 ">
							<h1 className="title">Featured Post</h1>

						</div>
						<h4 className="menu-event">Givenchy Shoes on my latest Vacay</h4>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, eiusmod tempor inci di dunt ut labore et dolore magna aliqua. Ut enim ad mim reprehenderit veniam. Excepteur sint occaecat cupidatat non<br/>
							sunt in culpa qui officia</p>

						<p className="date-event">7:00 pm wednesday, 23 nov 2016</p>
						<div className="countdown">
							<div className="square days">
								<div className="numb">178</div>
								<div className="text">Likes</div>
							</div>

							<div className="square hours">
								<div className="numb">20</div>
								<div className="text">Shares</div>
							</div>

							<div className="square mins">
								<div className="numb">15</div>
								<div className="text">Comments</div>
							</div>

							<div className="square secs">
								<div className="numb">3</div>
								<div className="text">Featured Products</div>
							</div>
						</div>

						<div className="read-more">
							<a href="#">Read more
							</a>
						</div>
					</div>

				</div>

			</section>
		)
	}
