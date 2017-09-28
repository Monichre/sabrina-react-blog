import React, {Component} from 'react'
import { Switch, Link, Route, Redirect } from 'react-router-dom'
import ReactPlayer from 'react-player'

import AppDispatcher from '../../Dispatcher/AppDispatcher'
import AppStore from '../../Stores/AppStore'

export default class BlogSingle extends Component {

    componentWillMount() {
        console.log(this.props.match)
        console.log(this.props.match.params)
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
		// this.getPageData()
		console.log(this.props.match)
        console.log(this.props.match.params)
	}
	componentDidMount() {
		AppStore.addChangeListener(this._onChange.bind(this))
		
	}

	handleLinkClick(){
		let data = this.props.data
		let article = data.article
		let category = article.fields.category ? article.fields.category[0].fields.title.split(' ')[0].toLowerCase() : null
		let old_path = `/${category}/${article.fields.title}`
		const SubRoutes = () => (
			<Switch>
				<Redirect from={old_path} to='/new-path'/>
				
			</Switch>
		)
	}

    render() {
		
        const data = this.props.data
		const article = data.article
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
		let all_affiliate_items = []

		if (data.affiliate_entries) {
			// let getItem = entry => entry.
			data.affiliate_entries.forEach(entry => entry.fields.affiliateItems.forEach(item => all_affiliate_items.push(item)))
		}

		console.log(all_affiliate_items)

        return (
            <div>

                <div className="page-title parallax flat_strech parallax1">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="title-section">
                                    <h1 className="title">Blog</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main-content blog-single">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="content-wrap">
                                    <article className="post">
                                        <div className="header-post">
                                            <h2 className="title-post">
                                                {article.fields.title}
                                            </h2>
											<p className="date-event date-style-2"> <span>{created}</span></p>
                                        </div>

                                        	<div className="blog-post-single-image-container">
                                                {image}
                                            </div>

                                            <div className="content-post">
                                                
                                                <p dangerouslySetInnerHTML={{
													__html: article.fields.content
												}}></p>

                                            </div>
											<div className="direction clearfix">
		                                        <ul className="tags">
		                                            <li>Tags:
		                                            </li>
		                                            <li>
		                                                <a href="#"></a>
		                                            </li>
		                                            <li>
		                                                <a href="#"></a>
		                                            </li>
		                                            <li>
		                                                <a href="#"></a>
		                                            </li>

		                                        </ul>

		                                        <div className="social-links">
		                                            <span>Share :</span>
								
													<a href="https://www.instagram.com/theresaonthetown/">
		                                                <i className="fa fa-lg fa-instagram"></i>
		                                            </a>
		                                            <a href="https://www.youtube.com/channel/UCvZKd-eUuq8A66J-uLr4CZQ">
		                                                <i className="fa fa-lg fa-youtube"></i>
		                                            </a>
		                                            <a href="https://www.facebook.com/theresaonthetown/">
		                                                <i className="fa fa-lg fa-facebook"></i>
		                                            </a>
		                                            <a href="https://www.pinterest.com/theresaonthetwn/">
		                                                <i className="fa fa-lg fa-pinterest"></i>
		                                            </a>
		                                        </div>
		                                    </div>
									</article>

                                </div>
                            </div>
							<div className="col-md-4">
								<div className="sidebars">
									<div className="sidebars-wrap">
										<div className="sidebar">

											<div className="widget widget_categories">
												<h3 className="widget-title">Categories</h3>
												<ul>
													<li>
														<a href="/health">Health & Wellness ({data.articles.health.length})</a>
													</li>
													<li>
														<a href="/travel">Travel ({data.articles.travel.length})</a>
													</li>
													<li>
														<a href="/fashion">Fashion & Style ({data.articles.fashion.length})</a>
													</li>

												</ul>
											</div>

											<div className="widget widget_recent_entries clearfix">
												<h3 className="widget-title">Recent Post</h3>
												<ul className="recent-post clearfix">
													{this.props.data.articles.splice(0,3).map((article, i) => {
														let category = article.fields.category ? article.fields.category[0].fields.title.split(' ')[0].toLowerCase() : null
														let readMore = <Link to={'/' + category + '/' + article.fields.title} onClick={this.scrollTop}>Read More</Link>
														return (
															<li>
																<div className="thumb">
																	<img src={article.fields.photos ? article.fields.photos[0].fields.file.url: null} alt="image"/>
																</div>
																<div className="text">
																	<h4>
																	<Link to={'/' + category + '/' + article.fields.title} onClick={this.handleLinkClick.bind(category, article.fields.title)}>Check it out</Link>
																	</h4>
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
													<ul>
														{all_affiliate_items.map((entry) => {
															return (
																<li>
																	<div className="thumb">
																		<img src={entry.fields.photos[0].fields.file.url } alt="image"/>
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
													<ul>
														{data.video_entries.map((entry) => {
															let months = ["January", "February", "March", "April", "May", "June",
																"July", "August", "September", "October", "November", "December"]
															let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
															let date_obj = new Date(entry.sys.createdAt)
															let created = months[(date_obj.getMonth() + 1)] + ' ' + date_obj.getDate() + ', ' + date_obj.getFullYear()
															
															let readMore = <Link to={'/fashion/' + entry.fields.title} onClick={this.scrollTop}>Check it out</Link>
															return (
																<li>
																	<div className="thumb">
																		<ReactPlayer url={entry.fields.videos[0].fields.file.url } height='100px' width='150px'/>
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
