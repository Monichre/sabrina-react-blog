import React, {Component} from 'react'
import ReactPlayer from 'react-player'

export default class VideoPosts extends Component {
    constructor(props){
        super(props)

    }
    render(){
        const style = {
            marginTop: '50px'
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
                                            <a href="#" className="popup-video">
                                                <ReactPlayer url={video.metadata.video.url}  width='95%' loop={true} controls={true}/>
                                            </a>
                                             
                                        </div>
                                        <div className="align" style={content_style}>
                                            <h3>{video.title}</h3>
                                            
                                            <div className="content-story" dangerouslySetInnerHTML={{ __html: video.content }} />
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