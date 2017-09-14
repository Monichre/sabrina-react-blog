import React, {Component} from 'react'
import {Link} from 'react-router'

import Polaroid from './Polaroid'

export default class PostsByCountry extends Component {

    scrollTop() {

    }

    render() {

        let data = this.props.data
		console.log(data)
        let articles = data.posts.postsbycountry
		console.log(articles);

        let articles_html = articles.map((article) => {
			console.log(article)
            return (
				<Polaroid
					key={'key-' + article.slug}
					image={article.metadata ? article.metadata.photo.url : null}
					caption={article.title} />
			)
        })
		const styles = {
			textAlign: 'center'
		}

        return (
            <div style={styles}>
				{articles_html}
            </div>
        )
    }
}
