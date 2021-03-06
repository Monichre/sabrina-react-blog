import React, { Component } from 'react'
import _ from 'lodash'
import { Link, HashRouter } from 'react-router-dom'
import { withRouter } from 'react-router'
import BlogSingle from './BlogSingle'
import BlogPostPreview_Left from './BlogPostPreviewLeft'
import BlogPostPreview_Right from './BlogPostPreviewRight'
import AffiliatePost from './AffiliatePost'
import CONSTANTS from '../../constants'
import ReactPaginate from 'react-paginate'

class BlogList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			page_count: 0,
			item_num: 0,
			counter: (this.props.history.location.hash && this.props.history.location.hash.replace('#', '') - 1 >= 0) ? (this.props.history.location.hash.replace('#', '') - 1) : 0
		}
	}
	
	getMoreArticles(data) {
		const { history } = this.props
		let scrollDistance = document.querySelector('.category-blog-post-previews').offsetTop
		let selected = data.selected
		const hash = `#${selected + 1}`

		this.setState({
			counter: selected
		})
		history.push({ hash: hash })
		document.body.scrollTop = scrollDistance
		document.documentElement.scrollTop = scrollDistance
	}
	componentWillMount() {
		let {data, history} = this.props
		let counter = (history.location.hash && history.location.hash.replace('#', '') - 1 >= 0) ? (history.location.hash.replace('#', '') - 1) : 0
		if (counter) {
			this.setState({
				counter: counter
			})
		}
		let page = data.page.fields.title
		let {item_num} = data
		let total_articles

		if (page === 'Fashion & Style') {
			total_articles = data.fashion.length
		} else if (page === 'Travel') {
			total_articles = data.travel.length
		} else if (page === 'Health & Wellness') {
			total_articles = data.health.length
		} else {
			total_articles = data.articles.length
		}

		this.setState({
			item_num: item_num
		})
	}


	render() {
		
		let {data} = this.props
		let page = data.page.fields.title
		let featured_posts = data.featured
		let currentPage = (this.props.history.location.hash && this.props.history.location.hash.replace('#', '') - 1 )  ? this.props.history.location.hash.replace('#', '') - 1 : 0
		let {item_num} = data
		let articles = data.articles.filter(article => article.fields.featured !== true)
		let { counter } = this.state

		if (page === 'Fashion & Style') {
			articles = data.fashion
		} else if (page === 'Travel') {
			articles = data.travel
		} else if (page === 'Health & Wellness') {
			articles = data.health
		}
		
		articles = _.chunk(articles, 5)
		let articles_subSection = articles[counter]
		let articles_html = articles_subSection.map((article) => {
			let date_obj = new Date(article.sys.createdAt)
			let created = CONSTANTS.months[date_obj.getMonth()] + ' ' + date_obj.getDate() + ', ' + date_obj.getFullYear()
			let category = article.fields.category ? article.fields.category[0].fields.title.split(' ')[0].toLowerCase() : null
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
						forcePage={currentPage}
						previousLabel={"previous"}
						nextLabel={"next"}
						breakLabel={'...'}
						breakClassName={"break-me"}
						pageCount={articles.length}
						marginPagesDisplayed={10}
						pageRangeDisplayed={articles.length}
						onPageChange={this.getMoreArticles.bind(this)}
						containerClassName={"pagination"}
						subContainerClassName={"pages pagination"}
						activeClassName={"active"} />
				</div>
		)
	}
}
export default withRouter(BlogList)