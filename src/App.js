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
        <p className="Game-description">
          Welcome to <code>boomsync</code>!
        </p>
        <CodeEditor />
      </div>
    );
  }
}

export default App;
