import React, { Component } from 'react'
import './Play.css'

export default class Preview extends Component {

  render () {
    return (
      <div className='preview'>
        <img src={'/back.svg'} style={{
            height: 100,
            width: 100
          }} ></img>
      </div>
    )
  }
}
