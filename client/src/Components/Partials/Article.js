import React, { Component } from 'react'
import { Switch, Link, Route, Redirect } from 'react-router-dom'
import ReactPlayer from 'react-player'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'
import Masonry from 'react-masonry-component'

import AppDispatcher from '../../Dispatcher/AppDispatcher'
import AppStore from '../../Stores/AppStore'

const CommonMark = require('commonmark')
const ReactRenderer = require('commonmark-react-renderer')
const parser = new CommonMark.Parser()
const renderer = new ReactRenderer()

export default class Article extends Component {
	componentDidMount() {

		let all_videos = document.querySelectorAll('.single_post_video video')
		let on = ['mouseenter', 'touchstart']
		let off = ['mouseleave', 'touchend']

		const addControls = (elem) => elem.setAttribute('controls', true)
		const removeControls = (elem) => elem.removeAttribute('controls')

		all_videos.forEach(video => {
			video.setAttribute('muted', true)
			video.addEventListener('mouseenter', (e) => {

				addControls(e.target)
			})
			video.addEventListener('touchstart', (e) => {
				addControls(e.target)
			})
			video.addEventListener('mouseleave', (e) => {

				removeControls(e.target)
			})
			video.addEventListener('touchend', (e) => {
				removeControls(e.target)
			})
		})
	}
	handleMute(e) {
		let video_player = e.target
		video_player.setAttribute('muted', false)
	}

	render() {
        let videos
        if(this.props.videos){
            videos = (
                <section className="promo-video space">
					<div className="container">
						<div className="row">
							{videos.map(video =>
								<div className="col-md-6">
									<div className="imgbox style3">
										<div className="">
											<a className="popup-video">
												<ReactPlayer onClick={this.handleMute.bind(this)} url={video.fields.videos ? video.fields.videos[0].fields.file.url : video.fields.link} width='95%' playing={false} muted loop={false} controls={false} />
											</a>
										</div>

									</div>
								</div>
							)}
						</div>
					</div>
				</section>
            )
        }
		return (
			<article className="post">
				<div className="header-post">
					<h2 className="title-post">
						{this.props.article.fields.title}
					</h2>
					<h5 className="sub_title show_on_mobile">{this.props.article.fields.subHeader}</h5>
					<p className="date-event date-style-2"> <span>{this.props.created}</span></p>
				</div>
				<div className="blog-post-single-image-container">
					{this.props.image}
				</div>
				<h5 className="sub_title hide_on_mobile">{this.props.article.fields.subHeader}</h5>
				<div className="content-post">
					<ReactMarkdown source={this.props.article.fields.content} />
				</div>
				
                {videos}

				<section className="flat-row products shop-1">
					<div className="container">
						<Masonry className={"row"}>
							{this.props.photos.map((photo) => {
								return (
									<div className="col-sm-3 col-xs-6">
										<div className="product effect1">
											<div className="box-wrap">
												<div className="box-image">
													<a href=""><img src={photo.fields.file.url + '?f=face&fit=thumb'} alt="images" /></a></div>
												<div className="box-content">
													<ul>

														<li>
															<i className="fa fa-heart"></i>
															<i className="fa fa-heart"></i>
															<i className="fa fa-heart"></i>
															<i className="fa fa-heart"></i>
															<i className="fa fa-heart"></i>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								)
							})}
						</Masonry>
					</div>
				</section>
				<div className="direction clearfix">
					<ul className="tags">
						<li>Tags:</li>
						<li>
							<a href={`/${this.props.tags}`}>{this.props.tags}</a>
						</li>
					</ul>

					<div className="social-links">
						<div className="share-tag social-share-link">Share :</div>

						<div className="social-share-link">
							<a href="https://www.instagram.com/theresaonthetown/?ref=badge"><i className="fa fa-instagram"></i></a>
						</div>
					
						<div className="social-share-link" data-href="https://www.theresaonthetown.com" data-layout="button_count" data-size="large" data-mobile-iframe="true">
							<a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.theresaonthetown.com%2F&amp;src=sdkpreparse">
								<i className="fa fa-facebook"></i>
							</a>
						</div>
						<div className="social-share-link">
							<a data-pin-do="buttonBookmark" data-pin-custom="true" href="https://www.pinterest.com/theresaonthetwn"><i className="fa fa-pinterest"></i></a>
						</div>
					</div>
				</div>
			</article>


		)
	}

}
