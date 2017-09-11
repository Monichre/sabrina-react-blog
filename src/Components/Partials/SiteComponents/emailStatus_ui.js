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
    position: 'absolute',
    top: '50%',
    left: '50%',
    xPercent: -50,
    yPercent: -50
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

//ScrubGSAPTimeline(tl)