import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'


export default class VideoPostLeft extends Component {

	render() {
		
		const title_style = {
			textAlign: 'left'
		}
		return (


			<section className="flat-row flat-our blog-post-preview">
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<div className="flat-divider d96px"></div>
							<div className="wrap-content-story-left">
								<div className="title-section style2 ">
									<h1 className="title">{this.props.title}</h1>
								</div>
								<div className="entry-post">
									<p className="date-event date-style-2"> <span>{this.props.date}</span></p>
									<br />
								</div>
								<div className="content-story" dangerouslySetInnerHTML={{ __html: this.props.content }} />
								<div className="read-more">{this.props.readMore}</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="imgbox style3">
								<div className="">
									<a href="#" >
										<ReactPlayer url={this.props.video} loop={true} controls={true} />
									</a>
								</div>
							</div>

						</div>

					</div>

				</div>

			</section>
		)
	}

}
