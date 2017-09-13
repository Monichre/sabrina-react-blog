import React, { Component } from 'react'
import { Switch, Link, Route } from 'react-router-dom'
import VideoPostLeft from './VideoPostLeft'
import VideoPostRight from './VideoPostRight'
import BlogPostPreviewLeft from './BlogPostPreviewLeft'
import BlogPostPreviewRight from './BlogPostPreviewRight'
import BlogSingle from './BlogSingle'

export default class TravelPosts extends Component {

	scrollTop() {

	}

	render() {

		let data = this.props.data
		let articles = data.posts.travelposts

		let load_more
		let show_more_text = 'Show More Articles'

		const SubRoutes = () => (
			<Switch>
				<Route path='/travel/:slug' component={BlogSingle} />
			</Switch>
		)

		const months = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"]
		const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']


		let articles_html = articles.map((article) => {
			let date_obj = new Date(article.created)
			let created = months[(date_obj.getMonth() + 1)] + ' ' + date_obj.getDate() + ', ' + date_obj.getFullYear()

			let readMore = <Link to={`/travel/${article.slug}`}>Read More</Link>

			if (article.metadata.category.slug === "videoposts" && articles.indexOf(article) % 2 > 0) {
				return (
					<VideoPostLeft video={article.metadata.video.url} content={article.content} title={article.title} readMore={readMore} key={'key-' + article.slug} date={created} />
				)
			} else if (article.metadata.category.slug === "videoposts" && articles.indexOf(article) % 2 === 0) {
				return (
					<VideoPostRight video={article.metadata.video.url} content={article.content} title={article.title} readMore={readMore} key={'key-' + article.slug} date={created} />
				)
			} else if (articles.indexOf(article) % 2 === 0) {
				return (
					<BlogPostPreviewRight
						key={'key-' + article.slug}
						date={created}
						image={article.metadata ? article.metadata.photo.url : null}
						readMore={readMore}
						title={article.title}
						content={article.content}
					/>
				)
			} else {
				return (
					<BlogPostPreviewLeft
						key={'key-' + article.slug}
						date={created}
						image={article.metadata ? article.metadata.photo.url : null}
						readMore={readMore}
						title={article.title}
						content={article.content}
					/>
				)
			}
		})
		return (
			<div className="category-blog-post-previews">			
				{articles_html}
			</div>
		)
	}
}
