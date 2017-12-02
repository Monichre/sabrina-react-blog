import React, {Component} from 'react'
import Polaroid from './Polaroid'

export default class PostsByCountry extends Component {


    render() {

        const hasPhoto = polaroid => polaroid.fields.photo
        let polaroids = this.props.data
        let polaroids_html = polaroids.map((polaroid) => {
			
            return (
				<Polaroid
					key={'key-' + polaroid.sys.id}
					image={(hasPhoto(polaroid) && polaroid.fields.photo.fields) ? polaroid.fields.photo.fields.file.url : null}
                    title={polaroid.fields.title}
					caption={polaroid.fields.description} />
			)
        })
		const styles = {
			textAlign: 'center'
		}

        return (
            <div style={styles}>
				{polaroids_html}
            </div>
        )
    }
}
