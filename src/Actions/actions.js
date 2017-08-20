// actions.js

import Cosmic from 'cosmicjs'
import _ from 'lodash'

// AppStore
import AppStore from '../Stores/AppStore'
var config = require('../config').config
console.log(config)

export function getStore(callback) {

    let pages = {}

    Cosmic.getObjects(config, function(err, response) {
		console.log(err)
		console.log(response)

        let objects = response.objects

        /* Globals
        ======================== */
        let globals = AppStore.data.globals
        globals.text = response.object['text']
        let metafields = globals.text.metafields
        let menu_title = _.find(metafields, {
            key: 'menu-title'
        })

        console.log(menu_title)
        globals.text.menu_title = menu_title.value

        let footer_text = _.find(metafields, {
            key: 'footer-text'
        })
        globals.text.footer_text = footer_text.value

        let site_title = _.find(metafields, {
            key: 'site-title'
        })
        globals.text.site_title = site_title.value

        // Social
        globals.social = response.object['social']
        metafields = globals.social.metafields
        let twitter = _.find(metafields, {
            key: 'twitter'
        })
        globals.social.twitter = twitter.value
        let facebook = _.find(metafields, {
            key: 'facebook'
        })
        globals.social.facebook = facebook.value
        let github = _.find(metafields, {
            key: 'github'
        })
        globals.social.github = github.value

        // Nav
        const nav_items = response.object['nav'].metafields
        console.log(nav_items);
        globals.nav_items = nav_items

        AppStore.data.globals = globals

        /* Pages
        ======================== */
        let pages = objects.type.page
        AppStore.data.pages = pages

        /* Articles
        ======================== */
        let articles = objects.type['post']
        articles = _.sortBy(articles, 'order')
        AppStore.data.articles = articles

        let POSTS = {}
        console.log(articles)

        articles.forEach(function(article) {
            if (article.metadata != null && article.metadata.category != null) {
				var new_key = article.metadata.category.slug
				// for (key in POSTS){
				// 	if (POSTS)
				// }
				if (POSTS.hasOwnProperty(new_key)) {

					POSTS[article.metadata.category.slug].push(article)
				}
				else {
					POSTS[article.metadata.category.slug] = []
					POSTS[article.metadata.category.slug].push(article)
				}
            } else {}
        });
		console.log(POSTS)
		console.log(Object.keys(POSTS))

        AppStore.data.posts = POSTS
        // Emit change
        AppStore.data.ready = true
        AppStore.emitChange()

        // Trigger callback (from server)
        if (callback) {
            callback(false, AppStore)
        }

    })
}

export function getPageData(page_slug, post_slug) {

    if (!page_slug || page_slug === 'blog')
        page_slug = 'home'

    // Get page info
    const data = AppStore.data
    const pages = data.pages
    const page = _.find(pages, {
        slug: page_slug
    })
	console.log(page)
    // const metafields = page.metafields
    // if (metafields) {
	//
	//
    // }
    if (page_slug === 'fashion-style') {
		console.log(data)
        const articles = data.posts.fashionposts
    }

    if (post_slug) {
        if (page_slug === 'home') {
            const articles = data.articles
            const article = _.find(articles, {
                slug: post_slug
            })
            page.title = article.title
        }
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
