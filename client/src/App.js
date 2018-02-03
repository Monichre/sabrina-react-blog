
import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import routes from './routes'
import AppDispatcher from './Dispatcher/AppDispatcher'
import AppStore from './Stores/AppStore'
import Nav from './Components/Partials/SiteComponents/Nav'
import Footer from './Components/Partials/SiteComponents/Footer'
import './App.css'


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			removeLoader: false
		}

	}
	
	componentDidMount() {
		AppStore.addChangeListener(this._onChange.bind(this))
		setTimeout(function(){
			document.getElementById('loading').style.display = 'none'
		}, 3000)
		window.embedFunction = (w, d) => {
			var id='embedly-platform', n = 'script';
			if (!d.getElementById(id)){
				w.embedly = w.embedly || function() {(w.embedly.q = w.embedly.q || []).push(arguments);};
				var e = d.createElement(n); e.id = id; e.async=1;
				e.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://cdn.embedly.com/widgets/platform.js';
				var s = d.getElementsByTagName(n)[0];
				s.parentNode.insertBefore(e, s);
			}
		}
		window.embedFunction(window, document)
		
	}
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
		const {data} = AppStore

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
