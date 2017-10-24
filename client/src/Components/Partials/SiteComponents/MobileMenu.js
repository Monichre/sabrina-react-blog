import React, {Component} from 'react'
import '../../css/Nav.css'


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
       
        return (
            <div id="MobileMenuContainer">
                <header>
                    <div className="btn-menu" onClick={this.showMobileMenu.bind(this)}><span></span></div>
                    <h1>Theresa on the Town</h1>
                </header>
                <div id="MobileMenu">
                    <ul id="mobile_menu_items">
                        {this.props.menuItems}
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