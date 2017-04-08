import React, { Component } from 'react';
import './App.css';
import CodeEditor from './CodeEditor';

class App extends Component {
  state = {
    playing: false
  }

  render() {
    return (
      <div className="App">
        <div className="Left-sidebar">
          <p className="Game-description">
            Welcome to <code>boomsync</code>!
          </p>
          <CodeEditor />
        </div>
        <div className="Right-sidebar">
          <p>Game goes here</p>
        </div>
      </div>
    );
  }
}

export default App;
