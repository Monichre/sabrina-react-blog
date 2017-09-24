// Nav.js
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import Search from './Search'
import MobileMenu from './MobileMenu'

import '../../css/Nav.css'
import SubscriptionStatus from './SubscriptionStatus'


class Modal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            subscriptionEmail: '',
            showModal: props.showModal,
            email_sent: false
        }
        this.handleSubscriptionEmail = this.handleSubscriptionEmail.bind(this)
    }

    handleSubmit(event){
        event.preventDefault()
        this.sendTheEmail()
    }
    handleSubscriptionEmail(event) {
        console.log(event.target.value)
        this.setState({subscriptionEmail: event.target.value})
    }
    sendTheEmail(){
        console.log('I should be sending the goddamn email')
        let _this = this
        Axios.post('/subscribe', {
            email_address: this.state.subscriptionEmail
        })
        .then(function(res) {
            console.log(res)
            if (res.status === 200) {
                _this.setState({
                    email_sent: true,
                    showModal: false
                })
            }
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    render() {
        let EMAIL_MODAL
        let hidden
        let footer_style
		if (this.state.email_sent) {
			EMAIL_MODAL = <SubscriptionStatus/>
            hidden = {
                display: 'none'
            }
            footer_style = {
                height: '400px'
            }
			
		}

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
                            <button type="button" className="close" onClick={this.props.closeModal.bind(this)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <footer id="main-footer" style={footer_style}>
                            <div className="container-fluid footer-bottom">
                                {EMAIL_MODAL}
                                <div className="row" style={hidden}>
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

                                            <form id="" name="subscribe-form" onSubmit={this.handleSubmit.bind(this)}>
                                                <input id="" type="text" placeholder="Email" name="email" required="required" className="subscribe-style" value={this.state.subscriptionEmail.value} onChange={this.handleSubscriptionEmail}/>
                                                <button type="submit" data-value="subscribe" data-wait="Please wait..." className="w-button subscribe-button">subscribe</button>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                                <hr style={hidden}/>
                                <div className="row" style={hidden}>
                                    
                                    <div className="col-xs-12">
                                        <div className="footer-social-block">
                                            <a href="https://www.instagram.com/theresaonthetown/"><i className="fa fa-lg fa-instagram w-inline-block social-wrap"></i></a>
                                            <a href="https://www.youtube.com/channel/UCvZKd-eUuq8A66J-uLr4CZQ"><i className="fa fa-lg fa-youtube w-inline-block social-wrap"></i></a>
                                            <a href="https://www.facebook.com/theresaonthetown/"><i className="fa fa-lg fa-facebook w-inline-block social-wrap"></i></a>
                                            <a href="https://www.pinterest.com/theresaonthetwn/"><i className="fa fa-lg fa-pinterest w-inline-block social-wrap"></i></a>
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
	handleCloseClick(closeTheSearch){
		console.log(closeTheSearch)
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
                        <Link style={title_font} onClick={this.handleClick} to={'/'}>{nav_item.title}</Link>
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
                <Modal showModal={this.state.showModal} closeModal={this.modalTriggerClick.bind(this)}/>
                
                <header id="header" className="header clearfix">
                    <div className="header-wrap clearfix">
                        <div className="container">
                            <div className="logo-mobi"></div>
                            <MobileMenu />
                            <nav id="mainnav" className="mainnav">
                                <ul className="menu">
                                    {menu_items}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>

				<Search onCloseSearchClick={this.handleCloseClick.bind(this)} />

                <div className="flat-vertical social-links side_nav">
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
                <div className="flat-vertical reservation side_nav">
                    <a href="#" onClick={this.modalTriggerClick.bind(this)}>
                        <span>SIGN UP</span>
                    </a>
                </div>
            </div>

        )
    }
}
