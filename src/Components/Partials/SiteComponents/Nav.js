// Nav.js
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Search from './Search'
import '../../css/search.css'

// import Modal from './Modal'

class Modal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showModal: props.showModal
        }
    }
    handleModalClose(e) {
        e.preventDefault()

        if (this.state.showModal) {
            this.setState({showModal: false})
        } else {
            this.setState({showModal: true})
        }
    }
    render() {

        const hide = {
            position: 'fixed',
            top: 20 + '%',
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1050,
            display: 'none',
            overflow: 'hidden',
            outline: 0,
            opacity: 0,
            transition: 'opacity' + .15 + 's linear'
        }
        const show = {
            position: 'fixed',
            top: 20 + '%',
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1050,
            display: 'block',
            overflow: 'hidden',
            outline: 0,
            opacity: 1,
            transition: 'opacity' + .15 + 's linear'
        }

        let modal_style = this.props.showModal
            ? show
            : hide

        return (
            <div style={modal_style} id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={this.handleModalClose.bind(this)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <footer id="main-footer">
                            <div className="container-fluid footer-bottom">
                                <div className="row">
                                    <div className="col-md-8 col-md-offset-2">
                                        <div className="footer-form">
                                            <div className="section-headline">
                                                <h3>Are You A Tall
                                                    <span className="red"> Fashionista </span>
                                                    Or
                                                    <span className="red"> Fashion Fanatic?</span>
                                                </h3>
                                            </div>
                                            <p>Join the mailing list and be the first to know about product picks, style inspiration, and money saving tips.
                                            </p>

                                            <form id="" name="subscribe-form" method="post">
                                                <input id="" type="text" placeholder="Email" name="email" required="required" className="subscribe-style"/>
                                                <button type="button" data-value="subscribe" data-wait="Please wait..." className="w-button subscribe-button">Subscribe</button>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <div className="footer-social-block">
                                            <a href="#">
                                                <i className="fa fa-instagram w-inline-block social-wrap"></i>
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-youtube w-inline-block social-wrap"></i>
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-facebook w-inline-block social-wrap"></i>
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-pinterest w-inline-block social-wrap"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>

                    </div>
                </div>
            </div>
        )
    }
}

export default class Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
			searchOpen: false
        }
    }

    modalTriggerClick(e) {
        console.log(e)
        e.preventDefault()

        if (this.state.showModal) {
            this.setState({showModal: false})
        } else {
            this.setState({showModal: true})
        }
    }
	handleCloseClick(e){
		e.preventDefault()
		this.setState({searchOpen: false})
	}

    searchClick(e){
		e.preventDefault()
		if (this.state.searchOpen) {
            this.setState({searchOpen: false})
        } else {
            this.setState({searchOpen: true})
        }
	}

    render() {

		const search_button_styles = {

		}
		const SearchButton = () => {
			return (
				<div className="search-wrap">
					<button id="btn-search" className="btn btn--search">
						<i className="fa fa-search"></i>
					</button>
				</div>
			)
		}
        const data = this.props.data
        const nav_items = data.globals.nav_items
        const title_font = {
            fontSize: '30px',
            color: '#333'
        }

        if (!nav_items) {
            return <div></div>
        }
		const search_trigger = <li>
			<a className="search-trigger" href="#" onClick={this.searchClick.bind(this)}><i className="fa fa-search"></i></a>
		</li>
        const menu_items = nav_items.map((nav_item) => {
            if (nav_item.value === 'Theresa on the Town') {
                return (
                    <li key={'key-' + nav_item.value} className="site-title">
                        <Link style={title_font} onClick={this.handleClick} to={'/' + nav_item.value}>{nav_item.title}</Link>
                    </li>
                )
            } else {
                return (
                    <li key={'key-' + nav_item.value}>
                        <Link onClick={this.handleClick} to={'/' + nav_item.value}>{nav_item.title}</Link>
                    </li>
                )
            }
        })
		menu_items.push(search_trigger)
        const modalToggle = this.state.showModal
		let navClassForSearch
		if (this.state.searchOpen){
			navClassForSearch = "search-visible"
		} else {
			navClassForSearch = ""
		}
        return (
            <div id="Nav" className={navClassForSearch}>
                <Modal showModal={this.state.showModal}/>

                <header id="header" className="header clearfix">
                    <div className="header-wrap clearfix">
                        <div className="container">
                            <div className="logo-mobi"></div>
                            <div className="btn-menu">
                                <span></span>
                            </div>
                            <nav id="mainnav" className="mainnav">
                                <ul className="menu">
                                    {menu_items}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>
				<div className="search-wrap">
					<form role="search" method="get" className="search-form" action="#">
						<label>
							<span className="hide-content">Search for:</span>
							<input type="search" className="search-field" placeholder="Type Your Keywords" value="" name="s" title="Search for:" autocomplete="off" />
						</label>
						<input type="submit" className="search-submit" value="Submit"/>
					</form>

					<a href="#" id="close-search" className="close-btn" onClick={this.handleCloseClick.bind(this)}><i className="fa fa-times" aria-hidden="true"></i></a>
				</div>
                <div className="flat-vertical social-links">
					<a href="#">
                        <i className="fa fa-pinterest"></i>
                    </a>
					<a href="#">
                        <i className="fa fa-facebook"></i>
                    </a>
					<a href="#">
                        <i className="fa fa-youtube"></i>
                    </a>
                    <a href="#">
                        <i className="fa fa-instagram"></i>
                    </a>
                    <span>FOLLOW ME</span>
                </div>
                <div className="flat-vertical reservation">
                    <a href="#" onClick={this.modalTriggerClick.bind(this)}>
                        <span>SIGN UP</span>
                    </a>
                </div>
            </div>

        )
    }
}
