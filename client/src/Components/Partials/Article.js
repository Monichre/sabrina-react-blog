import React, { Component } from 'react'
import { Switch, Link, Route, Redirect } from 'react-router-dom'
import ReactPlayer from 'react-player'
import ReactMarkdown from 'react-markdown'
import AppDispatcher from '../../Dispatcher/AppDispatcher'
import AppStore from '../../Stores/AppStore'
import CONSTANTS from '../../constants'

export default class Article extends Component {
	componentDidMount() {

		let all_videos = document.querySelectorAll('.popup-video video')
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
		const hasVideo = article => (article.fields.videos || Object.values(article.fields).includes('videos') && article.fields.videos.length > 0)
		let videos
		
        if(hasVideo(this.props.article)){
            videos = (
                <section className="promo-video space">
					<div className="container">
						<div className="row">
							{this.props.article.fields.videos.map(video =>
								<div className="col-md-6">
									<div className="imgbox style3">
										<div className="">
											<a className="popup-video">
												<ReactPlayer onClick={this.handleMute.bind(this)} url={video.fields.file.url} width='95%' playing={false} muted loop={false} controls={false} />
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
		let main_images
		if(this.props.main_images){
			if(this.props.main_images.length === 4) {
				main_images = CONSTANTS.IMAGE_QUATRO(this.props.main_images)
			} else if(this.props.main_images.length === 3) {
				main_images = CONSTANTS.IMAGE_TRIO(this.props.main_images)
			} else if (this.props.main_images.length === 2) {
				main_images = CONSTANTS.IMAGE_DOUBLE(this.props.main_images)
			} else {
				main_images = CONSTANTS.IMAGE_SINGLE(this.props.main_images)
			}
		}
		let category = this.props.article.fields.category[0].fields.title.split(' ')[0]
		return (
			<article className="post">
				<div className="header-post">
					<h2 className="title-post">{this.props.article.fields.title}</h2>
					<h5 className="sub_title show_on_mobile">{this.props.article.fields.subHeader}</h5>
					<div className="widget widget_categories">
						<ul className="inline-list list-inline blog-single-category-list">
							<li><a className="blog-single-category" href={`/${category.toLowerCase()}`}>{category}</a></li>
						</ul>	
					</div>
					<p className="date-event date-style-2"> <span>{this.props.created}</span></p>
				</div>
				<div className="blog-post-single-image-container">
					{main_images}
				</div>
				<h5 className="sub_title hide_on_mobile">{this.props.article.fields.subHeader}</h5>
				<div className="content-post">
					<ReactMarkdown source={this.props.article.fields.content} />
					<div dangerouslySetInnerHTML={{__html: this.props.article.fields.shopsenseWidget}}/>
				</div>
                {videos}
				<div className="direction clearfix">
					<div className="social-links">
						<div className="share-tag social-share-link">Share this post:</div>
						<div className="social-share-link" data-href="https://www.theresaonthetown.com" data-layout="button_count" data-size="large" data-mobile-iframe="true">
							<a className="fb-xfbml-parse-ignore" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.theresaonthetown.com%2F&amp;src=sdkpreparse"><i className="fa fa-facebook"></i></a>
						</div>
						<div className="social-share-link">
							<a data-pin-do="buttonBookmark" data-pin-custom="true" target="_blank" rel="noopener" href="https://www.pinterest.com/theresaonthetwn"><i className="fa fa-pinterest"></i></a>
						</div>
					</div>
				</div>
			</article>


		)
	}

}
