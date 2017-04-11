// pagination

// error catching
const catchError = () => {
  throwBoomerang((err) => {
    if (err) {
      fixBoomerangs()
    }
  })
}

new Array(3).fill(null).map((_, i ) => {
  chill(i*1550, catchError)
})

const promiseThrow = bluebird.promisify(throwBoomerang)

new Array(3).fill(null).map((_, i ) => {
  chill(i*2000, () => promiseThrow().catch(fixBoomerangs)
})
