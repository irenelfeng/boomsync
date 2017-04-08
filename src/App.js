import React, { Component } from 'react'
import { Button, Layout } from 'antd';
import './App.css'
import Play from './Play'
import Preview from './Preview'
import levels from './levels'
import CodeEditor from './CodeEditor'
import ErrorBox from './ErrorBox'
import LevelIndicator from './LevelIndicator'

const { Header, Content } = Layout

export default class App extends Component {
  state = {
    playing: false,
    level: 0,   // this is just an index
    isSubmitted: false,
    failed: null,
    readyForNext: false
  }

  handleClick = () => this.state.readyForNext
    ? this.setState(prevState => ({
        playing: false,
        isSubmitted: false,
        code: null,
        readyForNext: false,
        level: prevState.level + 1
      }))
    : this.setState(prevState => ({
        playing: true,
        isSubmitted: true,
        code: this.refs.code.getContents()
      }))

  handleResetClick = () => { // TODO
    this.setState(() => ({
      playing: false,
      readyForNext: false,
      failed: null
    }))
  }

  changePage = (page) => {
    this.setState(() => ({
      level: page - 1,
      playing: false,
      failed: null,
    }))
    this.refs.code.reloadProps(this.initialCode(page - 1))
  }

  succeed = () => {
    this.setState(() => ({
      playing: false,
      readyForNext: true
    }))
  }

  fail = (err) => {
    this.setState(() => ({
      failed: err,
      playing: false
    }))
  }

  play = () => this.setState({ playing: true })
  initialCode = (level) => levels[level].initialCode

  handleResetClick = () => {
    this.setState(() => ({
      playing: false,
      readyForNext: false,
      failed: null,
      code: this.initialCode(this.state.level)
    }))
    this.refs.code.reloadProps(this.initialCode(this.state.level))
  }

  render() {
    const { playing, level, code, failed } = this.state
    const description = levels[level].instructions.join('<br/> <br/>')
    const initialCode = this.initialCode(level)
    const lineStart = levels[level].lineStart

    return (
      <div className="App">
        <div className="Left-sidebar">
          <Layout>
            <Header>
              <LevelIndicator changePage={this.changePage} level={level + 1} />
            </Header>
            <Content style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div className="Game-description">
                <span dangerouslySetInnerHTML={{ __html: description }} />
              </div>
              <CodeEditor {...{initialCode, lineStart}} ref='code'
                style={{flex: 1, minHeight: '200px'}}
              />
              <p>Errors:</p>
              <ErrorBox {...{failed}} />
              <div style={{
                  display: 'flex',
                  margin: 5,
                  justifyContent: 'space-around'
                }}
              >
                <Button type="danger" onClick={this.handleResetClick}>
                  Reset
                </Button>
                <Button type="primary" loading={this.state.playing} onClick={this.handleClick}>
                  {this.state.isSubmitted
                    ? this.state.readyForNext
                      ? this.state.playing
                        ? 'Running'
                        : 'Next'
                      : 'Try Again'
                    : 'Submit'
                  }
                </Button>
              </div>
            </Content>
          </Layout>
        </div>
        <div className="Right-sidebar">
          { playing
            ? <Play {...{level: levels[level], code, fail: this.fail, succeed: this.succeed}} />
            : <Preview {...{level}} />
          }
        </div>
      </div>
    );
  }
}
