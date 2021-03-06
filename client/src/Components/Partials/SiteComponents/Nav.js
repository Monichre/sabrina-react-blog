// Nav.js
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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

  handleSubmit(event) {
    event.preventDefault()
    this.sendTheEmail()
  }
  handleSubscriptionEmail(event) {
    this.setState({ subscriptionEmail: event.target.value })
  }
  sendTheEmail() {
    let _this = this
    Axios.post('/subscribe', {
      email_address: this.state.subscriptionEmail
    })
      .then(function(res) {
        if (res.status === 200) {
          _this.setState({
            email_sent: true,
            showModal: false
          })
        }
      })
      .catch(function(error) {
        alert(error)
      })
  }

  render() {
    let EMAIL_MODAL
    let hidden
    let footer_style
    if (this.state.email_sent) {
      EMAIL_MODAL = <SubscriptionStatus />
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
      transition: 'opacity' + 0.15 + 's linear'
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
      transition: 'opacity' + 0.15 + 's linear'
    }

    let modal_style = this.props.showModal ? show : hide

    return (
      <div style={modal_style} id="myModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={this.props.closeModal.bind(this)}>
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
                        <h3>{this.props.popUpText.fields.header}</h3>
                      </div>
                      <p>{this.props.popUpText.fields.subHeader}</p>

                      <form
                        id=""
                        name="subscribe-form"
                        onSubmit={this.handleSubmit.bind(this)}>
                        <input
                          id=""
                          type="text"
                          placeholder="Email"
                          name="email"
                          required="required"
                          className="subscribe-style"
                          value={this.state.subscriptionEmail.value}
                          onChange={this.handleSubscriptionEmail}
                        />
                        <button
                          type="submit"
                          data-value="subscribe"
                          data-wait="Please wait..."
                          className="w-button subscribe-button">
                          subscribe
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <hr style={hidden} />
                <div className="row" style={hidden}>
                  <div className="col-xs-12">
                    <div className="footer-social-block">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.instagram.com/theresaonthetown/">
                        <i className="fa fa-lg fa-instagram w-inline-block social-wrap" />
                      </a>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.youtube.com/channel/UCvZKd-eUuq8A66J-uLr4CZQ">
                        <i className="fa fa-lg fa-youtube w-inline-block social-wrap" />
                      </a>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.facebook.com/theresaonthetown/">
                        <i className="fa fa-lg fa-facebook w-inline-block social-wrap" />
                      </a>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.pinterest.com/theresaonthetwn/">
                        <i className="fa fa-lg fa-pinterest w-inline-block social-wrap" />
                      </a>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.amazon.com/shop/theresaonthetown"
                        target="_blank"
                        rel="noopener noreferrer">
                        <i
                          className="fa fa-amazon w-inline-block social-wrap"
                          aria-hidden="true"
                        />
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
    e.preventDefault()

    if (this.state.showModal) {
      this.setState({ showModal: false })
    } else {
      this.setState({ showModal: true })
    }
  }
  handleCloseClick(closeTheSearch) {
    document.getElementById('search-results').classList.remove('search-active')
    this.setState({ searchOpen: false })
  }

  searchClick(e) {
    e.preventDefault()
    if (this.state.searchOpen) {
      this.setState({ searchOpen: false })
    } else {
      this.setState({ searchOpen: true })
    }
  }

  render() {
    const data = this.props.data
    const nav_items = data.nav_items
    const popUpText = data.popUpCTA
    const mobile_search_trigger = (
      <li className="mobile_menu_item">
        <a
          className="search-trigger"
          href=""
          onClick={this.searchClick.bind(this)}>
          <i className="fa fa-search" />
        </a>
      </li>
    )
    const menu_items = []
    const mobile_menu_items = []
    const search_menu_item_style = {
      position: 'absolute',
      right: '0'
    }
    const search_trigger = (
      <li style={search_menu_item_style}>
        <a
          className="search-trigger"
          href=""
          onClick={this.searchClick.bind(this)}>
          <i className="fa fa-search" />
        </a>
      </li>
    )
    const SiteTitle = (
      <li className="site-title">
        <Link onClick={this.handleClick} to={'/'}>
          Theresa on the Town
        </Link>
      </li>
    )

    nav_items.forEach(nav_item => {
      let this_route = nav_item.split(' ')[0].toLowerCase()

      if (nav_item === 'Home') {
        menu_items[0] = (
          <li key={'key-' + nav_item}>
            <Link onClick={this.handleClick} to="/">
              {nav_item}
            </Link>
          </li>
        )
      } else if (nav_item === 'Fashion & Style') {
        menu_items[1] = (
          <li key={'key-' + nav_item}>
            <Link onClick={this.handleClick} to={'/' + this_route}>
              {nav_item}
            </Link>
          </li>
        )
        mobile_menu_items[1] = (
          <li className="mobile_menu_item" key={'key-' + nav_item}>
            <Link to={'/' + this_route}>{nav_item}</Link>
          </li>
        )
      } else if (nav_item === 'Travel') {
        menu_items[2] = (
          <li key={'key-' + nav_item}>
            <Link onClick={this.handleClick} to={'/' + this_route}>
              {nav_item}
            </Link>
          </li>
        )
        mobile_menu_items[2] = (
          <li className="mobile_menu_item" key={'key-' + nav_item}>
            <Link to={'/' + this_route}>{nav_item}</Link>
          </li>
        )
      } else if (nav_item === 'Health & Wellness') {
        menu_items[3] = (
          <li key={'key-' + nav_item}>
            <Link onClick={this.handleClick} to={'/' + this_route}>
              {nav_item}
            </Link>
          </li>
        )
        mobile_menu_items[3] = (
          <li className="mobile_menu_item" key={'key-' + nav_item}>
            <Link to={'/' + this_route}>{nav_item}</Link>
          </li>
        )
      } else if (nav_item === 'Contact') {
        menu_items[4] = (
          <li key={'key-' + nav_item}>
            <Link onClick={this.handleClick} to={'/' + this_route}>
              {nav_item}
            </Link>
          </li>
        )
        mobile_menu_items[4] = (
          <li className="mobile_menu_item" key={'key-' + nav_item}>
            <Link to={'/' + this_route}>{nav_item}</Link>
          </li>
        )
      } else if (nav_item === 'About') {
        menu_items[5] = (
          <li key={'key-' + nav_item}>
            <Link onClick={this.handleClick} to={'/' + this_route}>
              {nav_item}
            </Link>
          </li>
        )
        mobile_menu_items[5] = (
          <li className="mobile_menu_item" key={'key-' + nav_item}>
            <Link to={'/' + this_route}>{nav_item}</Link>
          </li>
        )
      }
    })

    menu_items.push(search_trigger)
    mobile_menu_items.push(mobile_search_trigger)

    let i = menu_items.length / 2
    menu_items.splice(i, 0, SiteTitle)

    let navClassForSearch
    if (this.state.searchOpen) {
      navClassForSearch = 'search-visible'
    } else {
      navClassForSearch = ''
    }
    return (
      <div id="Nav" className={navClassForSearch}>
        <Modal
          showModal={this.state.showModal}
          closeModal={this.modalTriggerClick.bind(this)}
          popUpText={popUpText}
        />

        <header id="header" className="header clearfix">
          <div className="header-wrap clearfix">
            <div className="container">
              <div className="logo-mobi">Theresa on the Town</div>

              <nav id="mainnav" className="mainnav">
                <ul className="menu">{menu_items}</ul>
              </nav>
            </div>
          </div>
        </header>

        <MobileMenu menuItems={mobile_menu_items} />
        <Search onCloseSearchClick={this.handleCloseClick.bind(this)} />

        <div className="flat-vertical social-links side_nav">
          <a
            target="_blank"
            rel="noopener noreferrer"
            data-pin-do="buttonFollow"
            data-pin-custom="true"
            href="https://www.pinterest.com/theresaonthetwn">
            <i className="fa fa-pinterest" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            data-href="https://www.theresaonthetown.com"
            data-layout="button_count"
            data-size="large"
            data-mobile-iframe="true"
            className="fb-xfbml-parse-ignore"
            target="_blank"
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.theresaonthetown.com%2F&amp;src=sdkpreparse">
            <i className="fa fa-facebook" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/channel/UCvZKd-eUuq8A66J-uLr4CZQ">
            <i className="fa fa-youtube" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/theresaonthetown/?ref=badge">
            <i className="fa fa-instagram" />
          </a>
          <a
            href="https://www.amazon.com/shop/theresaonthetown"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fa fa-amazon" />
          </a>
          <span>FOLLOW ME</span>
        </div>
        <div className="flat-vertical reservation side_nav">
          <a href="" onClick={this.modalTriggerClick.bind(this)}>
            <span>SIGN UP</span>
          </a>
        </div>
      </div>
    )
  }
}
