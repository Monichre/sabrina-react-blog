import React, {Component} from 'react'

export default class Modal extends Component {

    render() {
		const button_style = {
			borderRadius: '5px'
		}
        return (
            <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <footer id="main-footer">
                            <div className="container-fluid footer-bottom">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="footer-form">
                                            <div className="section-headline">
                                                <h3>Are You A Tall
                                                    <span className="red">Fashionista</span>
                                                    Or
                                                    <span className="red">Fashion Fanatic?</span>
                                                </h3>
                                            </div>
                                            <p>Join the mailing list and be the first to know about product picks, style inspiration, and money saving tips.
                                            </p>

                                            <form id="" name="subscribe-form" method="post">
                                                <input id="" type="text" placeholder="Email" name="email" required="required" className="subscribe-style" />
                                                    <button type="button" data-value="subscribe" data-wait="Please wait..." className="w-button subscribe-button" style={button_style}>subscribe</button>
                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                    <hr />
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <div className="footer-social-block">
                                                    <a href="#">
                                                        <i className="fa fa-lg fa-facebook-square w-inline-block social-wrap"></i>Facebok</a>
                                                    <a href="#">
                                                        <i className="fa fa-lg fa-youtube-square w-inline-block social-wrap"></i>Twitter</a>
                                                    <a href="#">
                                                        <i className="fa fa-lg fa-instagram w-inline-block social-wrap"></i>Instagram</a>
                                                    <a href="#">
                                                        <i className="fa fa-lg fa-pinterest-square w-inline-block social-wrap"></i>Pinterest</a>
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
