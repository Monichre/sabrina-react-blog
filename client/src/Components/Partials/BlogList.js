// BlogList.js
import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import BlogSingle from './BlogSingle'
import BlogPostPreview_Left from './BlogPostPreviewLeft'
import BlogPostPreview_Right from './BlogPostPreviewRight'
import AffiliatePost from './AffiliatePost'
import VideoPostLeft from './VideoPostLeft'
import VideoPostRight from './VideoPostRight'

export default class BlogList extends Component {

	render() {

		let data = this.props.data
		let item_num = data.item_num
		let articles = data.articles

		let load_more
		let show_more_text = 'More Posts'

		if (data.loading) {
			show_more_text = 'Loading...'
		}

		if (articles && item_num <= articles.length) {
			load_more = (
				<div>
					<button className="btn btn-default center-block" onClick={this.props.getMoreArticles.bind(this)}>
						{show_more_text}
					</button>
				</div>
			)
		}

		articles = _.take(articles, item_num)
		const months = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"]
		const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

		const hasPhoto = article => article.fields.photos

		
		let articles_html = articles.map((article) => {
			let date_obj = new Date(article.sys.createdAt)
			let created = months[(date_obj.getMonth() + 1)] + ' ' + date_obj.getDate() + ', ' + date_obj.getFullYear()
			let category = article.fields.category[0].fields.title.split(' ')[0].toLowerCase()
			let readMore = <Link to={'/' + category + '/' + article.fields.title} onClick={this.scrollTop}>Read More</Link>
			
		 	if (articles.indexOf(article) % 2 === 0) {
				return (
					<BlogPostPreview_Right
						key={'key-' + article.sys.id}
						date={created}
						image={hasPhoto(article) ? article.fields.photos[0].fields.file.url : null}
						readMore={readMore}
						title={article.fields.title}
						content={article.fields.content}
					/>
				)
			} else {
				return (
					<BlogPostPreview_Left
						key={'key-' + article.sys.id}
						date={created}
						image={hasPhoto(article) ? article.fields.photos[0].fields.file.url : null}
						readMore={readMore}
						title={article.fields.title}
						content={article.fields.content}
					/>
				)
			}
		})

		return (
			<div>
				<div>{articles_html}</div>
				{load_more}
			</div>
		)
	}
}
