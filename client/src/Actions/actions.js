import * as Contentful from 'contentful'
import _ from 'lodash'
import AppStore from '../Stores/AppStore'
const moment = require('moment')

var config = require('../config').config

export function getStore(callback) {

    
    const cms_client = Contentful.createClient({
        space: config.auth.space,
        accessToken: config.auth.accessToken
    })

    cms_client.getEntries()
        .then((response) => {

            let response_items = response.items

            let pages = _.filter(response_items, (item) => item.sys.contentType.sys.id === 'page')
            let section_headers = _.filter(response_items, (item) => item.sys.contentType.sys.id === 'sectionHeader')
            let polaroids = _.filter(response_items, (item) => item.sys.contentType.sys.id === 'polaroid')
            let video_entries = _.filter(response_items, (item) => item.sys.contentType.sys.id === 'videoPost')
            let affiliate_entries = _.filter(response_items, (item) => item.sys.contentType.sys.id === 'affiliatePost')
            let initial_articles =  _.filter(response_items, (item) => item.sys.contentType.sys.id === 'blogPost')
            let CTAs = _.filter(response_items, (item) => item.sys.contentType.sys.id === 'cta')
            let footerCTA = _.find(CTAs, (item) => item.fields.section === 'Footer')
            let popUpCTA = _.find(CTAs, (item) => item.fields.section === 'Pop Up')
            let articles =  initial_articles.sort((a, b) => {return moment.utc(a.sys.createdAt).diff(moment.utc(b.sys.createdAt))}).reverse()
            let sorted_videos = video_entries.sort((a, b) => {return moment.utc(a.sys.createdAt).diff(moment.utc(b.sys.createdAt))}).reverse()
            let nav_items = _.map(pages, (page) => page.fields.title)
            nav_items = nav_items.sort().reverse()
            console.log(articles)


            AppStore.data.featured = _.filter(articles, (article) => article.fields.featured === true)
            AppStore.data.fashion = _.filter(articles, (article) => article.fields.category[0].fields.title === 'Fashion Posts')
            AppStore.data.travel = _.filter(articles, (article) => article.fields.category[0].fields.title === 'Travel Posts')
            AppStore.data.health = _.filter(articles, (article) => article.fields.category[0].fields.title === 'Health Posts')
            AppStore.data.footerCTA = footerCTA
            AppStore.data.popUpCTA = popUpCTA
            AppStore.data.polaroids = polaroids
            AppStore.data.section_headers = section_headers
            AppStore.data.articles = articles
            AppStore.data.nav_items = nav_items
            AppStore.data.video_entries = sorted_videos
            AppStore.data.affiliate_entries = affiliate_entries
            AppStore.data.pages = pages    
            AppStore.data.ready = true
            AppStore.emitChange()
            
            if (callback) {
                callback(false, AppStore)
            }
        })

}

export function getPageData(page_slug, post_slug) {

    if (!page_slug || page_slug === 'blog'){
        page_slug = 'Home'
    }
        
    const data = AppStore.data
    const pages = data.pages
    const page = _.find(pages, (page) => page.fields.title === page_slug)
 
	let article
    const articles = data.articles
    if (data.video_entries){
        data.video_entries.forEach(entry => articles.push(entry))
    }
    if (data.affiliate_entries){
        data.affiliate_entries.forEach(entry => articles.push(entry))
    }
    if (post_slug) {
		
        article = _.find(articles, (article) => article.fields.title === post_slug)
		AppStore.data.article = article
    }

    AppStore.data.page = page
    AppStore.emitChange()
}

export function getMoreItems() {

    AppStore.data.loading = true
    AppStore.emitChange()

    setTimeout(function() {
        let item_num = AppStore.data.item_num
        let more_item_num = item_num + 5
        AppStore.data.item_num = more_item_num
        AppStore.data.loading = false
        AppStore.emitChange()
    }, 300)
}
