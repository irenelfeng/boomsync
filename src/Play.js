import React, { Component } from 'react'
import boomerang from './boomerang.svg'
import './Play.css'

let birdSpeed = .25
let boomSpeed = .5
let boomReturnTime = 5000
let tickInterval = 50

const dist = ([x1, y1], [x2, y2]) => Math.sqrt((x1 - x2)**2 + (y1 - y2)**2)

export default class Play extends Component {
  state = {
    boomerangs: []
  }

  failed = false

  fail = (err) => {
    clearInterval(this.tickIntervalId)
    this.failed = true
    this.props.fail(err || {name: 'Failure', message: 'A bird escaped!'})
  }

  tickIntervalId = null

  componentWillMount () {
    if (!playCoords) setPlayCoords()
    boomSpeed = (playCoords[1] / boomReturnTime) * 2

    this.state.birds = this.props.level.events.map(({type, time}) =>
      [(playCoords[0] / 2) + (time * birdSpeed), 50]
    )
  }

  componentWillUnmount () {
    clearInterval(this.tickIntervalId)
    this.tickIntervalId = null
  }

  componentDidMount () {
    let queuedBoomerangs = 0

    // define throwBoomerang
    const throwBoomerang = (fn) => {
      queuedBoomerangs++
      this.state.boomerangs.push(generateBoomerang())
      this.forceUpdate()

      setTimeout(() => {
        fn && fn(null, {})
        queuedBoomerangs--

        if (queuedBoomerangs == 0) {
          if (!this.failed)
            this.props.succeed()
        }

      }, boomReturnTime)
    }

    const chill = (ms, fn) => {
      setTimeout(() => fn && fn(null, {}), ms)
    }

    try {
      const stuff = eval(this.props.code)

    } catch (err) {
      this.fail(err)
    }

    this.tickIntervalId = setInterval(this.tick, tickInterval)
  }

  tick = () => {
    // check for crossed birds
    const birdsCrossed = this.state.birds.filter(b => b[0] < -300) // TODO
    // check for collisions
    const birdsDead = this.state.birds.map(b =>
      this.state.boomerangs.filter(({coords}) => dist(b, coords) < 50).length > 0
    )
    // check for returned boomerangs
    const boomerangsReturned = this.state.boomerangs.map(b => false) // TODO

    // Check if game is over
    if (birdsCrossed.length > 0) {
      // TODO: match to need expected birds dead
      this.fail()
    }

    // Update bird position
    this.state.birds = this.state.birds.map(([x,y], idx) => !birdsDead[idx]
      ? [x - birdSpeed * tickInterval, y]
      : undefined
    ).filter(b => b)

    // Update boomerang position
    this.state.boomerangs = this.state.boomerangs.map(({coords, rotation, flightAngle, wayBack}) =>
      wayBack || coords[1] < 50
        ? ({
            coords: [coords[0], coords[1] + boomSpeed * tickInterval],
            rotation: rotation + tickInterval,      // TODO
            flightAngle: flightAngle + 1,// TODO
            wayBack: true
          })
        : ({
            coords: [coords[0], coords[1] - boomSpeed * tickInterval],
            rotation: rotation + tickInterval,      // TODO
            flightAngle: flightAngle + 1,// TODO
            wayBack: false
          })
    )

    this.forceUpdate()
  }

  render () {
    const { birds, boomerangs } = this.state

    return (
      <div className='play'>
        {birds.map((b, idx) => (
          <div className='smooth' style={{transform: `translate(${formatCoords(b, 50)})`}}>
            <img src='/birdie.svg' className='bird' key={b}/>
          </div>
        ))}
        {boomerangs.map((b, idx) => (
          <div className='smooth' style={{transform: `translate(${formatCoords(b.coords, 40)})`}} >
            <img src='/boomerang_redBoom.svg' className='smooth-rotate boomerang' key={`${idx}-${b.coords}`}
              style={{transform: `rotate(${b.rotation}deg)`}} />
          </div>
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
