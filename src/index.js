import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

let blocks = []

for (let i = 0; i < 100; i++) blocks.push({id: i})

ReactDOM.render(
  <App blocks={blocks} />,
  document.getElementById('root')
);
