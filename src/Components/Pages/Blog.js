// Blog.js
import React, {Component} from 'react'
import _ from 'lodash'
import config from '../../config'
import PropTypes from 'prop-types';

// Components
import Header from '../Partials/Header'
import BlogList from '../Partials/BlogList'
import BlogSingle from '../Partials/BlogSingle'
import OwlCarousel from 'react-owl-carousel2';
import AppDispatcher from '../../Dispatcher/AppDispatcher'





export default class Blog extends Component {

    componentWillMount() {
        this.getPageData()

    }

    componentDidMount() {
        // const data = this.props.data
        // document.title = config.site.title + ' | ' + data.page.title
    }

    getPageData() {
        AppDispatcher.dispatch({action: 'get-page-data', page_slug: 'blog'})
    }

    getMoreArticles() {
        AppDispatcher.dispatch({action: 'get-more-items'})
    }

    render() {

        const data = this.props.data
        const featured_posts = data.posts.featured
        const globals = data.globals
        const pages = data.pages
        const options = {
            items: 1,
            nav: false,
			dots: false,
			margin: 10,
            autoplay: true
        }

        const events = {
            onDragged: function(event) {
                console.log(event)
            },
            onChanged: function(event) {
                console.log(event)
            }
        }

        let main_content
		main_content = <BlogList getMoreArticles={this.getMoreArticles} data={data} />

        // if (!this.props.params.slug) {
		//
        //     main_content = <BlogList getMoreArticles={this.getMoreArticles} data={data} />
		//
        // } else {
		// 	const articles = data.articles
		//
        //     // Get current page slug
        //     const slug = this.props.params.slug
        //     const articles_object = _.indexBy(articles, 'slug')
        //     const article = articles_object[slug]
        //     main_content = <BlogSingle article={article}/>
		// }

        return (
                <div>
					<OwlCarousel id="featured_posts" ref="owl" options={options} events={events}>
						{featured_posts.map(post =>
								<div className="featured_post">
									<img className="featured_post_img" src={post.metadata.photo.url} />
									<div className="featured_post_content">
										<section>
											<div className="title"> {post.title}</div>
											<div className="caption">{post.metadata.category.title.split()[0]}</div>
										</section>
									</div>
								</div>
						)}
					</OwlCarousel>

                {main_content}
            </div>
		)
	}
}
