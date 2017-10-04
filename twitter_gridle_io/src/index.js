import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let baseUrl = ' https://api.twitter.com/1.1/'
// ~~ statuses/user_timeline.json?screen_name=twitterapi&count=10
// ~~ favorites/create.json?id=915205510336598017

ReactDOM.render(<App baseUrl={baseUrl} />, document.getElementById('root'));
registerServiceWorker();
