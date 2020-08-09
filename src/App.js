import React from 'react';
import './App.css';
import Home from './component/home'
import Short from './component/short'
import 'antd/dist/antd.css'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Route  path="/" component={Home}>
        </Route>
      </Router>
      
    </div>
  );
}

export default App;
