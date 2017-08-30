// BlogList.js
import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import FuzzySearch from 'fuzzy-search'
import AppStore from '../../../Stores/AppStore'

const searchItemToAppend = (props) => {
	return (
		<div className='search-result animated slideInUp'>
			<img className='search-result-thumbnail' src={props.image.url}/>
			<h5><Link to={props.link_url}>{props.title}</Link></h5>
		</div>
	)
}


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
		const searcher = new FuzzySearch(articles, ['title', 'slug', 'content'], {
			caseSensitive: false,
			sort: true
		})
		const results = searcher.search(this.state.searchTerm)
		console.log(this.state.searchTerm)
		console.log(results)

		if (results.length > 0){
			this.setState({
				searchResults: results,
				searchSuccess: true
			})
		}
	}
	appendSearchItems(searchItem){
		console.log(searchItem)
		let media
		return (
			<searchItemToAppend image={searchItem.metadata.photo ? searchItem.metadata.photo : searchItem.metadata.affiliate_item.metadata.photo} />
		)
	}

	render() {

	

		return (
			<div className="search-wrap">
				<form role="search" className="search-form" onSubmit={this.handleSearchSubmit}>
					<label>
						<span className="hide-content">Search for:</span>
						<input type="search" className="search-field" placeholder="Type Your Keywords" value={this.state.searchTerm.value} onChange={this.handleSearchInput} name="searchTerm" title="Search for:" autocomplete="off" />
					</label>
					<input type="submit" className="search-submit" value="Submit"/>
				</form>
				<a href="#" id="close-search" className="close-btn" onClick={this.closeClick.bind(this)}><i className="fa fa-times" aria-hidden="true"></i></a>

				<div id="search-results">
					{this.state.searchResults.map(this.appendSearchItems)}
				</div>
			</div>
		)
	}
}
