import React, {Component} from 'react'
import {Link} from 'react-router'

export default class Polaroid extends Component {
    render() {
        return (
            <div className="item">
                <h5 className="polaroid-title">{this.props.title}</h5>
                <figure className="polaroid">
                    <img className="" src={this.props.image} alt="" />
                        <figcaption className="caption">
                            <p>{this.props.caption}</p>
                        </figcaption>
                    </figure>
                </div>
			)
		}
	}
