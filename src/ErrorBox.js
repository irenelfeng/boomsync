import React, { Component } from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/github'
import 'brace/ext/language_tools'

export default class CodeEditor extends Component {
  render() {
    const err = this.props.failed

    return (
      <AceEditor
        mode="javascript"
        theme="github"
        setOptions={{
          tabSize: 4,
          fontSize: 14,
        }}
        showGutter={false}
        value={err ? `${err.name}: ${err.message}` : 'No errors so far!'}
        height="10%"
        style={{minHeight:"50px"}}
        width="100%"
      />
    );
  }
}
