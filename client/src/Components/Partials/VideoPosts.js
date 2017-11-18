import React, {Component} from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'

export default class VideoPosts extends Component {
    componentDidMount(){

        let all_videos = document.querySelectorAll('.popup-video video')
        let on = ['mouseenter', 'touchstart']
        let off = ['mouseleave', 'touchend']

        const addControls = (elem) => elem.setAttribute('controls', true)
        const removeControls = (elem) => elem.removeAttribute('controls')
        
        all_videos.forEach(video => {
            video.setAttribute('muted', true)
            video.addEventListener('mouseenter', (e) => {
                
                addControls(e.target)
            })
            video.addEventListener('touchstart', (e) => {
                addControls(e.target)
            })
            video.addEventListener('mouseleave', (e) => {
                
                removeControls(e.target)
            })
            video.addEventListener('touchend', (e) => {
                removeControls(e.target)
            })
        })
    }
    handleMute(e){
        let video_player = e.target
        video_player.setAttribute('muted', false)
    }
    render(){
        const style = {
            marginTop: '50px',
            paddingBottom: '25px'
        }
        const content_style = {
            marginTop: '10px'
        }
        const videos = this.props.videos.slice(0, 2)
        console.log(videos)
        
        return (
            <div id="VideoPosts" style={style}>
                <div className="page-title">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="title-section">
                                    <h1 className="title">{this.props.header}</h1>
                                    <h4>{this.props.subHeader}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <section className="promo-video space">
                    <div className="container">
                        <div className="row">
                        {videos.map(video =>
                                <div className="col-md-6">
                                    <div className="imgbox style3">
                                        <div className="">
                                            <a className="popup-video"><ReactPlayer onClick={this.handleMute.bind(this)} url={video.fields.videos ? video.fields.videos[0].fields.file.url : video.fields.link}  width='95%' playing={false} muted loop={false} controls={false}/></a>
                                        </div>
                                        <div className="align" style={content_style}>
                                            <div className="title-section style2 ">
                                                <h1 className="title"><Link to={'/videos/' +  video.fields.title}>{video.fields.title}</Link></h1>
                                                <div className="sub_title" dangerouslySetInnerHTML={{ __html: video.fields.subHeader }} />
                                            </div>
                                            <p><Link className="read-more" to={'/videos/' +  video.fields.title}>Read More</Link></p>
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