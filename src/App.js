import React, { Component } from 'react'
import { Button } from 'antd';
import './App.css'
import Play from './Play'
import Preview from './Preview'
import CodeEditor from './CodeEditor'
import levels from './levels/levels.js'

class App extends Component {
  state = {
    playing: false,
    level: 1,
    isSubmitted: false
  }

  handleClick = () => {
    this.setState(prevState => ({
      playing: true,
      isSubmitted: !prevState.isSubmitted
    }));
  }

  play = () => this.setState({ playing: true })

  render() {
    const { playing, level, code } = this.state
    const description = '<p>'+levels[level].instructions.join('</p><p>')+'</p>'
    const initialcode = levels[level].initialcode

    return (
      <div className="App">
        <div className="Left-sidebar">
          <div className="Game-description" dangerouslySetInnerHTML={{ __html: description }}>
          </div>
          <CodeEditor {...{initialcode}}/>
          <Button type="primary" loading={this.state.playing} onClick={this.handleClick}>
            {this.state.isSubmitted
              ? this.state.playing
                ? 'Running'
                : 'Next'
              : 'Submit'
            }
          </Button>
        </div>
        <div className="Right-sidebar">
          {playing
            ? <Play {...{level, code}} />
            : <Preview {...{level, code}} />
          }
        </div>
      </div>
    );
  }
}

export default App;
