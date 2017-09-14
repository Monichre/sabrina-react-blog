import React, {Component} from 'react'
import _ from 'lodash'
import {Link} from 'react-router'

export default class Polaroid extends Component {
    render() {
        return (
            <div className="item">
                <figure className="polaroid">
                    <img className="" src={this.props.image} alt="" />
                        <figcaption className="caption"><h5>{this.props.caption}</h5></figcaption>
                    </figure>
                </div>
			)
		}
	}
