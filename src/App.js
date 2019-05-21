import React, { Component } from 'react';
import './App.css';
import ReactGA from 'react-ga';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
            <p>
                Un essaie par  <code>Shelsea</code>. Ne pas effacer.
            </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

function initializeReactGA() {
    ReactGA.initialize('');
    ReactGA.pageview('/homepage');
}

initializeReactGA();

export default App;
