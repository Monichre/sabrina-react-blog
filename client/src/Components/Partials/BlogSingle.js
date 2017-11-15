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
		let all_affiliate_items = []

		if (data.affiliate_entries) {
			data.affiliate_entries.forEach(entry => entry.fields.affiliateItems.forEach(item => all_affiliate_items.push(item)))
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
									travel_articles={data.travel.length}
									/>
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
				<div className="page-title">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="title-section">
									{blog_header}
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
											<div className="widget widget_recent_entries clearfix">
												<h3 className="widget-title">More for you</h3>
												<ul className="recent-list clearfix inline-list list-inline">
													{the_other_articles.splice(0, 3).map((article, i) => {
														let category = article.fields.category ? article.fields.category[0].fields.title.split(' ')[0].toLowerCase() : null
														return (
															<li>
																<div className="thumb"><img src={article.fields.photos ? article.fields.mainPhotos[0].fields.file.url + '?fit=thumb' : null} alt="image" /></div>
																<p className="text"><Link to={'/' + category + '/' + article.fields.title} onClick={this.handleLinkClick.bind(category, article.fields.title)}>{article.fields.title}</Link></p>
															</li>
														)}
													)}
												</ul>
											</div>
											<br />
											<br />
											<div className="widget widget_latest_tweets">
												<h3 className="widget-title">Latest Affiliate Items</h3>
												<ul className="recent-list inline-list list-inline">
													{all_affiliate_items.splice(0,3).map((entry) => {
														return (
															<li>
																<div className="thumb">
																	<a href={entry.fields.link} target="_blank" rel="noopener" className="affiliate_thumb"><img src={(entry.fields.photos[0] && entry.fields.photos[0].fields !== undefined) ? entry.fields.photos[0].fields.file.url + '?fit=thumb' : null} alt="image" /></a>
																</div>
																<p>{entry.fields.title}</p>
																<p><a href={entry.fields.link}>Shop Now</a></p>
															</li>
														)}
													)}
												</ul>
											</div>
											<div className="widget widget_latest_tweets">
												<h3 className="widget-title">Latest in Video</h3>
												<ul className="recent-list inline-list list-inline">
													{data.video_entries.splice(0,3).map((entry) => {
														let date_obj = new Date(entry.sys.createdAt)
														let created = CONSTANTS.months[(date_obj.getMonth() + 1)] + ' ' + date_obj.getDate() + ', ' + date_obj.getFullYear()
														let readMore = <Link to={'/videos/' + entry.fields.title} onClick={this.handleLinkClick.bind('/videos/', article.fields.title)}>{article.fields.title}</Link>
														return (
															<li>
																<div className="thumb">
																	<ReactPlayer url={entry.fields.videos ? entry.fields.videos[0].fields.file.url + '?fit=thumb' : entry.fields.link} height='100px' width='150px' />
																</div>
																<p>{readMore}</p>
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
							<div className="container">
								<div className="row">
									<div className="col-sm-6 col-md-offset-3">
										<div className="reservation-page-left">

											<div className="reservation-page-form">

												<div className="title-section">
													<h1 className="title">Are You on the Mailing List?</h1>
												</div>

												<form id="reservation-form" action ="contact/contact-process.php">
													<div className="reservation-page-input-box">
														<label>Your name</label>
														<input type="text" className="form-control" placeholder="Full name" name="name" id="form-name" data-error="Subject field is required" required=""/>
													</div>
														
													<div className="reservation-page-input-box">
														<label>Your Email</label>
														<input type="text" className="form-control" placeholder="Email" name="Email" id="form-email" data-error="Subject field is required" required=""/>
													</div>
													<div className="reservation-booking">
														<button type="submit" className="book-now-btn">Sign Up!</button>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		)
	}
}
