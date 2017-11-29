import React, {Component} from 'react'
import '../../css/Nav.css'


export default class MobileMenu extends Component {
    constructor(props){
        super(props)

        this.state = {
            mobileMenuOpen: false,
            menu:[]
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
        
        
        

    }
    componentDidMount() {
        let menu = document.querySelectorAll('.mobile_menu_item')
        let _self = this
        menu.forEach(menuItem => {
            menuItem.addEventListener('click', () => {
                _self.setState({mobileMenuOpen: false})
                document.getElementById('MobileMenu').classList.remove('mobile_menu_active')
            })
        })
    }
    componentWillMount(){
        let menu = this.props.menuItems
        
        let social_menu = (<li>
            <ul id="mobile_social_menu">
                <div className="footer-social-block">
                    <a href="https://www.instagram.com/theresaonthetown/" target="_blank" rel="noopener"><i className="fa fa-lg fa-instagram w-inline-block social-wrap"></i></a>
                    <a href="https://www.youtube.com/channel/UCvZKd-eUuq8A66J-uLr4CZQ" target="_blank" rel="noopener"><i className="fa fa-lg fa-youtube w-inline-block social-wrap"></i></a>
                    <a href="https://www.facebook.com/theresaonthetown/" target="_blank" rel="noopener"><i className="fa fa-lg fa-facebook w-inline-block social-wrap"></i></a>
                    <a href="https://www.pinterest.com/theresaonthetwn/" target="_blank" rel="noopener"><i className="fa fa-lg fa-pinterest w-inline-block social-wrap"></i></a>
                    <a href="https://www.amazon.com/shop/theresaonthetown" target="_blank" rel="noopener"><i className="fa fa-amazon w-inline-block social-wrap" aria-hidden="true"></i></a>
                </div>
            </ul>
        </li>)
        
        menu.push(social_menu)
        this.setState({menu: menu})
    }
    render(){
       const mobile_nav_h1 = {
           color: 'white',
           textAlign: 'center'
       }
        return (
            <div id="MobileMenuContainer">
                <header>
                    <div className="btn-menu" onClick={this.showMobileMenu.bind(this)}><span></span></div>
                    <h1>Theresa on the Town</h1>
                </header>
                <div id="MobileMenu">
                    <ul id="mobile_menu_items">
                        <li><h1 style={mobile_nav_h1}>Theresa on the Town</h1></li>
                        {this.state.menu}
                    </ul>
                </div>
            </div>
            
        )
    }

}