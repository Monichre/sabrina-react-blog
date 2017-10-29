import React, { Component } from 'react'
import { Switch, Link, Route, Redirect } from 'react-router-dom'
import ReactPlayer from 'react-player'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'
import { Helmet } from 'react-helmet'

import AppDispatcher from '../../Dispatcher/AppDispatcher'
import AppStore from '../../Stores/AppStore'

const CommonMark = require('commonmark')
const ReactRenderer = require('commonmark-react-renderer')
const parser = new CommonMark.Parser()
const renderer = new ReactRenderer()

// console.log(params)
// let parsed_content = parser.parse(params)
// let results = renderer.render(parsed_content)

const Video = (props) => {
	<ReactPlayer 
		className="embedded_video" 
		url={props.video.fields.videos ? props.video.fields.videos[0].fields.file.url : props.video.fields.link} width='100%' playing={false} muted loop={false} controls={false} 
	/>
}


class VIDEO_POST_SINGLE extends Component {
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
		return (
			<article className="post">
				<div className="header-post">
					<h2 className="title-post">
						{this.props.video.fields.title}
					</h2>
					<p className="date-event date-style-2"><span>{this.props.video.fields.subHeader}</span></p>
				</div>

				<div className="blog-post-single-image-container">
					<ReactPlayer className="single_post_video" onClick={this.handleMute.bind(this)} url={this.props.video.fields.videos ? this.props.video.fields.videos[0].fields.file.url : this.props.video.fields.link} width='100%' playing={false} muted loop={false} controls={false} />
				</div>

				<div className="content-post">
					<p dangerouslySetInnerHTML={{ __html: this.props.video.fields.description }}></p>
				</div>
				<div className="direction clearfix">
					<ul className="tags">
						<li>Tags:</li>
						<a href={`/${this.props.tags}`}>{this.props.tags}</a>
					</ul>
					<div className="social-links">
					<div className="share-tag social-share-link">Share :</div>
						<div className="social-share-link">
							<a href="https://www.instagram.com/theresaonthetown/?ref=badge"><i className="fa fa-lg fa-instagram"></i></a>
						</div>
						<div className="social-share-link">
							<script rel="preload" src="https://apis.google.com/js/platform.js"></script>
							<div className="g-ytsubscribe" data-channelid="UCvZKd-eUuq8A66J-uLr4CZQ" data-layout="default" data-theme="dark" data-count="default" data-onytevent="onYtEvent"></div>
						</div>
						<div className="social-share-link fb-share-button" data-href="https://www.theresaonthetown.com" data-layout="button_count" data-size="large" data-mobile-iframe="true">
							<a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.theresaonthetown.com%2F&amp;src=sdkpreparse"></a>
						</div>
						<div className="social-share-link">
							<a data-pin-do="buttonBookmark" href="https://www.pinterest.com/theresaonthetwn"></a>
						</div>
					</div>

				</div>
			</article>
		)
	}
}


// transformLinkUri={props.handleVideo(props.article.fields.content)}
const ARTICLE_POST_SINGLE = (props) => (
	<article className="post">
		<div className="header-post">
			<h2 className="title-post">
				{props.article.fields.title}
			</h2>
			<h5 className="sub_title show_on_mobile">{props.article.fields.subHeader}</h5>
			<p className="date-event date-style-2"> <span>{props.created}</span></p>


		</div>

		<div className="blog-post-single-image-container">
			{props.image}
		</div>
		<h5 className="sub_title hide_on_mobile">{props.article.fields.subHeader}</h5>

		<div className="content-post">
			<ReactMarkdown 
				source={props.article.fields.content} 
				sourcePos={true}
				childAfter={(props.src && props.src.includes('/videos')) ? <Video video={props.src} /> : null}
				allowNode={(node) => { console.log(node); if(node.props.src && node.props.src.includes('/videos')){node.renderer= <Video video={node.props.src} />; return <Video video={node.props.src} />} return true }} />
		</div>
		<div className="direction clearfix">
			<ul className="tags">
				<li>Tags:</li>
				<li>
					<a href={`/${props.tags}`}>{props.tags}</a>
				</li>
			</ul>

			<div className="social-links">
				<div className="share-tag social-share-link">Share :</div>
				<div className="social-share-link">
					<a href="https://www.instagram.com/theresaonthetown/?ref=badge"><i className="fa fa-lg fa-instagram"></i></a>
				</div>
				<div className="social-share-link">
					<script rel="preload" src="https://apis.google.com/js/platform.js"></script>
					<div className="g-ytsubscribe" data-channelid="UCvZKd-eUuq8A66J-uLr4CZQ" data-layout="default" data-theme="dark" data-count="default" data-onytevent="onYtEvent"></div>
				</div>
				
				<div className="social-share-link fb-share-button" data-href="https://www.theresaonthetown.com" data-layout="button_count" data-size="large" data-mobile-iframe="true">
					<a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.theresaonthetown.com%2F&amp;src=sdkpreparse">
						
					</a>
				</div>
				<div className="social-share-link">
					<a data-pin-do="buttonBookmark" href="https://www.pinterest.com/theresaonthetwn"></a>
				</div>
			</div>
		</div>
	</article>


)

