import React, { Component } from 'react'
import boomerang from './svg/boomerang'
import './App.css'

const birdSpeed = 1
const boomSpeed = 1
const boomReturnTime = 1000
const tickInterval = 1

class App extends Component {
  state = {
    boomerangs: []
  }

  tickIntervalId = null

  componentWillMount () {
    this.state.birds = this.props.level.events.map(({type, time}) =>
      [(-1) * time * birdSpeed, 300]
    )
  }

  componentDidMount () {
    // define throwBoomerang
    const throwBoomerang = (fn) => {
      this.state.boomerangs.push(generateBoomerang())
      this.forceUpdate()

      setTimeout(() => fn(null, {}), boomReturnTime)
    }

    eval(code)
  }

  tick = () => {
    // check for crossed birds
    const birdsCrossed = this.state.birds.filter(b => false) // TODO
    // check for collisions
    const birdsDead = this.state.birds.map(b => false) // TODO
    // check for returned boomerangs
    const boomerangsReturned = this.state.boomerangs.map(b => false) // TODO

    // Check if game is over
    if (birdsCrossed.length > 0) {
      this.props.fail()
    } else if (birdsDead.length == this.state.birds) {
      this.props.succeed()
    }

    // Update bird position
    this.state.birds = this.state.birds.map(([x,y], idx) => !birdsDead[idx]
      ? [x - birdSpeed * tickInterval, y]
      : []
    )

    // Update boomerang position
    this.state.boomerangs = this.state.boomerangs.map(({coords, rotation, flightAngle}) => ({
      coords: coords,              // TODO
      rotation: rotation + 1,      // TODO
      flightAngle: flightAngle + 1 // TODO
    }))

    this.forceUpdate()
  }

  render() {
    const { code, level } = this.props
    const { birds, boomerangs } = this.state

    return (
      <div className='play'>
        {birds.map(b => (
          <img src={bird} className='bird' style={{
              transform: `translate()`
            }}
          />
        ))}
        {boomerangs.map(b => (
          <img src={bird} className='boomerang' style={{
              transform: `translate() rotate(${b.rotation})`,
            }}
          />
        ))}
      </div>
    )
  }
}

export default Play

function generateBoomerang () {
  return {
    coords: [0, 0]
    rotation: 0,
    flightAngle: -45
  }
}
