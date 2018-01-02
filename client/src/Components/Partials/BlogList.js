// BlogList.js
import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import BlogSingle from './BlogSingle'
import BlogPostPreview_Left from './BlogPostPreviewLeft'
import BlogPostPreview_Right from './BlogPostPreviewRight'
import AffiliatePost from './AffiliatePost'
import CONSTANTS from '../../constants'
import ReactPaginate from 'react-paginate'


export default class BlogList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			page_count: 0,
			item_num: 0,
			counter: 0
		}
	}
	getMoreArticles(data) {

		let scrollDistance = document.querySelector('.category-blog-post-previews').offsetTop	
		let selected = data.selected
		
		this.setState({
			counter: selected
		})

		document.body.scrollTop = scrollDistance
		document.documentElement.scrollTop = scrollDistance

	}
	componentWillMount() {

		let item_num = this.props.data.item_num
		let total_articles = this.props.data.travel.length
		console.log(total_articles)
		let page_count = Math.ceil(total_articles / item_num)
		
		this.setState({
			page_count: page_count,
			item_num: item_num
		})
	}


	render() {

		let data = this.props.data
		let featured_posts = data.featured
		let item_num = data.item_num
		let articles = data.articles.filter(article => article.fields.featured !== true)
		let counter = this.state.counter

		articles = _.chunk(articles, 5)
		
		let articles_subSection = articles[counter]

		let articles_html = articles_subSection.map((article) => {
			let date_obj = new Date(article.sys.createdAt)
			let created = CONSTANTS.months[date_obj.getMonth()] + ' ' + date_obj.getDate() + ', ' + date_obj.getFullYear()
			let category = article.fields.category[0].fields.title.split(' ')[0].toLowerCase()
			let readMore = <Link to={'/' + category + '/' + article.fields.title}>Read More</Link>
			let article_link = '/' + category + '/' + article.fields.title
			const subTitle = Object.keys(article.fields).includes('subHeader') ? article.fields.subHeader : null

			if (articles_subSection.indexOf(article) % 2 === 0) {
				return (
					<BlogPostPreview_Right
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
					<BlogPostPreview_Left
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
			<div>
				<div className="category-blog-post-previews">{articles_html}</div>

				<ReactPaginate
					previousLabel={"previous"}
					nextLabel={"next"}
					breakLabel={<a href="">...</a>}
					breakClassName={"break-me"}
					pageCount={this.state.page_count}
					marginPagesDisplayed={2}
					pageRangeDisplayed={this.state.page_count}
					onPageChange={this.getMoreArticles.bind(this)}
					containerClassName={"pagination"}
					subContainerClassName={"pages pagination"}
					activeClassName={"active"} />
				
			</div>
		)
	}
}