export default class BlogSingle extends Component {

	componentWillMount() {
		this.getPageData()
	}
	getPageData() {
		AppDispatcher.dispatch({
			action: 'get-page-data',
			//   page_slug: this.props.data.page.slug,
			post_slug: this.props.match.params.slug
		})
	}
	handleEmbeddedVideo(params) {
		return this.presentExtractedVideo(params)
	}
	presentExtractedVideo(node) {
		console.log(node)
		const renderer = new ReactRenderer()
		let results = renderer.render(node)
		// console.log(parsed_content)
		console.log(results)
		let return_content = results[0].props.children.map(child => {
			console.log(child)
			if (child.props && child.props.src.includes('//videos')) {
				return (
					<ReactPlayer url={child.props.src} height='100%' width='100%' />
				)
			}
		})
		return return_content
	}

	componentWillUnmount() {
		AppStore.removeChangeListener(this._onChange)
	}

	_onChange() {

	}
	componentDidMount() {
		AppStore.addChangeListener(this._onChange.bind(this))

	}

	handleLinkClick(params) {
		console.log(params)
		// _this.props.history.push(`users/dashboard`);
		let data = this.props.data
		let article = data.article
		let category = article.fields.category ? article.fields.category[0].fields.title.split(' ')[0].toLowerCase() : null
		let old_path = `/${category}/${article.fields.title}`

		const SubRoutes = () => (
			<Switch>
				<Redirect from={old_path} to='/new-path' />

			</Switch>
		)
	}

