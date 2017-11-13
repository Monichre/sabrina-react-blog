import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BlogPostPreviewLeft from './BlogPostPreviewLeft.js'
import BlogPostPreviewRight from './BlogPostPreviewRight.js'
import CONSTANTS from '../../constants'

export default class HealthPosts extends Component {


    render() {

        let articles = this.props.data

        let articles_html = articles.map((article) => {
            let date_obj = new Date(article.sys.createdAt)
            let created = CONSTANTS.months[(date_obj.getMonth())] + ' ' + date_obj.getDate() + ', ' + date_obj.getFullYear()
            let category = article.fields.category[0].fields.title.split(' ')[0].toLowerCase()
            let readMore = <Link to={'/' + category + '/' + article.fields.title} onClick={this.scrollTop}>Read More</Link>
            const subTitle = article.fields.subHeader === '' ? null : article.fields.subHeader


            if (articles.indexOf(article) % 2 === 0) {
                return (
                    <BlogPostPreviewRight
                        key={'key-' + article.sys.id}
                        date={created}
                        image={CONSTANTS.hasPhoto(article) ? article.fields.mainPhotos[0].fields.file.url : null}
                        readMore={readMore}
                        title={article.fields.title}
                        content={article.fields.content}
                        subTitle={subTitle}
                    />
                )
            } else {
                return (
                    <BlogPostPreviewLeft
                        key={'key-' + article.sys.id}
                        date={created}
                        image={CONSTANTS.hasPhoto(article) ? article.fields.mainPhotos[0].fields.file.url : null}
                        readMore={readMore}
                        title={article.fields.title}
                        content={article.fields.content}
                        subTitle={subTitle}
                    />
                )
            }
        })

        return (
            <div className="category-blog-post-previews">
                {articles_html}
            </div>
        )
    }
}
