// actions.js

import Cosmic from 'cosmicjs'
import * as Contentful from 'contentful'
import _ from 'lodash'

// AppStore
import AppStore from '../Stores/AppStore'
var config = require('../config').config

export function getStore(callback) {

    
    const cms_client = Contentful.createClient({
        space: config.auth.space,
        accessToken: config.auth.accessToken
    })

    cms_client.getEntries()
        .then((response) => {
            console.log(response)
            let response_items = response.items

            let pages = _.filter(response_items, (item) => item.sys.contentType.sys.id === 'page')
            let polaroids = _.filter(response_items, (item) => item.sys.contentType.sys.id === 'polaroid')
            let video_entries = _.filter(response_items, (item) => item.sys.contentType.sys.id === 'videoPost')
            let affiliate_entries = _.filter(response_items, (item) => item.sys.contentType.sys.id === 'affiliatePost')
            let articles =  _.filter(response_items, (item) => item.sys.contentType.sys.id === 'blogPost')
            articles = _.sortBy(articles, (article) => article.sys.createdAt)
            let nav_items = _.map(pages, (page) => page.fields.title)
                nav_items = nav_items.sort().reverse()

  
            
            
            articles.featured = _.sortBy(articles, (article) => article.sys.createdAt).slice(0, 3)
            articles.fashion = _.filter(articles, (article) => article.fields.category[0].fields.title === 'Fashion Posts')
            articles.travel = _.filter(articles, (article) => article.fields.category[0].fields.title === 'Travel Posts')
            articles.health = _.filter(articles, (article) => article.fields.category[0].fields.title === 'Health Posts')
       
            AppStore.data.polaroids = polaroids
            AppStore.data.articles = articles
            AppStore.data.nav_items = nav_items
            AppStore.data.video_entries = video_entries
            AppStore.data.affiliate_entries = affiliate_entries
            AppStore.data.pages = pages

            console.log(affiliate_entries)
            console.log(pages)
            
            
            
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
        

    // Get page info
    const data = AppStore.data
    const pages = data.pages
    const page = _.find(pages, (page) => page.fields.title === page_slug)
    console.log(pages)
    console.log(page_slug)
    console.log(page)


	let article
    const articles = data.articles
    if (data.video_entries){
        data.video_entries.forEach(entry => articles.push(entry))
    }
    if (data.affiliate_entries){
        data.affiliate_entries.forEach(entry => articles.push(entry))
    }
    
    console.log(articles)
    
    if (post_slug) {
		
        article = _.find(articles, (article) => article.fields.title === post_slug)
		AppStore.data.article = article
    }

	console.log(AppStore.data)
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
