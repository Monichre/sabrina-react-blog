// Footer.js
import React, { Component } from 'react'
import IFrame from 'react-iframe'


// <p>Join the mailing list and be the first to know about product picks, style inspiration, and money saving tips. </p>

export default class Footer extends Component {

  render(){

	const data = this.props.data
	const footerText = data.footerCTA
	console.log(footerText)

	const style = {
		width: '100%',
		border: 0,
		overflow: 'hidden'
	}

    return (
      <footer>
		  <br />
		  <br />
        <div>
				
					
					<div className="iframe-widget">
						<IFrame
							style={style}
							className="lightwidget-widget"
							url="http://lightwidget.com/widgets/52a12044a9aa5f2f84d7cd0c15214cb1.html"/>
						<script src="http://lightwidget.com/widgets/lightwidget.js"></script>
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

	                          <div className="footer-form">
								   <div className="col-md-6">
									<div className="section-headline">
										<h3>{footerText.fields.header}</h3>
									</div>
									  <p>{footerText.fields.subHeader}</p>
								   </div>
	 							  <div className="col-md-6">
									  <form id="" name="subscribe-form" method="post">
		                                      <input id="" type="text" placeholder="Email" name="email" required="required" className="subscribe-style" />
		                                      <button id="footerButton" type="button" data-value="subscribe" data-wait="Please wait..." className="w-button subscribe-button">subscribe</button>
		                              </form>
	 							  </div>
	                          </div>

		                  </div>
		                  <hr />
		                  <div className="row">
		                      <div className="col-xs-12">
		                          <div className="footer-social-block">
									  <a href="#"><i className="fa fa-lg fa-instagram w-inline-block social-wrap"></i></a>
									  <a href="#"><i className="fa fa-lg fa-youtube w-inline-block social-wrap"></i></a>
		                              <a href="#"><i className="fa fa-lg fa-facebook w-inline-block social-wrap"></i></a>
		                              <a href="#"><i className="fa fa-lg fa-pinterest w-inline-block social-wrap"></i></a>
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
