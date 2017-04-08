import React, { Component } from 'react'
import boomerang from './boomerang.svg'
import './App.css'

export default class Preview extends Component {
  render() {
    const { code, level } = this.props

    return (
      <div>
        Game preview
      </div>
    )
  }
}
