import React, { Component } from 'react'
import { Button, Layout } from 'antd';
const ButtonGroup = Button.Group;
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
        level: prevState.level + 1,
        failed: null
      }))
    : this.setState(prevState => ({
        playing: true,
        isSubmitted: true,
        code: this.refs.code.getContents(),
        failed: null
      }))

  replay = () => {
    this.setState(prevState => ({
        playing: true,
        isSubmitted: true,
        failed: null
      }))
  }

  handleResetClick = () => {
    this.setState(() => ({
      playing: false,
      readyForNext: false,
      failed: null
    }))
  }

  changePage = (page) => {
    this.setState(() => ({
      isSubmitted: false,
      level: page - 1,
      readyForNext: false,
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
      isSubmitted: false,
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
            <Header style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}
            >
              <img src="./logo_wide.png" height="90%" />
              <LevelIndicator changePage={this.changePage} level={level + 1} />
            </Header>
            <Content style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f9f7f0'
              }}
            >
              <div className="Game-description">
                <span dangerouslySetInnerHTML={{ __html: description }} />
              </div>
              <CodeEditor {...{initialCode, failed, playing}} ref='code'
                style={{flex: 1, minHeight: '200px'}}
              />
              <p>Errors:</p>
              <ErrorBox {...{failed}} />
              <div style={{
                  display: 'flex',
                  margin: 5,
                  justifyContent: 'space-around',
                  padding: 10
                }}
              >
                <Button type="danger" onClick={this.handleResetClick}>
                  Reset
                </Button>
                <ButtonGroup>
                {
                  this.state.readyForNext && !this.state.playing ? <Button type="default" onClick={this.replay}>
                                            Replay
                                            </Button>
                                          : ''
                }
                <Button type="primary" loading={this.state.playing} onClick={this.handleClick}>
                  {this.state.isSubmitted
                    ? !this.state.playing
                      ? this.state.readyForNext
                        ? 'Next Level'
                        : 'Try Again'
                      : 'Running'
                    : 'Submit'
                  }
                </Button>

                </ButtonGroup>

              </div>
            </Content>
            <div className="foot">
              Game by <a href="http://irenefeng.com/">Irene Feng</a>, <a href="https://github.com/ben-pr-p">Ben Packer</a>, <a href="https://byrnehollander.com/">Byrne Hollander</a>, <a href="http://jennyseong.me/">Jenny Seong</a>
            </div>
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
