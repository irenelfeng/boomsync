import React, { Component } from 'react'
import boomerang from './boomerang.svg'
import Bluebird from 'bluebird'
import './Play.css'

let birdSpeed = .25
let boomSpeed = .5
let boomReturnTime = 3000
let tickInterval = 50

const dist = ([x1, y1], [x2, y2]) => Math.sqrt((x1 - x2)**2 + (y1 - y2)**2)

export default class Play extends Component {
  state = {
    boomerangs: new Array(2).fill(null).map((_, idx) => defaultBoomerang(idx))
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

    this.state.birds = this.props.level.events.filter(({type, time}) => type.includes('bird'))
      .map(({type, time}) =>
        type == "brokenbird" ?  ({ coords: [100 + (time * birdSpeed), 50], dead: false, broken: true }) :
          ({ coords: [100 + (time * birdSpeed), 50], dead: false })
    )

  }

  componentWillUnmount () {
    clearInterval(this.tickIntervalId)
    this.tickIntervalId = null
  }

  componentDidMount () {
    let queuedBoomerangs = 0

    // define fixBoomerang
    const fixBoomerangs = (fn) => {
      console.log("fixing boomerangs")
      this.state.boomerangs.forEach(b => b.broken = false)
      this.forceUpdate()
      fn && fn(null, {})
    }

    // get index of the first boomerang that is not being thrown right now
    const getAvailableBoomerang = (boomerangs) => {
      return boomerangs.findIndex(b => !b.throwing)
    }
    // define throwBoomerang
    const throwBoomerang = (fn) => {
      const bidx = getAvailableBoomerang(this.state.boomerangs)
      if ( bidx == -1 ) {
        return this.fail({name: 'Failure', message: `Sorry, you cannot throw more than ${2} boomerangs at once`})
      }

      if (this.state.boomerangs[bidx].broken) {
        console.log("TRYING TO THROW BROKEN BOOMERANG")
        return this.fail({ name: 'Failure', message: `Trying to throw a broken boomerang`})
      }

      queuedBoomerangs++
      this.state.boomerangs[bidx] = generateBoomerang(bidx)
      this.forceUpdate()

      setTimeout((err) => {
        queuedBoomerangs--
        this.state.boomerangs[bidx].throwing = false
        this.forceUpdate()
        if (this.state.boomerangs[bidx].broken) {
          fn(Error("Boomerang is broken"), {})
          console.log("BOOMERANG IS BROKEN!")
        } else {
          fn && fn(null, {})
        }
        if (queuedBoomerangs == 0) {
          if (this.state.birds.filter(b => !b.dead).length > 0) {
            return this.fail({ name: 'Failure', message: `A bird escaped!`})
          } else if (!this.failed) {

            return this.props.succeed()
          }
        }

      }, boomReturnTime)
    }

    // chill function
    const chill = (ms, fn) => {
      setTimeout(() => fn && fn(null, {}), ms)
    }

    try {
      const bluebird = Bluebird
      const stuff = eval(this.props.code)
    } catch (err) {
      this.fail(err)
    }

    this.tickIntervalId = setInterval(this.tick, tickInterval)
  }

  tick = () => {
    // check for crossed birds
    const birdsCrossed = this.state.birds.filter(b => b.coords[0] < -300)
    // check for collisions
    const birdsDead = this.state.birds.map(b => b.dead
      ? true
      : this.state.boomerangs.filter(({coords}) => dist(b.coords, coords) < 50).length > 0
    )
    // check for returned boomerangs
    const boomerangsReturned = this.state.boomerangs.map(b => false) // TODO

    // Check if game is over
    if (birdsCrossed.length > 0) {
      this.fail()
    }

    // Update bird position
    this.state.birds = this.state.birds.map((b, idx) => !birdsDead[idx]
      ? ({ coords: [b.coords[0] - birdSpeed * tickInterval, b.coords[1]], broken: b.broken, dead: false })
      : ({ coords: [b.coords[0] + 10, b.coords[1] + 10], broken: b.broken, dead: true })
    )

    const gotBroken = (b) =>
      this.state.birds.filter(({coords, broken}) => (broken && dist(b.coords, coords) < 50)).length > 0
    // Check if any boomerangs were broken by hitting a broken bird
    const boomerangsBroken = this.state.boomerangs.map(b => b.broken
      ? true
      : gotBroken(b)
    )

    // Update boomerang position
    this.state.boomerangs = this.state.boomerangs.map(({coords, rotation, flightAngle, wayBack, broken, throwing}, idx) =>
      throwing
        ? wayBack || coords[1] < 50
        ? ({
              coords: [coords[0], coords[1] + boomSpeed * tickInterval], // going down
              rotation: rotation + tickInterval,      // TODO
              flightAngle: flightAngle + 1,// TODO
              wayBack: true,
              broken: broken ? true : boomerangsBroken[idx],
              throwing: true
            })
        : ({
            coords: [coords[0], coords[1] - boomSpeed * tickInterval], // going up
            rotation: rotation + tickInterval,      // TODO
            flightAngle: flightAngle + 1,// TODO
            wayBack: false,
            broken: broken ? true: boomerangsBroken[idx],
            throwing: true
          })
      :
        ({
          coords: [coords[0], playCoords[1] + 50],
          rotation: rotation + tickInterval,      // TODO
          flightAngle: flightAngle + 1,// TODO
          wayBack: false,
          broken: broken ? true: boomerangsBroken[idx],
          throwing: false
        })
    )

    this.forceUpdate()
  }

  render () {
    const { birds, boomerangs } = this.state

    return (
      <div className='play'>
        {birds.map((b, idx) => (
          <div className='smooth' key={b.coords} style={{transform: `translate(${formatCoords(b.coords, 50)})`}}>
            <img className='bird' src={!b.dead
              ? '/birdie.svg'
              : '/bird_falling.svg'} />
          </div>
        ))}

        {birds.filter(b => b.dead).map((b, idx) => (
          <audio src='collision.mp3' key={idx} autoPlay='true' />
        ))}
        {boomerangs.filter(b => b.broken).map((b, idx) => (
          <audio src='break.mp3' key={idx} autoPlay='true' />
        ))}

        {boomerangs.map((b, idx) => (
          <div className='smooth' style={{transform: `translate(${formatCoords(b.coords, 40)})`}} >
            <img src={!b.broken
                ? ['/boomerang_tapedBoom.svg', 'boomerang_redBoom.svg'][idx % 2] :
                ['/boomerang_brokenBoom.svg', 'boomerang_brokenBoom.svg'][idx % 2]
              }
              className='smooth-rotate boomerang' key={`${idx}-${b.coords}`}
              style={{transform: `rotate(${b.rotation}deg)`}} />
          </div>
        ))}

        <img src='/back.svg' style={{
            transform: `translate(${formatCoords([0, playCoords[1] - 50], 50)})`,
            height: 100,
            width: 100
          }}
        />
      </div>
    )
  }
}

function defaultBoomerang (idx) {
  if (!playCoords) setPlayCoords()

  return {
    coords: [0, playCoords[1] + 100],
    rotation: 45 * idx,
    flightAngle: 0,
    wayBack: false,
    broken: false,
    throwing: false
  }
}
function generateBoomerang (idx) {

  return {
    coords: [0, playCoords[1]],
    rotation: 45 * idx,
    flightAngle: 0,
    wayBack: false,
    broken: false,
    throwing: true
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
