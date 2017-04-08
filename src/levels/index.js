const levels = [
  {
    "level": 0,
    "initialCode": "// write your code here",
    "instructions": [`Welcome to boomsync, where we will learn how to
    program asynchronously in Javascript.
    We are avid bird hunters and need your help. `,
    `You have the <code>throwBoomerang()</code> function which throws your boomerang.
    It can take in a function as an (optional) parameter, executing after the boomerang is thrown.`,
    `But nevermind this for now: just type in 
    <code>throwBoomerang()</code> in the code editor and knock down a bird!`
    ],
    "events": [
      {
        "type": 'bird',
        "time": 1000
      }
    ]
  },
  {
    "level": 1,
    "initialCode": "chill(500, () => \n // write your code here \n );",
    "instructions": [`For this level, we need to throw a boomerang to kill a bird in <b>1000</b> ms.`,
    `You now have another function to call besides <code>throwBoomerang()</code>. 
    <code>chill()</code>
    takes in two parameters: the first is how long you wait in milliseconds.
    The second parameter should be a function that will be executed after
    we chill for that number of milliseconds. This is called a <i> callback </i> function.`,
    `The optional parameter we can give to <code>throwBoomerang()</code> is also a callback. 
    Callbacks are everywhere in asynchronous javascript`, 
    `In the editor below, chilling for <b>1000</b> ms and then
    call <code>throwBoomerang()</code> in the callback.`
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
    "instructions": [`Great job! However, this code did not take full advantage of
    the power of asynchronization. We could have just executed the <code>chill()</code>
    function and then the <code>throwBoomerang()</code> function synchronously without callbacks.`,
    `In this level, let's throw two boomerangs to kill two birds.
    We don't have to wait for the first boomerang to come back to throw the second boomerang.
    Our code is <i>non-blocking</i>, which maximizes efficiency!`,
    `In the editor below, immediately throw the first boomerang.
    Also chill for <b>200</b>ms, and in the callback, throw another boomerang.`
    ],
    "events": [
      {
        "type": 'bird',
        "time": 500
      },
      {
        "type": 'bird',
        "time": 700
      },

    ]
  },
  {
    "level": 3,
    "instructions": [`This is awesome! Next: promises`
    ],
    "events": [
      {
        "type": 'bird',
        "time": 500
      },
      {
        "type": 'bird',
        "time": 1400
      },

    ]
  }
]


export default levels
