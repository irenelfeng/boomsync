const levels = [
  {
    "level": 0,
    "initialcode": "chill(500, () => \n // write your code here \n );",
    "instructions": [`Welcome to boomsync, where we will learn how to
    program asynchronously in Javascript.
    For this level, we need to throw a boomerang to kill a bird in <b>1000</b> ms.`,
    `You have two functions available to you: <code>chill()</code>,
    which takes in two parameters: how long you wait in milliseconds.
    The second parameter should be a function that will be executed after
    we chill for some milliseconds. This is called a <i> callback </i> function.`,
    `You also have the the <code>throwBoomerang()</code> function which throws your boomerang.
    It only has a callback function as a parameter, executing after the boomerang is thrown.`,
    `In the editor below, chill for <b>1000</b> ms and then
    call <code>throwBoomerang()</code> in the callback.`
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
  }
]


export default levels
