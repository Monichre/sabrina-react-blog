import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'


// const content = ['**/src/Components/**/*.js']
// const css = ['./App.css']

// const options = {
//   // Will write purified CSS to this file.
//   output: './purified.css'
// }

// purifycss(content, css, options)


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
