// BlogList.js
import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
// import './search.css'
// import './search-ui.js'

const openCtrl = document.getElementById('btn-search')
const closeCtrl = document.getElementById('btn-search-close')
const searchContainer = document.querySelector('.search')
// const inputSearch = searchContainer.querySelector('.search__input')

export default class Search extends Component {
	constructor(props){
		super(props)

		this.state = {

		}
	}
	animateSearch(){
		this.initEvents()
	}
	initEvents() {

		openCtrl.addEventListener('click', this.openSearch())
		closeCtrl.addEventListener('click', this.closeSearch())
		document.addEventListener('keyup', function(ev) {
			if( ev.keyCode == 27 ) {
				this.closeSearch();
			}
		})
	}
	openSearch() {
		searchContainer.classList.add('search--open')
		// inputSearch.focus()
	}
	closeSearch() {
		searchContainer.classList.remove('search--open')
		// inputSearch.blur()
		// inputSearch.value = ''
	}
	render() {
		

		return (
			<div className="search">
				<button id="btn-search-close" className="btn btn--search-close" aria-label="Close search form"><svg className="icon icon--cross"><use xlinkHref="#icon-cross"></use></svg></button>
				<form className="search__form" action="">
					<input className="search__input" name="search" type="search" placeholder="drones" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
					<span className="search__info">Hit enter to search or ESC to close</span>
				</form>
				<div className="search__related">
					<div className="search__suggestion">
						<h3>May We Suggest?</h3>
						<p>#drone #funny #catgif #broken #lost #hilarious #good #red #blue #nono #why #yes #yesyes #aliens #green</p>
					</div>
					<div className="search__suggestion">
						<h3>Is It This?</h3>
						<p>#good #red #hilarious #blue #nono #why #yes #yesyes #aliens #green #drone #funny #catgif #broken #lost</p>
					</div>
					<div className="search__suggestion">
						<h3>Needle, Where Art Thou?</h3>
						<p>#broken #lost #good #red #funny #hilarious #catgif #blue #nono #why #yes #yesyes #aliens #green #drone</p>
					</div>
				</div>
			</div>
		)
	}
}
