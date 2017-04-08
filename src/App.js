import React, { Component } from 'react'
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/solarized_dark';
import 'brace/ext/language_tools';
import './App.css'
import Play from './Play'
import Preview from './Preview'
import levels from './levels'

class App extends Component {
  state = {
    playing: false,
    level: 0  // this is just an index
  }

  play = () => this.setState({playing: true})

  render() {
    const { playing, level, code } = this.state

    return (
      <div className="App">
        <div className="Left-sidebar">
          <p className="Game-description">
            Welcome to <code>boomsync</code>!
          </p>
          <AceEditor
            mode="javascript"
            theme="solarized_dark"
            name="code editor"
            height="6em"
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: false,
              tabSize: 4,
              fontSize: 14,
              showGutter: true
            }}
          />
          <a onClick={this.play} >
            Go!
          </a>
        </div>
        <div className="Right-sidebar">
          {playing
            ? <Play {...{level: levels[level], code}} />
            : <Preview {...{level}} />
          }
        </div>
      </div>
    );
  }
}

export default App;
