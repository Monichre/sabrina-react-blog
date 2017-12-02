import React, { Component } from 'react'
import { Switch, Link, Route, Redirect } from 'react-router-dom'
import ReactPlayer from 'react-player'
import _ from 'lodash'
import Masonry from 'react-masonry-component'
import Article from './Article'
import Video from './Video'
import CONSTANTS from '../../constants'
import Helmet from 'react-helmet'
import AppDispatcher from '../../Dispatcher/AppDispatcher'
import AppStore from '../../Stores/AppStore'
import BlogSignUp from './SiteComponents/BlogSignUp'
{/* <div className="page-title">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="title-section">
									{blog_header}
								</div>
							</div>
						</div>
					</div>
				</div> */}


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
		const description = CONSTANTS.TRIM(article.fields.content)
		const slug = this.props.match.url
		console.log(article)
		let headers = data.section_headers
		let blog_header
		const includesPageTag = (header) => (Object.keys(header.fields).includes('sectionReference') || header.fields.sectionReference)

		headers.forEach(function (header) {
			if (includesPageTag(header) && (header.fields.sectionReference === 'blog' || header.fields.sectionReference === 'Blog' )) {
				blog_header = <div>
								<h1 className="title">{header.fields.headerTitle}</h1>
								<h5 className="title_section_subHeader">{header.fields.subHeader}</h5>
							</div>
				}

		})
		const the_other_articles = data.articles.filter(other_article => other_article != article)
		if (data.affiliate_entries) {
			data.affiliate_entries.forEach(entry => the_other_articles.push(entry))	
		} 
		let the_videos
		if (data.video_entries) {
			the_videos = data.video_entries
		}
		console.log(the_videos)
		
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
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div className="sidebars">
									<div className="sidebars-wrap">
										<div className="sidebar">
											<div className="widget widget_recent_entries clearfix">
												<h3 className="widget-title">More for you:</h3>
												
												<ul className="recent-list clearfix inline-list list-inline">
													{the_other_articles.splice(0, 3).map((article, i) => {
														let category = article.fields.category ? article.fields.category[0].fields.title.split(' ')[0].toLowerCase() : null
														return (
															<li>
																<div className="thumb"><img src={article.fields.mainPhotos ? article.fields.mainPhotos[0].fields.file.url + '?fit=thumb' : null} alt="image" /></div>
																<p className="text"><Link to={'/' + category + '/' + article.fields.title} onClick={this.handleLinkClick.bind(category, article.fields.title)}>{CONSTANTS.trimLink(article.fields.title)}</Link></p>
															</li>
														)}
													)}
												</ul>
												<ul className="recent-list clearfix inline-list list-inline">
													{the_videos.splice(0, 3).map((video, i) => {
															return (
																<li>
																	<div className="thumb">
																		<ReactPlayer url={(video.fields.videos && video.fields.videos[0].fields) ? video.fields.videos[0].fields.file.url : video.fields.link}  width='95%'height="100%" playing={false} muted loop={false} controls={false}/>
																	</div>
																	<p className="text"><Link to={'/videos/' + video.fields.title} onClick={this.handleLinkClick.bind(video.fields.title)}>{video.fields.title}</Link></p>
																</li>
															)}
														)}
												</ul>
											</div>	
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
		)
	}
}
