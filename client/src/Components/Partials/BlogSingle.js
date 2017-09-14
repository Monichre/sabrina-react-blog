import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AppDispatcher from '../../Dispatcher/AppDispatcher'

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
    componentDidMount() {}

    render() {
        const data = this.props.data
        const article = data.article
		let date_obj = new Date(article.created)
        let created = (date_obj.getMonth()+1) + '/' + date_obj.getDate() + '/' + date_obj.getFullYear()
		let image
		let image_div = article.metafield.photo ? article.metafield.photo.url : null
		if (image_div != null) {
			image = <img src={image_div} alt="image" />
		}
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
                                                {article.title}
                                            </h2>
											<p className="date-event date-style-2"> <span>{created}</span></p>
                                        </div>

                                        	<div className="blog-post-single-image-container">
                                                {image}
                                            </div>

                                            <div className="content-post">
                                                <h5></h5>
                                                <p dangerouslySetInnerHTML={{
													__html: article.content
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
		                                            <a href="#">
		                                                <i className="fa fa-lg fa-instagram"></i>
		                                            </a>
		                                            <a href="#">
		                                                <i className="fa fa-lg fa-youtube"></i>
		                                            </a>
		                                            <a href="#">
		                                                <i className="fa fa-lg fa-facebook"></i>
		                                            </a>
		                                            <a href="#">
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
														<a href="#">Health & Wellness (9)</a>
													</li>
													<li>
														<a href="#">Travel (9)</a>
													</li>
													<li>
														<a href="#">Fashion & Style (9)</a>
													</li>

												</ul>
											</div>

											<div className="widget widget_recent_entries clearfix">
												<h3 className="widget-title">Recent Post</h3>
												<ul className="recent-post clearfix">
													{this.props.data.articles.splice(0,3).map((article, i) =>
														<li>
															<div className="thumb">
																<img src={article.metafield.photo.url } alt="image"/>
															</div>
															<div className="text">
																<h4>
																	<Link to={ '/' + data.page.slug + '/' + article.slug }>{article.title}</Link>
																</h4>
															</div>
														</li>
													)}
												</ul>
											</div>
											<br />
											<br />
											<div className="widget widget_latest_tweets">
													<h3 className="widget-title">Latest Instagram Posts</h3>
													<ul>
														<li>
															<p>Portfolio Page Creation:
															</p>
															<p>
																<a href="#">https://t.co/TN773odoa</a>@YouTube</p>
															<p>5 days ago</p>
														</li>

														<li>
															<p>Portfolio Page Creation:</p>
															<p>@YouTube</p>
															<p>5 days ago</p>
														</li>
														<li>
															<p>Portfolio Page Creation:</p>
															<p></p>
															<p>5 days ago</p>
														</li>
													</ul>
												</div>
											<div className="widget widget_tag">
													<h3 className="widget-title">Popular Tags</h3>
													<div className="tag-list">
														<a className="active" href="#">example,
														</a>
														<a href="#">Gallery,
														</a>
														<a href="#">Image,
														</a>
														<a href="#">quote,
														</a>
														<a href="#">tag,
														</a>
														<a href="#">Video,</a>
														<a href="#">PSD Teplates,</a>
														<a href="#">Business,
														</a>
														<a href="#">Portfolio,
														</a>
														<a href="#">Construction,
														</a>
														<a href="#">One Page,
														</a>
													</div>
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
