import React from 'react'
import {Route} from 'react-router-dom'
import AppStore from './Stores/AppStore'
import Blog from './Components/Pages/Blog'
import About from './Components/Pages/About'
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
		path: '/videos/:slug',
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
   