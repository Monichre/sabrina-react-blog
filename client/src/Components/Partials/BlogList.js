// BlogList.js
import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import BlogSingle from './BlogSingle'
import BlogPostPreview_Left from './BlogPostPreviewLeft'
import BlogPostPreview_Right from './BlogPostPreviewRight'
import AffiliatePost from './AffiliatePost'
import CONSTANTS from '../../constants'


export default class BlogList extends Component {

	render() {

		let data = this.props.data
		let item_num = data.item_num
		let articles = data.articles.slice(3, (data.articles.length - 1))

		let load_more
		let show_more_text = 'More Posts'

		if (data.loading) {
			show_more_text = 'Loading...'
		}

		if (articles && item_num <= articles.length) {
			load_more = (
				<div className="getMoreArticles">
					<button className="btn btn-default center-block" onClick={this.props.getMoreArticles.bind(this)}>
						{show_more_text}
					</button>
				</div>
			)
		}

		articles = _.take(articles, item_num)

		let articles_html = articles.map((article) => {
			let date_obj = new Date(article.sys.createdAt)
			let created = CONSTANTS.months[date_obj.getMonth()] + ' ' + date_obj.getDate() + ', ' + date_obj.getFullYear()
			let category = article.fields.category[0].fields.title.split(' ')[0].toLowerCase()
			let readMore = <Link to={'/' + category + '/' + article.fields.title}>Read More</Link>
			const subTitle = Object.keys(article.fields).includes('subHeader') ? article.fields.subHeader : null
			
		 	if (articles.indexOf(article) % 2 === 0) {
				return (
					<BlogPostPreview_Right
						key={'key-' + article.sys.id}
						date={created}
						image={CONSTANTS.hasPhoto(article) ? article.fields.mainPhotos[0].fields.file.url : null}
						readMore={readMore}
						title={article.fields.title}
						content={article.fields.content}
						subTitle={subTitle}
					/>
				)
			} else {
				return (
					<BlogPostPreview_Left
						key={'key-' + article.sys.id}
						date={created}
						image={CONSTANTS.hasPhoto(article) ? article.fields.mainPhotos[0].fields.file.url : null}
						readMore={readMore}
						title={article.fields.title}
						content={article.fields.content}
						subTitle={subTitle}
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
