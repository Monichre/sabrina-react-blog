// Footer.js
import React, { Component } from 'react'

export default class Footer extends Component {

  render(){

    const data = this.props.data
    let footer_text
    if(data.globals.text){
      footer_text = data.globals.text.footer_text
    }

    let twitter
    let facebook
    let github
    if(data.globals.social){
      twitter = data.globals.social.twitter
      facebook = data.globals.social.facebook
      github = data.globals.social.github
    }
	const style = {
		width: '100%',
		border: 0,
		overflow: 'hidden'
	}

    return (
      <footer>
        <div>
				<div className="container-fluid">
		              <div className="widget-row row">
		                  <div className="col-xs-12">
		                      <header className="instagram-header">

		                          <h4>Instagram</h4>
		                          <hr />
		                      </header>
		                      <div className="widget">
		                          <script src="http://lightwidget.com/widgets/lightwidget.js"></script>
		                          <iframe src="http://lightwidget.com/widgets/52a12044a9aa5f2f84d7cd0c15214cb1.html" scrolling="no" allowTransparency="true" className="lightwidget-widget" style={style}></iframe>
		                      </div>
		                  </div>
		              </div>
		          </div>
		          <footer className="footer">
		              <div className="footer-widgets">
		                  <div className="container">
		                      <div className="row">

		                      </div>
		                  </div>
		              </div>
		          </footer>
		          <footer id="main-footer">
		              <div className="container-fluid footer-bottom">
		                  <div className="row">


		                      <div className="col-md-4 col-md-offset-4">
		                          <div className="footer-form">
		                              <div className="section-headline">
		                                  <h3>Are You A Tall <span className="red">Fashionista</span> Or <span className="red">Fashion Fanatic?</span></h3>
		                              </div>
		                              <p>Join the mailing list and be the first to know about product picks, style inspiration, and money saving tips. </p>

		                              <form id="" name="subscribe-form" method="post">

		                                      <input id="" type="text" placeholder="Email" name="email" required="required" className="subscribe-style" />


		                                      <button type="button" data-value="subscribe" data-wait="Please wait..." className="w-button subscribe-button">subscribe</button>

		                              </form>
		                          </div>
		                      </div>

		                  </div>
		                  <hr />
		                  <div className="row">
		                      <div className="col-xs-12">
		                          <div className="footer-social-block">

		                              <a href="#"><i className="fa fa-lg fa-facebook-square w-inline-block social-wrap"></i></a>
		                              <a href="#"><i className="fa fa-lg fa-youtube-square w-inline-block social-wrap"></i></a>
		                              <a href="#"><i className="fa fa-lg fa-instagram w-inline-block social-wrap"></i></a>
		                              <a href="#"><i className="fa fa-lg fa-pinterest-square w-inline-block social-wrap"></i></a>
		                          </div>
		                      </div>
		                      <div className="col-sm-3">
		                          <div className="footer-text">
		                              <span className="footer-text-span">Theresa on the Town</span>
		                          </div>
		                      </div>
		                      <div className="col-sm-6">

		                      </div>
		                      <div className="col-sm-3">
		                          <div id="loveCraft">
		                              <span className="loveCraft"><span className="blue">Love</span><span className="red">Craft</span><span className="white">.io</span></span>
		                          </div>
		                      </div>

		                  </div>
		              </div>
		          </footer>
		</div>
      </footer>
    )
  }
}
