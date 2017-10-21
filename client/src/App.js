
import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import routes from './routes'

// Dispatcher
import AppDispatcher from './Dispatcher/AppDispatcher'

// Store
import AppStore from './Stores/AppStore'

import Nav from './Components/Partials/SiteComponents/Nav'
import Footer from './Components/Partials/SiteComponents/Footer'
import Blog from './Components/Pages/Blog'
import About from './Components/Pages/About'


import Travel from './Components/Pages/Travel'
import FashionAndStyle from './Components/Pages/FashionAndStyle'
import HealthAndWellness from './Components/Pages/HealthAndWellness'

import './App.css'


class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			removeLoader: false
		}

	}
	// Add change listeners to stores
	componentDidMount() {
		AppStore.addChangeListener(this._onChange.bind(this))

		setTimeout(function(){
			document.getElementById('loading').style.display = 'none'
		}, 3000)
		
	}

	// Remove change listeners from stores
	componentWillUnmount() {
		AppStore.removeChangeListener(this._onChange.bind(this))
	}

	getStore() {
		AppDispatcher.dispatch({
			action: 'get-app-store'
		})
	}
	componentWillMount() {
		
		this.getStore()
	}

	_onChange() {
		this.setState(AppStore)
	}

	render() {
		const data = AppStore.data
		if(!data.ready){
		      this.getStore()

		      return (
		        <div className="container text-center"></div>
		      )
			}
			return (
				<BrowserRouter>
					<div>
						<Nav data={data} />
						{routes}
						<Footer data={data} />
					</div>
				</BrowserRouter>

			)
	}
}

export default App;
