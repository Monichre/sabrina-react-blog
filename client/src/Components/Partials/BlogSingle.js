import React, { Component } from 'react'
import { Switch, Link, Route, Redirect } from 'react-router-dom'
import ReactPlayer from 'react-player'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'


import AppDispatcher from '../../Dispatcher/AppDispatcher'
import AppStore from '../../Stores/AppStore'

{/* <div className="g-ytsubscribe social-share-link" data-channelid="UCvZKd-eUuq8A66J-uLr4CZQ" data-layout="default" data-count="default">
					<i className="fa fa-lg fa-youtube"></i>
				</div> */}
				// <script src="https://apis.google.com/js/platform.js"></script>

{/* <script>
  function onYtEvent(payload) {
    if (payload.eventType == 'subscribe') {
      // Add code to handle subscribe event.
    } else if (payload.eventType == 'unsubscribe') {
      // Add code to handle unsubscribe event.
    }
    if (window.console) { // for debugging only
      window.console.log('YT event: ', payload);
    }
  }
</script> */}


const VIDEO_POST_SINGLE = (props) => (
	<article className="post">
		<div className="header-post">
			<h2 className="title-post">
				{props.video.fields.title}
			</h2>
			<p className="date-event date-style-2"><span>{props.video.fields.subHeader}</span></p>
		</div>

		<div className="blog-post-single-image-container">
			<ReactPlayer url={props.video.fields.videos[0].fields.file.url} height='100%' width='100%' />
		</div>

		<div className="content-post">
			<p dangerouslySetInnerHTML={{ __html: props.video.fields.description }}></p>
		</div>
		<div className="direction clearfix">
			<ul className="tags">
				<li>Tags:</li>
				<a href="#">{props.tags}</a>
			</ul>
			<div className="social-links">
				<span>Share :</span>

				<a className="social-share-link" href="https://www.instagram.com/theresaonthetown/?ref=badge">
					<i className="fa fa-lg fa-instagram"></i>
				</a>
				<script rel="preload" src="https://apis.google.com/js/platform.js"></script>
				<a className="g-ytsubscribe" data-channelid="UCvZKd-eUuq8A66J-uLr4CZQ" data-layout="default" data-theme="dark" data-count="default" data-onytevent="onYtEvent"></a>

				<span className="social-share-link" data-href="https://www.theresaonthetown.com" data-layout="button_count" data-size="small" data-mobile-iframe="true">
					<a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.theresaonthetown.com%2F&amp;src=sdkpreparse">
						<i className="fa fa-lg fa-facebook"></i>
					</a>
				</span>

				<a className="social-share-link" data-pin-do="buttonFollow" href="https://www.pinterest.com/theresaonthetwn"><i className="fa fa-lg fa-pinterest"></i></a>
			</div>
		</div>
	</article>
)
const ARTICLE_POST_SINGLE = (props) => (
	<article className="post">
		<div className="header-post">
			<h2 className="title-post">
				{props.article.fields.title}
			</h2>
			<p className="date-event date-style-2"> <span>{props.created}</span></p>
		</div>

		<div className="blog-post-single-image-container">
			{props.image}
		</div>
		<h5 className="sub_title">{props.article.fields.subHeader}</h5>

		<div className="content-post">
			<ReactMarkdown source={props.article.fields.content} />
		</div>
		<div className="direction clearfix">
			<ul className="tags">
				<li>Tags:</li>
				<li>
					<a href="#">{props.tags}</a>
				</li>


			</ul>

			<div className="social-links">
				<span>Share :</span>

				<a className="social-share-link" href="https://www.instagram.com/theresaonthetown/?ref=badge">
					<i className="fa fa-lg fa-instagram"></i>
				</a>
				<script rel="preload" src="https://apis.google.com/js/platform.js"></script>
				<a className="g-ytsubscribe" data-channelid="UCvZKd-eUuq8A66J-uLr4CZQ" data-layout="default" data-theme="dark" data-count="default" data-onytevent="onYtEvent"><i className="fa fa-lg fa-youtube"></i></a>
				
				<span data-href="https://www.theresaonthetown.com" data-layout="button_count" data-size="small" data-mobile-iframe="true">
					<a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.theresaonthetown.com%2F&amp;src=sdkpreparse">
						<i className="fa fa-lg fa-facebook"></i>
					</a>
				</span>

				<a href="https://www.pinterest.com/theresaonthetwn"><i className="fa fa-lg fa-pinterest"></i></a>
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

	componentWillUnmount() {
		AppStore.removeChangeListener(this._onChange)
	}

	_onChange() {

	}
	componentDidMount() {
		AppStore.addChangeListener(this._onChange.bind(this))

	}

	handleLinkClick() {
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
		let created = months[(date_obj.getMonth() + 1)] + ' ' + date_obj.getDate() + ', ' + date_obj.getFullYear()
		let category = article.fields.category ? article.fields.category[0].fields.title.split(' ')[0].toLowerCase() : null
		let readMore = <Link to={'/' + category + '/' + article.fields.title} onClick={this.scrollTop}>Read More</Link>

		let image
		let image_div = hasPhoto(article) ? article.fields.photos[0].fields.file.url : null
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

			blog_post_single = <ARTICLE_POST_SINGLE article={article} image={image} created={created} tags={tags} />
		}

		return (
			<div id="Blog">

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
																	<img src={article.fields.photos ? article.fields.photos[0].fields.file.url : null} alt="image" />
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
																	<img src={entry.fields.photos[0].fields.file.url} alt="image" />
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

														let readMore = <Link to={'/videos/' + entry.fields.title} onClick={this.scrollTop}>Check it out</Link>
														return (
															<li>
																<div className="thumb">
																	<ReactPlayer url={entry.fields.videos ? entry.fields.videos[0].fields.file.url : entry.fields.link} height='100px' width='150px' />
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
