import React, { Component } from 'react';
import './App.css';
import Nav from './component/Nav/Nav';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Nav">
          <Nav />
        </div>
        { routes }
      </div>
    );
  }
}

export default App;
