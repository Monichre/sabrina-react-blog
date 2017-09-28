// BlogList.js
import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import FuzzySearch from 'fuzzy-search'
import AppStore from '../../../Stores/AppStore'
import '../../css/Nav.css'


const SearchResultsList = (props) => (
	<div className='search-result'>
		<h5 className="search-result-item-title">
			<div className="search-result-thumbnail">
				<img src={props.result.fields.photos ? props.result.fields.photos[0].fields.file.url : null} />
			</div>
			<Link to={'/' + props.result.fields.category[0].fields.title.split(' ')[0].toLowerCase() + '/' + props.result.fields.title} onClick={props.onClick.bind(this)}>{props.result.fields.title}</Link> 
		</h5>
	</div>
)
export default class Search extends Component {
	constructor(props){
		super(props)

		this.state = {
			closeTheSearch: false,
			searchTerm: '',
			searchSuccess: false,
			searchResults: []
		}
		this.handleSearchInput = this.handleSearchInput.bind(this)
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
	}
	handleSearchInput(event){
		let search_term = event.target.value
		this.setState({searchTerm: search_term})
	}
	closeClick(e){
		e.preventDefault()
		this.setState({closeTheSearch: true})
		this.props.onCloseSearchClick(this.state.closeTheSearch)
	}
	handleSearchSubmit(event){
		event.preventDefault()
		const articles = AppStore.data.articles
		console.log(articles);
		const searcher = new FuzzySearch(articles, ['fields.title'], {
			caseSensitive: false,
			sort: true
		})
		console.log(this.state.searchTerm)
		const results = searcher.search(this.state.searchTerm)
		console.log(results)
		if (results.length > 0){
			this.setState({searchSuccess: true})
			let _this = this
			results.forEach(function(result){
				_this.state.searchResults.push(result)
			})
		}
	}
	appendSearchItems(searchItem){
		let media
		return (
			<searchItemToAppend image={searchItem.fields.photos ? searchItem.fields.photos[0].fields.files.url : null} />
		)
	}
	handleSearchItemClick(){
		document.getElementById('Nav').classList.remove('search-visible')
	}

	render() {

		let search_active
		if (this.state.searchSuccess){
			search_active = "search-active"
		}else {
			search_active = ''
		}
		return (
			<div className={this.state.searchSuccess ? "search-wrap search-active" : "search-wrap"}>
				<form role="search" className="search-form" onSubmit={this.handleSearchSubmit}>
					<label>
						<span className="hide-content">Search for:</span>
						<input type="search" className="search-field" placeholder="Type Your Keywords" value={this.state.searchTerm.value} onChange={this.handleSearchInput} name="searchTerm" title="Search for:" autocomplete="off" />
					</label>
					<input type="submit" className="search-submit" value="Submit"/>
				</form>
				<a href="#" id="close-search" className="close-btn" onClick={this.closeClick.bind(this)}><i className="fa fa-times" aria-hidden="true"></i></a>

				<div id="search-results" className={search_active}>
					<div className="search-menu">
						{this.state.searchResults.map(result =>
							<SearchResultsList result={result} onClick={this.handleSearchItemClick.bind(this)} />
						)}
					</div>
				</div>
			</div>
		)
	}
}
