import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BlogPostPreviewLeft from './BlogPostPreviewLeft.js'
import BlogPostPreviewRight from './BlogPostPreviewRight.js'

export default class TravelPosts extends Component {

  scrollTop(){

  }

  render(){

    let data = this.props.data
	console.log(data)
    let articles = data.posts.travelposts

    let load_more
    let show_more_text = 'Show More Articles'

    let articles_html = articles.map(( article ) => {
      let date_obj = new Date(article.created)
      let created = (date_obj.getMonth()+1) + '/' + date_obj.getDate() + '/' + date_obj.getFullYear()
	  let readMore = <Link to={ '/blog/' + article.slug } onClick={ this.scrollTop }>Read More</Link>

	  if (articles.indexOf(article) % 2 === 0){
		  return (
			  <BlogPostPreviewRight
				  key={ 'key-' + article.slug }
				  date={created}
				  image={article.metadata ? article.metadata.photo.url : null}
				  readMore = {readMore}
				  title={article.title}
				  content={article.content}
				   />
	      )
	  } else {
		  	 return (
	   		  <BlogPostPreviewLeft
	   			  key = {'key-' + article.slug}
				  date = {created}
	   			  image = {article.metadata ? article.metadata.photo.url : null}
	   			  readMore = {readMore}
	   			  title = {article.title}
	   			  content = {article.content}
	   			   />
	         )
	  }
    })
    return (
      <div>
		  { articles_html }
      </div>
    )
  }
}
