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

	scrollTop() {

	}

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
		
		let articles_html = articles.map((article) => {
			let date_obj = new Date(article.created)
			let created = months[(date_obj.getMonth() + 1)] + ' ' + date_obj.getDate() + ', ' + date_obj.getFullYear()
			let readMore = <Link to={'/' + data.page.slug + '/' + article.slug} onClick={this.scrollTop}>Read More</Link>

			if (article.metadata.category.slug === "videoposts" && articles.indexOf(article) % 2 > 0) {
				return (
					<VideoPostLeft video={article.metadata.video.url} content={article.content} title={article.title} readMore={readMore} key={'key-' + article.slug} date={created}/>
				)
			} else if (article.metadata.category.slug === "videoposts" && articles.indexOf(article) % 2 === 0) {
				return (
					<VideoPostRight video={article.metadata.video.url} content={article.content} title={article.title} readMore={readMore} key={'key-' + article.slug} date={created}/>
				)
			} else if (article.metadata.category.slug === 'affiliateposts') {
				let affiliate_items = _.filter(article.metafields, (meta) => meta.key === 'affiliate_item')
				return (
					<AffiliatePost
						key={'key-' + article.slug}
						date={created}
						affiliateItems={affiliate_items}
						readMore={readMore}
						title={article.title}
						content={article.content}
					/>
				)
			} else if (articles.indexOf(article) % 2 === 0) {
				return (
					<BlogPostPreview_Right
						key={'key-' + article.slug}
						date={created}
						image={article.metafield.photo ? article.metafield.photo.url : null}
						readMore={readMore}
						title={article.title}
						content={article.content}
					/>
				)
			} else {
				return (
					<BlogPostPreview_Left
						key={'key-' + article.slug}
						date={created}
						image={article.metafield.photo ? article.metafield.photo.url : null}
						readMore={readMore}
						title={article.title}
						content={article.content}
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
