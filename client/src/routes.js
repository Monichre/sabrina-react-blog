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
	},
	{
		path: '/fashion',
		component: FashionAndStyle
	},
	{
        path: '/health',
		exact: true,
        component: HealthAndWellness
	},
	{
		path: '/fashion/:slug',
		component: BlogSingle
	},
	{
        path: '/health/:slug',
		exact: true,
        component: BlogSingle
    }
]

export default(

	<div>
		{routes_with_sub.map((route, i) => (
			<Route exact path={route.path} render={(props) => (

						<route.component key={i} data={AppStore.data} {...props} />
				)}/>
			))}
	</div>
)
   