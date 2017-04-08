const levels = [
  {}, // no level 0 lol
  {
    "level": 1,
    "initialcode": "chill(100, () => \n // write your code here \n );",
    "instructions": [`Welcome to boomsync, where we will learn how to
    program asynchronously in Javascript.
    For this level, we need to throw a boomerang to kill a bird in <b>500</b> ms.`,
    `You have two functions available to you: <code>chill()</code>,
    which takes in two parameters: how long you wait in milliseconds.
    The second parameter should be a function that will be executed after
    we chill for some milliseconds. This is called a <i> callback </i> function.`,
    `You also have the the <code>throwBoomerang()</code> function which throws your boomerang.
    It only has a callback function as a parameter, executing after the boomerang is thrown.`,
    `In the editor below, chill for <b>500</b> ms and then
    call <code>throwBoomerang()</code> in the callback.`
    ],
    "events": [
      {
        "type": 'bird',
        "time": 500
      }
    ]
  },
  {
    "level": 2,
    "instructions": "Great job! However, this code did not take advantage \
    ",
    "events": [
      {
        "type": 'bird',
        "time": 500
      }
    ]
  }
]


export default levels
