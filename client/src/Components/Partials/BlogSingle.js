import React, { Component } from 'react'
import { Switch, Link, Route, Redirect } from 'react-router-dom'
import ReactPlayer from 'react-player'
import _ from 'lodash'
import Article from './Article'
import Video from './Video'
import CONSTANTS from '../../constants'
import Helmet from 'react-helmet'
import AppDispatcher from '../../Dispatcher/AppDispatcher'
import AppStore from '../../Stores/AppStore'
import BlogSignUp from './SiteComponents/BlogSignUp'
const moment = require('moment')

export default class BlogSingle extends Component {

	componentWillMount() {
		this.getPageData()
		console.log(this.props)
		document.body.scrollTop = 0
		document.documentElement.scrollTop = 0
	}
	getPageData() {
		AppDispatcher.dispatch({
			action: 'get-page-data',
			post_slug: this.props.match.params.slug
		})
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
		const the_other_articles = data.articles.filter(other_article => other_article != article)
		const description = CONSTANTS.TRIM(article.fields.content)
		const slug = this.props.match.url
		
		let health_obj = {}
		let travel_obj = {}
		let fashion_obj = {}

		health_obj.title = "Health & Wellness"
		travel_obj.title = "Travel"
		fashion_obj.title = "Fashion & Style"

		fashion_obj.articles = _.filter(the_other_articles, (article) => article.sys.contentType.sys.id === 'blogPost' && article.fields.category[0].fields.title === 'Fashion Posts').sort((a, b) => {return moment.utc(a.sys.createdAt).diff(moment.utc(b.sys.createdAt))}).reverse()
		health_obj.articles = _.filter(the_other_articles, (article) => article.sys.contentType.sys.id === 'blogPost' && article.fields.category[0].fields.title === 'Health Posts').sort((a, b) => {return moment.utc(a.sys.createdAt).diff(moment.utc(b.sys.createdAt))}).reverse()
		travel_obj.articles = _.filter(the_other_articles, (article) => article.sys.contentType.sys.id === 'blogPost' && article.fields.category[0].fields.title === 'Travel Posts').sort((a, b) => {return moment.utc(a.sys.createdAt).diff(moment.utc(b.sys.createdAt))}).reverse()

		const filtered_articles = [fashion_obj, travel_obj, health_obj]
		

		if (data.affiliate_entries) {
			data.affiliate_entries.forEach(entry => the_other_articles.push(entry))	
		} 
		let the_videos

		if (data.video_entries) {
			the_videos = 	<ul className="recent-list clearfix">
								{data.video_entries.splice(0, 3).map((video, i) => (
									<li>
										<div className="thumb">
											<ReactPlayer url={(video.fields.videos && video.fields.videos[0].fields) ? video.fields.videos[0].fields.file.url : video.fields.link}  width='95%'height="100%" playing={false} muted loop={false} controls={false}/>
										</div>
										<p className="text"><Link to={'/videos/' + video.fields.title} onClick={this.handleLinkClick.bind(video.fields.title)}>{video.fields.title}</Link></p>
									</li>
								))}
							</ul>
		}
		
		let date_obj = new Date(article.sys.createdAt)
		let created = CONSTANTS.months[(date_obj.getMonth())] + ' ' + date_obj.getDate() + ', ' + date_obj.getFullYear()
		let category = article.fields.category ? article.fields.category[0].fields.title.split(' ')[0].toLowerCase() : null
		let readMore = <Link to={'/' + category + '/' + article.fields.title} onClick={this.scrollTop}>Read More</Link>
		let article_main_images = CONSTANTS.hasPhoto(article) ? article.fields.mainPhotos : null
		let blog_post_single
		let path = this.props.match.path.split('/')
		let subTitle = Object.keys(article.fields).includes('subHeader') ? article.fields.subHeader : null

		if (path.includes('videos')) {
			blog_post_single = <Video video={article} />
		}
		else {
			let videos = (Object.keys(article.fields).includes('videos') && article.fields.videos.length > 0) ? article.fields.videos : null
			blog_post_single = <Article 
									article={article} 
									main_images={article_main_images} 
									created={created} 
									videos={videos} 
									health_articles={data.health.length}
									fashion_articles={data.fashion.length}
									travel_articles={data.travel.length}/>
		}

		return (
			<div id="Blog">
				<Helmet>
					<meta property="og:url" content={`http://www.theresaonthetown.com${slug}`} />
					<meta property="og:type" content="website" />
					<meta property="og:title" content="Theresa on the Town" />
					<meta property="og:description" content={description} />
					<meta property="og:image" content={CONSTANTS.hasPhoto(article) ? article.fields.mainPhotos[0].fields.file.url : null} />
				</Helmet>
				
				<div className="main-content blog-single">
					<div className="container">
						<div className="row">
							<div className="col-xs-12">
								<div className="content-wrap">
									{blog_post_single}
								</div>
								<div className="sidebars">
									<div className="sidebars-wrap">
										<div className="sidebar">
											<div className="widget widget_recent_entries clearfix">
												<h3 className="widget-title">More for you:</h3>

													{filtered_articles.map((article_list) => {
														if(article_list.articles.length > 0) {
															return (
																<div className="recent-list-container">
																	<h5 className="widget-category-title">{article_list.title}:</h5>
																	<ul className="recent-list clearfix">
																			{article_list.articles.splice(0, 3).map((article, i) => {
																				let category = article.fields.category ? article.fields.category[0].fields.title.split(' ')[0].toLowerCase() : null
																				
																				return (
																					<li>
																						<div className="thumb"><img src={(article.fields.mainPhotos && article.fields.mainPhotos[0].fields) ? article.fields.mainPhotos[0].fields.file.url + '?w=315&h=315&fit=thumb' : null} alt="image" /></div>
																						<p className="text"><Link to={'/' + category + '/' + article.fields.title} onClick={this.handleLinkClick.bind(category, article.fields.title)}>{CONSTANTS.trimLink(article.fields.title)}</Link></p>
																					</li>
																				)}
																			)}
																		</ul>
																</div>
															)
														}
													})}
													<div className="recent-list-container">
														<h5 className="widget-category-title">Latest in Video:</h5>
														{the_videos}
													</div>
											</div>	
										</div>
									</div>
								</div>
								<section className="flat-row flat-make-res index-2">
									<BlogSignUp />							
								</section>
							</div>
						</div>	
					</div>
				</div>
			</div>
		)
	}
}
