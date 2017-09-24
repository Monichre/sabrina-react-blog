import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AppStore from '../../../Stores/AppStore'

export default class MobileMenu extends Component {
    constructor(props){
        super(props)

        this.state = {
            mobileMenuOpen: false
        }
    }
    showMobileMenu(e){
        e.preventDefault()
        if (this.state.mobileMenuOpen) {
            document.getElementById('MobileMenu').classList.remove('mobile_menu_active')
            this.setState({mobileMenuOpen: false})
        } else {
            this.setState({mobileMenuOpen: true})
            document.getElementById('MobileMenu').classList.add('mobile_menu_active')
        }
    }
    handleMobileLinkClick() {
        
        this.setState({mobileMenuOpen: false})
        document.getElementById('MobileMenu').classList.remove('mobile_menu_active')

    }
    render(){
        const data = AppStore.data
        const nav_items = data.globals.nav_items
       
        if (!nav_items) {
            return <div></div>
        }
		
        const mobile_menu_items = nav_items.map((nav_item) => {
            if (nav_item.value === 'Theresa on the Town') {
                return (
                    <span></span>
                )
            } else {
                return (
                    <li key={'key-' + nav_item.value} className="mobile_menu_item">
                        <Link onClick={this.handleMobileLinkClick.bind(this)} to={'/' + nav_item.value}>{nav_item.title}</Link>
                    </li>
                )
            }
        })
        return (
            <div id="MobileMenuContainer">
                <div className="btn-menu" onClick={this.showMobileMenu.bind(this)}>
                                <span></span>
                </div>
                <div id="MobileMenu">
                    <header>
                        <h5>Theresa on the Town</h5>
                    </header>

                    <ul id="mobile_menu_items">
                        {mobile_menu_items}
                    </ul>
                    <ul id="mobile_social_menu">
                        <div className="footer-social-block">
                            <a href="https://www.instagram.com/theresaonthetown/"><i className="fa fa-lg fa-instagram w-inline-block social-wrap"></i></a>
                            <a href="https://www.youtube.com/channel/UCvZKd-eUuq8A66J-uLr4CZQ"><i className="fa fa-lg fa-youtube w-inline-block social-wrap"></i></a>
                            <a href="https://www.facebook.com/theresaonthetown/"><i className="fa fa-lg fa-facebook w-inline-block social-wrap"></i></a>
                            <a href="https://www.pinterest.com/theresaonthetwn/"><i className="fa fa-lg fa-pinterest w-inline-block social-wrap"></i></a>
                        </div>
                    </ul>

                </div>
            </div>
            
        )
    }

}