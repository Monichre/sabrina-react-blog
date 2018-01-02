import React, { Component } from 'react'
import { Switch, Link, Route } from 'react-router-dom'
import BlogPostPreviewLeft from './BlogPostPreviewLeft'
import BlogPostPreviewRight from './BlogPostPreviewRight'
import BlogSingle from './BlogSingle'
import CONSTANTS from '../../constants'
import AppDispatcher from '../../Dispatcher/AppDispatcher'
import _ from 'lodash'
import ReactPaginate from 'react-paginate'

export default class TravelPosts extends Component {
	constructor(props) {
		super(props)

		this.state = {
			page_count: 0,
			item_num: 0,
			counter: 0
		}
	}


	getMoreArticles(data) {

		const mapHeight = document.querySelector('.map-container').clientHeight
		let selected = data.selected
		
		this.setState({
			counter: selected
		})

		document.body.scrollTop = mapHeight + 200
		document.documentElement.scrollTop = mapHeight + 200
		
	}
	componentWillMount() {

		let item_num = this.props.data.item_num
		let total_articles = this.props.data.travel.length
		let page_count = Math.ceil(total_articles / item_num)
		
		this.setState({
			page_count: page_count,
			item_num: item_num
		})
	}

	render() {

		const SubRoutes = () => (
			<Switch>
				<Route path='/travel/:slug' component={BlogSingle} />
			</Switch>
		)

		let data = this.props.data
		let articles = data.travel
		let item_num = data.item_num
		let counter = this.state.counter

		articles = _.chunk(articles, 5)
		
		let articles_subSection = articles[counter]
		let articles_html = articles_subSection.map((article) => {
			let date_obj = new Date(article.sys.createdAt)
			let created = CONSTANTS.months[(date_obj.getMonth())] + ' ' + date_obj.getDate() + ', ' + date_obj.getFullYear()
			let category = article.fields.category[0].fields.title.split(' ')[0].toLowerCase()
			let readMore = <Link to={'/' + category + '/' + article.fields.title} onClick={this.scrollTop}>Read More</Link>
			let subTitle = Object.keys(article.fields).includes('subHeader') ? article.fields.subHeader : null
			let article_link = '/' + category + '/' + article.fields.title

			if (articles_subSection.indexOf(article) % 2 === 0) {
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
