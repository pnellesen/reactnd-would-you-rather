import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './components/App'


/* block these off until needed. WILL be using them at some point
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'
const store = createStore(reducer, middleware);
console.log("Store created: ", store);

ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'))
*/

ReactDOM.render(<App />, document.getElementById('root'))

/* not using the below code. Keep until we're sure we won't need it.
import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();
import './index.css'
*/