	render() {

		const data = this.props.data
		const article = data.article
		console.log(article)
		let headers = data.section_headers
		let blog_header
		const includesPageTag = (header) => Object.keys(header.fields).includes('page')

		headers.forEach(function (header) {
			if (includesPageTag(header) && header.fields.page.fields.name === 'Blog') {
				blog_header = header
			}

		})

		const the_other_articles = data.articles.filter(other_article => other_article != article)
		let all_affiliate_items = []

		if (data.affiliate_entries) {
			data.affiliate_entries.forEach(entry => entry.fields.affiliateItems.forEach(item => all_affiliate_items.push(item)))
		}

		const hasPhoto = article => article.fields.photos || Object.values(article.fields).includes('photos')
		const months = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"]
		const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
		let date_obj = new Date(article.sys.createdAt)
		let created = months[(date_obj.getMonth())] + ' ' + date_obj.getDate() + ', ' + date_obj.getFullYear()
		let category = article.fields.category ? article.fields.category[0].fields.title.split(' ')[0].toLowerCase() : null
		let readMore = <Link to={'/' + category + '/' + article.fields.title} onClick={this.scrollTop}>Read More</Link>

		let image
		let image_div = hasPhoto(article) ? article.fields.photos[0].fields.file.url + '?w=1140&h=500&fit=fill' : null
		if (image_div != null) {
			image = <img src={image_div} alt="image" />
		}
		let blog_post_single
		let path = this.props.match.path.split('/')
		let tags = []
		const hasTags = (article) => Object.keys(article.fields).includes('tag')
		const subTitle = Object.keys(article.fields).includes('subHeader') ? article.fields.subHeader : null

		if (hasTags(article)) {
			tags = article.fields.tag.map((tag) => tag.fields.name)
		} else {
			tags = category
		}

		if (path.includes('videos')) {

			blog_post_single = <VIDEO_POST_SINGLE video={article} tags={tags} />
		}
		else {

			blog_post_single = <ARTICLE_POST_SINGLE article={article} image={image} created={created} tags={tags} handleVideo={this.handleEmbeddedVideo.bind(this)} />
		}

		return (
			<div id="Blog">
				<Helmet>
					<script rel="preload" src="https://apis.google.com/js/platform.js"></script>
					<script src="/pinit.js"></script>
				</Helmet>


				<div className="page-title parallax parallax1">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="title-section">
									<h1 className="title">{blog_header.fields.headerTitle}</h1>
									<h5 className="title_section_subHeader">{blog_header.fields.subHeader}</h5>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="main-content blog-single">
					<div className="container">
						<div className="row">
							<div className="col-xs-12">
								<div className="content-wrap">
									{blog_post_single}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div className="sidebars">
									<div className="sidebars-wrap">
										<div className="sidebar">

											<div className="widget widget_categories">

												<ul className="inline-list list-inline">
													<li><h3 className="widget-title">Categories:</h3></li>
													<li>
														<a href="/health">Health & Wellness ({data.health.length})</a>
													</li>
													<li>
														<a href="/travel">Travel ({data.travel.length})</a>
													</li>
													<li>
														<a href="/fashion">Fashion & Style ({data.fashion.length})</a>
													</li>

												</ul>
											</div>

											<div className="widget widget_recent_entries clearfix">
												<h3 className="widget-title">Keep Reading</h3>
												<ul className="recent-list clearfix inline-list list-inline">
													{the_other_articles.splice(0, 3).map((article, i) => {
														let category = article.fields.category ? article.fields.category[0].fields.title.split(' ')[0].toLowerCase() : null
														let readMore = <Link to={'/' + category + '/' + article.fields.title} onClick={this.scrollTop}>Read More</Link>
														return (
															<li>
																<div className="thumb">
																	<img src={article.fields.photos ? article.fields.photos[0].fields.file.url + '?fit=thumb' : null} alt="image" />
																</div>
																<div className="text">

																	<Link to={'/' + category + '/' + article.fields.title} onClick={this.handleLinkClick.bind(category, article.fields.title)}>Check it out</Link>

																</div>
															</li>
														)
													}

													)}
												</ul>
											</div>
											<br />
											<br />
											<div className="widget widget_latest_tweets">
												<h3 className="widget-title">Latest Affiliate Items</h3>
												<ul className="recent-list inline-list list-inline">
													{all_affiliate_items.map((entry) => {
														return (
															<li>
																<div className="thumb">
																	<a href={entry.fields.link} target="_blank">
																		<img src={(entry.fields.photos[0] && entry.fields.photos[0].fields !== undefined) ? entry.fields.photos[0].fields.file.url + '?fit=thumb' : null} alt="image" />
																	</a>
																</div>
																<p>{entry.fields.title}</p>
																<p><a href={entry.fields.link}>Shop Now</a></p>
															</li>
														)
													})}

												</ul>
											</div>
											<div className="widget widget_latest_tweets">
												<h3 className="widget-title">Latest Video Posts</h3>
												<ul className="recent-list inline-list list-inline">
													{data.video_entries.map((entry) => {
														let months = ["January", "February", "March", "April", "May", "June",
															"July", "August", "September", "October", "November", "December"]
														let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
														let date_obj = new Date(entry.sys.createdAt)
														let created = months[(date_obj.getMonth() + 1)] + ' ' + date_obj.getDate() + ', ' + date_obj.getFullYear()

														let readMore = <Link to={'/videos/' + entry.fields.title} onClick={this.handleLinkClick.bind('/videos/', article.fields.title)}>Check it out</Link>
														return (
															<li>
																<div className="thumb">
																	<ReactPlayer url={entry.fields.videos ? entry.fields.videos[0].fields.file.url + '?fit=thumb' : entry.fields.link} height='100px' width='150px' />
																</div>
																<p>{readMore}</p>
															</li>
														)
													})}

												</ul>
											</div>

										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		)
	}
}
