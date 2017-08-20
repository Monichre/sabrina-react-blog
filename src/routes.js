// routes.js
import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

// Store
import AppDispatcher from './Dispatcher/AppDispatcher'
import AppStore from './Stores/AppStore'

// Pages
import App from './App'
import Blog from './Components/Pages/Blog'
import Default from './Components/Pages/Default'
import About from './Components/Pages/About'
import NoMatch from './Components/Pages/NoMatch'
import Travel from './Components/Pages/Travel'
import FashionAndStyle from './Components/Pages/FashionAndStyle'
import HealthAndWellness from './Components/Pages/HealthAndWellness'

export default(
    <div>
			<Route exact path="/"  render={ () => <Blog data={AppStore.data}/> }/>
	        <Route path="/fashion-style" render={ () => <FashionAndStyle data={AppStore.data}/> }/>
	        <Route path="/health-wellness" render={() => <HealthAndWellness data={AppStore.data}/> }/>
	        <Route path="/travel" render={() => <Travel data={AppStore.data}/> }/>
	        <Route path="/about" render={() => <About data={AppStore.data}/>} />
	        <Route path="/contact" render={() => <About data={AppStore.data}/>} />
	        <Route path="/blog/:slug" render={() => <Blog data={AppStore.data}/>} />

	</div>


)
