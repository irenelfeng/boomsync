import React, { Component } from 'react'
import boomerang from './boomerang.svg'
import bird from './bird.svg'
import './Play.css'

const birdSpeed = 1
const boomSpeed = 1
const boomReturnTime = 1000
const tickInterval = 5

const print = (s) => (console.log(s), s)

export default class Play extends Component {
  state = {
    boomerangs: []
  }

  tickIntervalId = null

  componentWillMount () {
    if (!playCoords) setPlayCoords()

    this.state.birds = this.props.level.events.map(({type, time}) =>
      [(playCoords[0] / 2) + time * birdSpeed, 50]
    )
  }

  componentDidMount () {
    // define throwBoomerang
    const throwBoomerang = (fn) => {
      this.state.boomerangs.push(generateBoomerang())
      this.forceUpdate()

      setTimeout(() => fn && fn(null, {}), boomReturnTime)
    }

    eval(`throwBoomerang((err, boom) => {
      throwBoomerang()
    })`)
    this.tickIntervalId = setInterval(this.tick, tickInterval)

    setTimeout(() => clearInterval(this.tickIntervalId), 5000)
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
    this.state.boomerangs = this.state.boomerangs.map(({coords, rotation, flightAngle, wayBack}) =>
      wayBack || coords[1] < 50
        ? ({
            coords: [coords[0], coords[1] + boomSpeed * tickInterval],
            rotation: rotation + 1,      // TODO
            flightAngle: flightAngle + 1,// TODO
            wayBack: true
          })
        : ({
            coords: [coords[0], coords[1] - boomSpeed * tickInterval],
            rotation: rotation + 1,      // TODO
            flightAngle: flightAngle + 1,// TODO
            wayBack: false
          })
    )

    this.forceUpdate()
  }

  render () {
    const { code, level } = this.props
    const { birds, boomerangs } = this.state

    return (
      <div className='play'>
        {birds.map((b, idx) => (
          <img src={bird} className='bird' key={b} style={{
              transform: `translate(${formatCoords(b, 50)})`
            }}
          />
        ))}
        {boomerangs.map((b, idx) => (
          <img src={boomerang} className='boomerang' key={`${idx}-${b.coords}`} style={{
              transform: `translate(${formatCoords(b.coords, 40)})`,
            }}
          />
        ))}
      </div>
    )
  }
}

function generateBoomerang () {
  if (!playCoords) setPlayCoords()

  return {
    coords: [0, playCoords[1]],
    rotation: 0,
    flightAngle: -45,
    wayBack: false
  }
}

let playCoords
function setPlayCoords () {
  playCoords = [
    document.querySelector('.Right-sidebar').offsetWidth,
    document.querySelector('.Right-sidebar').offsetHeight,
  ]
}

function formatCoords (coords, radius) {
  if (!playCoords) setPlayCoords()
  return `${Math.floor(coords[0] + (playCoords[0] / 2) - radius)}px, ${coords[1] - radius}px`
}
