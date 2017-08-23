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
                                                <a href="#">{article.title}</a>
                                            </h2>
                                            <p className="time-post">

                                            </p>
                                        </div>

                                        	<div className="feature-post">
                                            	<a href="blog-single.html">
                                                <img src="" alt="image" /></a>
                                            </div>

                                            <div className="content-post">
                                                <h5></h5>
                                                <p dangerouslySetInnerHTML={{
													__html: article.content
												}}></p>

                                            </div>
										</article>

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
                                                                    <li>
                                                                        <div className="thumb">
                                                                            <img src="images/blog/1.jpg" alt="imgae"/></div>
                                                                            <div className="text">
                                                                                <h4>
                                                                                    <a href="#">Post with couple photos inside</a>
                                                                                </h4>
                                                                                <p>On 13 Nov 2015</p>
                                                                            </div>
                                                                        </li>

                                                                        <li>
                                                                            <div className="thumb">
                                                                                <img src="images/blog/2.jpg" alt="imgae"/></div>
                                                                                <div className="text">
                                                                                    <h4>
                                                                                        <a href="#">Post with couple photos inside</a>
                                                                                    </h4>
                                                                                    <p>On 13 Nov 2015</p>
                                                                                </div>
                                                                            </li>

                                                                            <li>
                                                                                <div className="thumb">
                                                                                    <img src="images/blog/3.jpg" alt="imgae"/></div>
                                                                                    <div className="text">
                                                                                        <h4>
                                                                                            <a href="#">Post with couple photos inside</a>
                                                                                        </h4>
                                                                                        <p>On 13 Nov 2015</p>
                                                                                    </div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>


                                                                        <div className="widget widget_latest_tweets">
                                                                            <h3 className="widget-title">Latest Tweets</h3>
                                                                            <ul>
                                                                                <li>
                                                                                    <p>Portfolio Page Creation:
                                                                                    </p>
                                                                                    <p>
                                                                                        <a href="#">https://t.co/TN773odoa</a>@YouTube</p>
                                                                                    <p>5 days ago</p>
                                                                                </li>

                                                                                <li>
                                                                                    <p>Portfolio Page Creation:
                                                                                    </p>
                                                                                    <p>
                                                                                        <a href="#">https://t.co/TN773odoa</a>
                                                                                        @YouTube</p>
                                                                                    <p>5 days ago</p>
                                                                                </li>

                                                                                <li>
                                                                                    <p>Portfolio Page Creation:
                                                                                    </p>
                                                                                    <p>
                                                                                        <a href="#">https://t.co/TN773odoa</a>
                                                                                        @YouTube</p>
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
									</div>
								</div>
				)
			}
		}
