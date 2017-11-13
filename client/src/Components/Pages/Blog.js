import React, {Component} from 'react'
import {Helmet} from 'react-helmet'
import {Link} from 'react-router-dom'
import BlogList from '../Partials/BlogList'
import AffiliatePost from '../Partials/AffiliatePost'
import OwlCarousel from 'react-owl-carousel2'
import VideoPosts from '../Partials/VideoPosts'
import AppDispatcher from '../../Dispatcher/AppDispatcher'
import CONSTANTS from '../../constants'

export default class Blog extends Component {

    componentWillMount() {
        this.getPageData()
    }

    componentDidMount() {}

    getPageData() {
        AppDispatcher.dispatch({action: 'get-page-data', page_slug: 'Home'})
    }

    getMoreArticles() {
        AppDispatcher.dispatch({action: 'get-more-items'})
    }

    render() {

        const data = this.props.data
        const featured_posts = data.featured
		const videoSectionHeader = data.page.fields.pageSectionHeaders[0].fields.headerTitle
        const subHeader = data.page.fields.pageSectionHeaders[0].fields.subHeader
        const options = {
            items: 1,
            nav: true,
			navText : ["<i class='fa fa-lg fa-chevron-left'></i>","<i class='fa fa-lg fa-chevron-right'></i>"],
			dots: false,
            margin: 10,
            lazyLoad: true,
            autoplay: true
        }

        const events = {
            onDragged: function(event) {
                
            },
            onChanged: function(event) {
                
            }
        }

        let main_content
		main_content = <BlogList getMoreArticles={this.getMoreArticles} data={data} />
        const video_posts = <VideoPosts videos={data.video_entries} header={videoSectionHeader} subHeader={subHeader}/>
        let affiliate_entries_html
        if(data.affiliate_entries) {
            data.affiliate_entries
            affiliate_entries_html = data.affiliate_entries.map((entry) => {
                return (
                    <AffiliatePost article={entry}/>
                )
            })
        }


        return (
                <div>
                     <Helmet>
                            <title>Theresa on the Town | {data.page.fields.title}</title>
                            <meta name="description" content={data.page.fields.metaDescription}/>
                            <meta name="keywords" content={data.page.fields.metaTags}/>
                        </Helmet>
					<OwlCarousel id="featured_posts" ref="owl" options={options} events={events}>
						{featured_posts.map(post =>
								<div className="featured_post">
                                    <img className="featured_post_img" src={CONSTANTS.hasFeaturedPhoto(post) ? post.fields.featuredPhoto.fields.file.url : null} rel="preload" as="image" alt="featured post photo" />
									
									<div className="featured_post_content">
										<section>
											<div className="title">
                                            <Link to={'/' + post.fields.category[0].fields.title.split(' ')[0].toLowerCase() + '/' + post.fields.title}>{post.fields.title}</Link>
                                            </div>
											<div className="caption">{post.fields.category[0].fields.title.split(' ')[0]}</div>
										</section>
									</div>
								</div>
						)}
					</OwlCarousel>

                {main_content}
                {video_posts}
                {affiliate_entries_html}
            </div>
		)
	}
}
