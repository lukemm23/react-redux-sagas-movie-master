import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route} from 'react-router-dom';
import Home from '../pages/Home/home';
import Details from '../pages//Details/details';
import Edit from '../pages/Edit/edit';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">Prime Movie Weekend!</h1>
          {/* <div className="link"><Link to="/">Home</Link></div>
          <div className="link"><Link to="/api/details">Details</Link></div>
          <div className="link"><Link to="/api/edit">Edit</Link></div> */}
        </header>
          <Route path="/" exact component={Home} />
          <Route path="/details" component={Details} />
          <Route path="/edit" component={Edit} />
        </div>
      </Router>
    );
  }
}

export default App;
