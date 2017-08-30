import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default class VideoPost extends Component {

	render() {
		const video_style = {
			marginTop: '50px'
		}
		const title_style = {
			textAlign: 'left'
		}
		return (
			<div id="VideoPost" className="flat-row flat-our">
               <div className="video-section-title" style={video_style}>
	             <div className="container">
	                 <div className="row">
	                     <div className="col-md-12">
	                         <div className="video-post-content-section">
	                             <h1 className="video-section-header" style={title_style}>Recent Video</h1>
								 <section>
								 	<h3>{this.props.title}</h3>
								 	<p className="content-story" dangerouslySetInnerHTML={{ __html: this.props.content, class:"content-story"}} />
								 </section>
	                         </div>
	                     </div>
	                 </div>
	             </div>
	         </div>
			 <br />


					<section className="promo-video space">
			            <div className="container">
			                <div className="row">
			                   

			                    <div className="col-md-6">
			                        <div className="imgbox style3">
			                            <div className="">
			                                <a href="#" className="popup-video">
			                                    <video className="" loop="" autoplay="" muted="">
			                                        <source src={this.props.video} type="video/mp4" />
			                                        <source src={this.props.video} type="video/webm" />
			                                    </video>
			                                </a>
			                            </div>

			                            <div className="align">
			                                <h3>filler</h3>
											<p>Filler text</p>
			                            </div>
			                        </div>
			                    </div>
			                </div>
			            </div>
			        </section>
			</div>
		)
	}

}
