import React, { Component } from 'react'
import { Switch, Link, Route } from 'react-router-dom'
import BlogPostPreviewLeft from './BlogPostPreviewLeft'
import BlogPostPreviewRight from './BlogPostPreviewRight'
import BlogSingle from './BlogSingle'
import CONSTANTS from '../../constants'

export default class TravelPosts extends Component {


	render() {

		let articles = this.props.data
		let load_more
		let show_more_text = 'Show More Articles'

		const SubRoutes = () => (
			<Switch>
				<Route path='/travel/:slug' component={BlogSingle} />
			</Switch>
		)

		let articles_html = articles.map((article) => {
			let date_obj = new Date(article.sys.createdAt)
			let created = CONSTANTS.months[(date_obj.getMonth())] + ' ' + date_obj.getDate() + ', ' + date_obj.getFullYear()
			let category = article.fields.category[0].fields.title.split(' ')[0].toLowerCase()
			let readMore = <Link to={'/' + category + '/' + article.fields.title} onClick={this.scrollTop}>Read More</Link>
			let subTitle = Object.keys(article.fields).includes('subHeader') ? article.fields.subHeader : null
			let article_link = '/' + category + '/' + article.fields.title
			
			if (articles.indexOf(article) % 2 === 0) {
				return (
					<BlogPostPreviewRight
						key={'key-' + article.sys.id}
						date={created}
						image={(CONSTANTS.hasPhoto(article) && article.fields.mainPhotos[0].fields) ? article.fields.mainPhotos[0].fields.file.url + '?w=800&h=1198&fit=fill' : null}
						readMore={readMore}
						title={article.fields.title}
						previewContent={article.fields.previewContent}
						subTitle={subTitle}
						article_link={article_link}
					/>
				)
			} else {
				return (
					<BlogPostPreviewLeft
						key={'key-' + article.sys.id}
						date={created}
						image={(CONSTANTS.hasPhoto(article) && article.fields.mainPhotos[0].fields) ? article.fields.mainPhotos[0].fields.file.url + '?w=800&h=1198&fit=fill' : null}
						readMore={readMore}
						title={article.fields.title}
						previewContent={article.fields.previewContent}
						subTitle={subTitle}
						article_link={article_link}
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
