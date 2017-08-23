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
import BlogSingle from './Components/Partials/BlogSingle'

let routes_with_sub = [
    {
        path: '/',
		exact: true,
        component: Blog
    }, {
        path: '/fashion-style',
		exact: true,
        component: FashionAndStyle
    },
	{
		path: '/fashion-style/:slug',
		component: BlogSingle
	},
	{
        path: '/health-wellness',
		exact: true,
        component: HealthAndWellness
    },
	{
		path: '/health-wellness/:slug',
		component: BlogSingle
	},
	{
        path: '/travel',
		exact: false,
        component: Travel
    },
	{
		path: '/travel/:slug',
		component: BlogSingle
	},
	{
        path: '/about',
		exact: true,
        component: About
    },
	{
        path: '/contact',
		exact: true,
        component: About
    }
]
// const RouteWithSubRoutes = (route) => (
//   <Route path={route.path} render={() => ( <route.component key={i} data={AppStore.data} routes={route.routes}/> )}/>
// )

export default(

	<div>
		{routes_with_sub.map((route, i) => (
			<Route exact path={route.path} render={(props) => (

						<route.component key={i} data={AppStore.data} {...props} />
				)}/>
			))}
	</div>
)
        // <Route exact path="/" render={() => <Blog data={AppStore.data}/>}/>
        // <Route path="/fashion-style" render={(path) => <FashionAndStyle data={AppStore.data} routes={path + '/:slug'}/>}/>
        // <Route path="/health-wellness" render={() => <HealthAndWellness data={AppStore.data}/>}/>
        // <Route path="/travel" render={() => <Travel data={AppStore.data}/>}/>
        // <Route path="/about" render={() => <About data={AppStore.data}/>}/>
        // <Route path="/contact" render={() => <About data={AppStore.data}/>}/>
        // //
        // <Route path="/blog/:slug" render={() => <BlogSingle data={AppStore.data}/>}/>
