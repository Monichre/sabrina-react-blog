import React, { Component } from 'react'
import './EmailStatus.css'


import { TweenMax, Power1, Power2, Power3, TimelineMax, DrawSVGPlugin, Elastic, Linear } from "gsap"


const Anticipate = window.Anticipate={p1:function(){return 1.70158},p2:function(){return 1.525*Anticipate.p1()},easeOut:function(a){return 1>(a*=2)?.5*a*a*((Anticipate.p2()+1)*a-Anticipate.p2()):.5*(2-Math.pow(2,-10*(a-1)))},easeIn:function(a){return 1>(a*=2)?.5*(Math.pow(2,10*(a-1))-.001):.5*((a-=2)*a*((Anticipate.p2()+1)*a+Anticipate.p2())+2)},easeInOut:function(a){return 1>(a*=2)?.5*a*a*((Anticipate.p2()+1)*a-Anticipate.p2()):.5*((a-=2)*a*((Anticipate.p2()+1)*a+Anticipate.p2())+2)}};


export default class EmailStatus extends Component {
    constructor(props) {
        super(props)

        this.state = {
            success: false
        }
        // this.closeEmailClick = 
    }
    componentDidMount() {
        var xmlns = "http://www.w3.org/2000/svg",
            select = function (s) {
                return document.querySelector(s);
            },
            selectAll = function (s) {
                return document.querySelectorAll(s);
            },
            container = select('.container'),
            dottedPath = select('#dottedPath');


        //center the container cos it's pretty an' that
        TweenMax.set(container, {
            position: 'absolute'
            // top: '50%',
            // left: '50%',
            // xPercent: -50,
            // yPercent: -50
        })
        TweenMax.set('svg', {
            visibility: 'visible'
        })

        TweenMax.set(['.smallHand', '#bigHand'], {
            drawSVG: '100% 100%'
        })

        TweenMax.set(['.speedCurl', '#emailLinesGroup line'], {
            drawSVG: '0%'
        })

        var tl = new TimelineMax({
            repeat: -1
        });
        tl
            .from('.messageOutline', 1, {
                y: -400,
                transformOrigin: '50% 50%',
                ease: Elastic.easeOut.config(0.5, 0.8)
            })
            .from('#messageFlap', 1.1, {
                y: -500,
                ease: Elastic.easeOut.config(0.5, 0.93)
            }, '-=1')
            .to('#emailLinesGroup line', 0.15, {
                drawSVG: '0% 50%',
                y: '+=30',
                ease: Linear.easeNone
            }, '-=0.9')
            .to('#emailLinesGroup line', 0.15, {
                drawSVG: '100% 100%',
                ease: Linear.easeNone
            }, '-=0.75')
            .from('.smallHand', 1.2, {
                y: 30,
                ease: Anticipate.easeIn

            })


            .from('.smallHand', 0.6, {
                alpha: 0
            }, '-=1.2')
            .to('.smallHand', 1.6, {

                drawSVG: '0% 120%',
                ease: Power1.easeInOut
            }, '-=1.6')
            .to('.smallHand', 1, {
                // morphSVG: {
                //     shape: '#bigHand'
                // },
                ease: Anticipate.easeInOut
            }, '-=0.6')
            .to('#emailGroup', 0.2, {
                scale: 0.9,
                repeat: 1,
                yoyo: true,
                ease: Power1.easeInOut,
                transformOrigin: '50% 50%'
            }, '-=0.3')
            .staggerTo('.ring', 2, {
                cycle: {
                    attr: [{
                        r: 160
                    }, {
                        r: 140
                    }, {
                        r: 120
                    }]
                }
            }, 0.125, '-=0.1')
            .staggerTo(['#hideRing', '#showRing'], 2, {
                cycle: {
                    attr: [{
                        r: 160
                    }, {
                        r: 140
                    }]
                }
            }, 0.5, '-=2.29')
            .staggerTo('.ring', 1, {
                alpha: 0
            }, 0.125, '-=1.9')
            .to('#messageFlap', 1, {
                // morphSVG: {
                //     shape: '#planeBot'
                // },
                ease: Anticipate.easeInOut
            }, '-=1')
            .to('#messageOutline', 1, {
                // morphSVG: {
                //     shape: '#planeBody'
                // },
                ease: Power3.easeInOut
            }, '-=1')
            .to('#emailGroup', 2, {
                x: 340,
                y: -190,
                scale: 0,
                transformOrigin: '100% 50%',
                ease: Anticipate.easeOut
            }, '-=0')

            .staggerTo('.speedCurl', 0.3, {
                drawSVG: '0% 60%',
                ease: Linear.easeNone
            }, 0.1, '-=1')
            .staggerTo('.speedCurl', 0.3, {
                drawSVG: '100% 100%',
                ease: Linear.easeNone
            }, 0.1, '-=0.7')
            .staggerTo('.speedCurl', 0.6, {
                x: 170,
                y: -60
            }, 0, '-=1.1')

            .to('.smallHand', 1.2, {
                y: 130,
                drawSVG: '53.5% 53.5%',
                ease: Power1.easeIn
            }, '-=3.4')

        tl.timeScale(1.2)


    }
    closeEmailClick(){
        // this.props.closeEmail = this.props.closeEmail.bind(this)
    }
    render() {
        const header_style = {
            marginTop: '50px',
            color: '#fff',
            textAlign: 'center'
        }
        const icon_style = {
            cursor: 'pointer'
        }
        return (
            <div id="EmailStatus">
                <div className="email_container">
                    <h1 id="email-header" style={header_style}>Thank You! Email Sent Successfully! <span href="#" id="close-search" className="close-btn" onClick={this.props.closeEmail.bind(this)}><i className="fa fa-times" aria-hidden="true" style={icon_style}></i></span></h1>
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <mask id="ringMask">
                                <rect width="1200" height="600" fill="#FFF" />
                                <path className="smallHand" stroke="none" fill="#000" stroke-width="8" stroke-linejoin="round" stroke-miterlimit="10" d="
                                    M339,458c0,0-24,0-28.5,0c-8.6,0-14.4-4.8-20.1-13c-9.2-13.1-32-49.7-32-49.7s-11.8-16.2,0-23.8c9.2-5.9,14.8-3.6,20,5
                        c3.5,5.8,8.5,12.3,8.5,12.3s0-50.2,0-54.8c0-4.5-0.9-15.9,17.5-15.9c14.6,0,14.5,13.4,14.5,15.1s0,1.4,0,6.5c3-3.6,21.8-5.8,24,5.8
                        c3.7-5,20-4.3,20.7,10.1c6.7-5,13.3,0,13.3,6.5c0,6.5,0,39.3,0,44c0,4.7,0.5,16.8-5.2,32.3C367.9,446.9,359.3,458,339,458"/>
                        </mask>
                            <mask id="messageMask">

                                <path className="messageOutline" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="			M364.9,307.6H240.5v-77.7h124.4V307.6z" />
                            </mask>
                            <mask id="circleMask">
                                <rect width="600" height="600" fill="#FFFFFF" />
                                <circle id="hideRing" fill="#000" stroke="#000" stroke-width="8" stroke-linejoin="round" stroke-miterlimit="10" cx="303" cy="300" r="0" />
                                <circle id="showRing" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round" stroke-miterlimit="10" cx="303" cy="300" r="0" />
                            </mask>
                        </defs>
                        <g id="emailLinesGroup" stroke-linecap="round" stroke-linejoin="round" stroke-width="6"  >
                            <line x1="260" x2="260" y1="10" y2="150" />
                            <line x1="310" x2="310" y1="90" y2="180" />
                            <line x1="360" x2="360" y1="70" y2="120" />
                        </g>
                        <g id="messageGroup" mask="url(#ringMask)">
                            <g id="emailGroup" mask="url(#circleMask)">
                                <path className="messageOutline" id="messageOutline" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="			M364.9,307.6H240.5v-77.7h124.4V307.6z" />
                                <g id="maskedMessageFlap" mask="url(#messageMask)">
                                    <path id="messageFlap" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="			M242.1,234.1l61.4,61.4l59.8-61.4" />
                                </g>
                            </g>
                            <g id="planeGroup">
                                <path id="planeBot" fill="none" d="M269,252.4v42.7l33.4-25.6" />
                                <path id="planeBody" fill="none" d="M329.6,287.4L287.2,257l-57.1-15.5L354.8,212L329.6,287.4z M354.8,212l-67.6,44.7" />
                            </g>
                        </g>
                        <g id="handGroup">
                            <path id="bigHand" fill="none" stroke="none" stroke-width="8" stroke-linejoin="round" stroke-miterlimit="10" d="M339,458
                                c0,0-24,0-28.5,0c-8.6,0-14.4-4.8-20.1-13c-9.2-13.1-32-52.6-32-52.6s-11.8-16.2,0-23.8c9.2-5.9,14.8-3.6,20,5
                        c3.5,5.8,8.5,15.1,8.5,15.1s0-79.1,0-83.6c0-4.5-0.9-15.9,17.5-15.9c14.6,0,14.5,13.4,14.5,15.1c0,1.7,0,30.3,0,35.3
                        c3-3.6,21.8-5.8,24,5.8c3.7-5,20-4.3,20.7,10.1c6.7-5,13.3,0,13.3,6.5c0,6.5,0,39.3,0,44c0,4.7,0.5,16.8-5.2,32.3
                        C367.9,446.9,359.3,458,339,458"/>
                        <path className="smallHand" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round" stroke-miterlimit="10" d="
                                M339,458c0,0-24,0-28.5,0c-8.6,0-14.4-4.8-20.1-13c-9.2-13.1-32-49.7-32-49.7s-11.8-16.2,0-23.8c9.2-5.9,14.8-3.6,20,5
                        c3.5,5.8,8.5,12.3,8.5,12.3s0-50.2,0-54.8c0-4.5-0.9-15.9,17.5-15.9c14.6,0,14.5,13.4,14.5,15.1s0,1.4,0,6.5c3-3.6,21.8-5.8,24,5.8
                        c3.7-5,20-4.3,20.7,10.1c6.7-5,13.3,0,13.3,6.5c0,6.5,0,39.3,0,44c0,4.7,0.5,16.8-5.2,32.3C367.9,446.9,359.3,458,339,458"/>
                        </g>

                        <g mask="url(#ringMask)">
                            <g id="ringGroup" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round" stroke-miterlimit="10">

                                <circle className="ring" cx="303" cy="300" r="0" />

                                <circle className="ring" cx="303" cy="300" r="0" />

                                <circle className="ring" cx="303" cy="300" r="0" />
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        )
    }

}