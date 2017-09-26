import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import BlogPostPreviewLeft from './BlogPostPreviewLeft.js'
import BlogPostPreviewRight from './BlogPostPreviewRight.js'

export default class HealthPosts extends Component {

    
    render() {

        let data = this.props.data
        let articles = data.articles.health

        const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const hasPhoto = article => article.fields.photos

    
    let articles_html = articles.map((article) => {
        let date_obj = new Date(article.sys.createdAt)
        let created = months[(date_obj.getMonth() + 1)] + ' ' + date_obj.getDate() + ', ' + date_obj.getFullYear()
        let category = article.fields.category[0].fields.title.split(' ')[0].toLowerCase()
        let readMore = <Link to={'/' + category + '/' + article.fields.title} onClick={this.scrollTop}>Read More</Link>
        console.log(readMore)

         if (articles.indexOf(article) % 2 === 0) {
            return (
                <BlogPostPreviewRight
                    key={'key-' + article.sys.id}
                    date={created}
                    image={hasPhoto(article) ? article.fields.photos[0].fields.file.url : null}
                    readMore={readMore}
                    title={article.fields.title}
                    content={article.fields.content}
                />
            )
        } else {
            return (
                <BlogPostPreviewLeft
                    key={'key-' + article.sys.id}
                    date={created}
                    image={hasPhoto(article) ? article.fields.photos[0].fields.file.url : null}
                    readMore={readMore}
                    title={article.fields.title}
                    content={article.fields.content}
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
