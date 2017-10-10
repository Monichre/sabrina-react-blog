import React, {Component} from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'

export default class VideoPosts extends Component {
    constructor(props){
        super(props)
        

    }
    handleMute(e){
        let video_player = e.target
        video_player.mute = false
    }
    render(){
        const style = {
            marginTop: '50px',
            paddingBottom: '25px'
        }
        const content_style = {
            marginTop: '10px'
        }
        
        return (
            <div id="VideoPosts" style={style}>
                <div className="page-title">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="title-section">
                                    <h1 className="title">Latest in Video</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="promo-video space">
                    <div className="container">
                        <div className="row">
                        {this.props.videos.map(video =>
                                <div className="col-md-6">
                                    <div className="imgbox style3">
                                        <div className="">
                                            <a className="popup-video">
                                                <ReactPlayer onClick={this.handleMute.bind(this)} url={video.fields.videos[0].fields.file.url}  width='95%' playing={true} mute={true} loop={true} controls={false}/>
                                            </a>
                                             
                                        </div>
                                        <div className="align" style={content_style}>
                                            <h3>{video.fields.title}</h3>
                                            <div className="" dangerouslySetInnerHTML={{ __html: video.fields.subHeader }} />
                                            <p>
                                                <Link to={'/videos/' +  video.fields.title}>Read More</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
            
        )
    }
}