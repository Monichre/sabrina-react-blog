import React, {Component} from 'react'
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import routes from './routes'

// Dispatcher
import AppDispatcher from './Dispatcher/AppDispatcher'

// Store
import AppStore from './Stores/AppStore'


import Nav from './Components/Partials/SiteComponents/Nav'
import Loading from './Components/Partials/SiteComponents/Loading'
import Footer from './Components/Partials/SiteComponents/Footer'
import Blog from './Components/Pages/Blog'
import Default from './Components/Pages/Default'
import About from './Components/Pages/About'
import NoMatch from './Components/Pages/NoMatch'

import Travel from './Components/Pages/Travel'
import FashionAndStyle from './Components/Pages/FashionAndStyle'
import HealthAndWellness from './Components/Pages/HealthAndWellness'

	// <Blog data={data}/>
	// <HealthAndWellness data={data}/>
	// <Travel data={data}/>
	// <About data={data}/>

class App extends Component {

	constructor(props){
		super(props);

	}
     // Add change listeners to stores
  componentDidMount(){
    AppStore.addChangeListener(this._onChange.bind(this))
  }

  // Remove change listeners from stores
  componentWillUnmount(){
    AppStore.removeChangeListener(this._onChange.bind(this))
  }

  getStore(){
    AppDispatcher.dispatch({
      action: 'get-app-store'
    })
  }
  componentWillMount() {
	  this.getStore()
  }

  _onChange(){
    this.setState(AppStore)
  }

    render() {
		const data = AppStore.data
		    if(!data.ready){
		      this.getStore()

		      return (
		        <div className="container text-center">
		          <Loading />
		        </div>
		      )
		    }

		console.log(data)

		    return (
				<BrowserRouter>
					<div>
					  <Nav data={ data }/>
						  {routes}
					  <Footer data={ data }/>
					</div>
				</BrowserRouter>

		    )
    }
}

export default App;


//
// return (
// <BrowserRouter data={AppStore.data}>
// 	<Route exact path="/" component={Blog}/>
// 	<Route path="/fashion-style" component={FashionAndStyle}/>
// 	<Route path="/health-wellness" component={HealthAndWellness}/>
// 	<Route path="/travel" component={Travel}/>
// 	<Route path="/about" component={About}/>
// 	<Route path="/contact" component={About}/>
// 	<Route path="/blog/:slug" component={Blog}/>
// 	<Route path="*" component={NoMatch}/>
// </BrowserRouter>
// )
