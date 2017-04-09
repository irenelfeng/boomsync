const levels = [
  {
    "level": 0,
    "initialCode": "throwBoomerang()",
    "instructions": [
      `Welcome to boomsync, where we will learn how to
      program asynchronously in Javascript by throwing boomerangs at birds.
      We are avid bird hunters and need your help. `,
      `To throw a boomerang, call <code>throwBoomerang()</code>.
      You can optionally include a callback paramter <code>throwBoomerang(callback)</code>,
      which will be executed once the boomerang returns.`,
      `For now, just give in <code>throwBoomerang()</code> a try in the code editor
      below and click 'Submit' to knock down a bird!`
    ],
    "events": [
      {
        "type": "bird",
        "time": 1000
      }
    ]
  },
  {
    "level": 1,
    "initialCode": "chill(1000, () => \n // write your code here \n );",
    "instructions": [
      `For this level, if you throw the boomerang right away you'll be too early.`,
      `You'll need to throw a boomerang in <b>1000</b> ms.`,
      `We've provided you a second function called <code>chill</code>.
      <code>chill(waitTime, callback)</code>
      takes in two parameters: the first is how to wait in milliseconds before the second function is called.`,
      `This is called a <i> callback </i> function.`,
      `The optional parameter we can give to <code>throwBoomerang()</code> is also a callback.
      Callbacks are everywhere in asynchronous Javascript`,
      `In the editor below, try chilling for <b>1000</b> ms and putting
      <code>throwBoomerang</code> in the callback.`,
      `Note: <code>chill(1000, throwBoomerang())</code> will throw the boomerang immediately`
    ],
    "events": [
      {
        "type": 'bird',
        "time": 2000
      }
    ]
  },
  {
    "level": 2,
    "initialCode": "",
    "instructions": [
      `Great job! However, this code did not take full advantage of the power of
      asynchronous execution, which is that while you're waiting for something
      to return, you can work on something else.`,
      `In this level, you'll need to throw a second boomerag before the first one returns.
      The first bird is coming so that if you throw one boomerang right away, you'll get it.`,
      `To hit the second one, you'll need to wait 500 ms before throwing.`
    ],
    "events": [
      {
        "type": 'bird',
        "time": 1000
      },
      {
        "type": 'bird',
        "time": 1500
      },

    ]
  },
  {
    "level": 3,
    "initialCode": "const promiseThrow = bluebird.promisify(throwBoomerang)\npromiseThrow.then(() => throwBoomerang())",
    "instructions": [
      `Awesome job! Next: Promises. A Promise is an object representing some asynchronous
      operation, and it can be either pending, fullfilled, or rejected. If a promise is fullfilled (rejected),
      it resolves (optionally with a particular value). If a promise fails (rejects), it
      is rejected with an error.`,
      `In this example, you can use a library called <code>bluebird</code> to convert
      a function that takes a callback to a function that returns a promise. Once you have
      a promise, you register what it should resolve and reject with <code>.then</code>
      and <code>.catch</code>.`,
      `We've done this one for you while you're getting used to promises, so just press
      submit and give it a go.`
    ],
    "events": [
      {
        "type": 'bird',
        "time": 1000
      },
      {
        "type": 'bird',
        "time": 4000
      },

    ]
  }
]


export default levels
