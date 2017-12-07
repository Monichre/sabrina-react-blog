
import React, { Component } from 'react'
import { Switch, Link, Route, Redirect } from 'react-router-dom'
import ReactPlayer from 'react-player'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'
import Masonry from 'react-masonry-component'

import AppDispatcher from '../../Dispatcher/AppDispatcher'
import AppStore from '../../Stores/AppStore'

const CommonMark = require('commonmark')
const ReactRenderer = require('commonmark-react-renderer')
const parser = new CommonMark.Parser

export default class Video extends Component {
    componentDidMount() {

        let all_videos = document.querySelectorAll('.single_post_video video')
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
    handleMute(e) {
        let video_player = e.target
        video_player.setAttribute('muted', false)
    }

    render() {
        return (
            <article className="post">
                <div className="header-post">
                    <h2 className="title-post">
                        {this.props.video.fields.title}
                    </h2>
                    <p className="date-event date-style-2"><span>{this.props.video.fields.subHeader}</span></p>
                </div>

                <div className="blog-post-single-image-container">
                    <ReactPlayer className="single_post_video" onClick={this.handleMute.bind(this)} url={this.props.video.fields.videos ? this.props.video.fields.videos[0].fields.file.url : this.props.video.fields.link} width='100%' playing={false} muted loop={false} controls={false} />
                </div>

                <div className="content-post">
                    <p dangerouslySetInnerHTML={{ __html: this.props.video.fields.content }}></p>
                </div>
                <div className="direction clearfix">
                    <div className="social-links">
                    <div className="share-tag social-share-link">Share this post:</div>
                        <div className="social-share-link" data-href="https://www.theresaonthetown.com" data-layout="button_count" data-size="large" data-mobile-iframe="true">
                            <a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.theresaonthetown.com%2F&amp;src=sdkpreparse">
                                <i className="fa fa-facebook"></i>
                            </a>
                        </div>
                        <div className="social-share-link">
                            <a data-pin-do="buttonBookmark" href="https://www.pinterest.com/theresaonthetwn"><i className="fa fa-pinterest"></i></a>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}
