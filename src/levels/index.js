const levels = [
  {
    "level": 0,
    "initialCode": "// write your code here",
    "instructions": [
      `Welcome to boomsync, where we will learn how to
      program asynchronously in Javascript by throwing boomerangs at birds.
      We are avid bird hunters and need your help. `,
      `To throw a boomerang, call <code>throwBoomerang()</code>.
      You can optionally include a callback parameter <code>throwBoomerang(callback)</code>,
      which will be executed once the boomerang returns.`,
      `For now, just give <code>throwBoomerang()</code> a try in the code editor
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
    "initialCode": "chill(1000, () => {\n// write your code here\n});",
    "instructions": [
      `For this level, if you throw the boomerang right away you'll be too early.`,
      `You'll need to throw a boomerang in <b>1000</b> ms.`,
      `We've provided you a second function called <code>chill</code>.
      <code>chill(waitTime, callback)</code>
      takes in two parameters: the first is how long to wait in milliseconds before
      the function in the second parameter is called.`,
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
    "initialCode": "throwBoomerang()\n//write your code here",
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
    "initialCode": "throwBoomerang((err) => {\n\tif (err) {\n\t\t// write your code here\n\t}\n})",
    "instructions": [
      `Great! But boomerangs are taking a beating after killing so many birds. Our boomerangs might break at a random time!
      The conventional way we deal with errors in asynchronous javascript is that if an error occurs during the execution of a function,
      the error will return in the first parameter of the callback (Note: some functions also return with data in a second parameter,
      though throwBoomerang() does not. You could get the value of the data by giving your arrow function <code>(err, data)</code> parameters).`,
      `There are 3 birds in this round: one you can kill immediately, one you can kill after chilling for 2000 ms,
      and one you can kill after chilling for 4000 ms. We've programmed that the one you kill immediately will break your boomerang, but
      in the real hunting world, and coding world, you never know when tragedy will strike: best practice if you catch for all three!`,
      `We've written out part of the first throwBoomerang function for you: call <code>fixBoomerangs()</code> to handle potential errors.`
    ],
    "events" : [
      {
        "type": 'brokenbird',
        "time": 1000,
      },
      {
        "type": 'bird',
        "time": 3000,
      },
      {
        "type": 'bird',
        "time": 5000,
      },
    ]
  },
  {
    "level": 4,
    "initialCode": `const promiseThrow = () => { return new Promise((resolve,reject) => {
throwBoomerang((error, result)=>{
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
    });
})};
promiseThrow().then(() => {
   //write code here
})
.catch(error => fixBoomerangs());`,
    "instructions": [
      `Awesome job! Next: Promises. A Promise is an object representing some asynchronous
      operation, and it can be either pending, fullfilled, or rejected. If a promise is fullfilled,
      it resolves (optionally with a particular value). If a promise fails (rejects), it
      is rejected with an error.`,
      `To make a promise, we construct a Promise object which takes in one parameter:
      a function with two callbacks, a resolve and reject. The function should be asynchronous that
      resolves on success and rejects with some kind of error.
      We can handle successes by calling <code>.then</code> on the Promise object, and errors with <code>.catch</code>.`,
      `To throw a boomerang right after the promise fulfills and we get our boomerang back,
      make another anonymous function that calls <code>throwBoomerang()</code> within <code>.then</code>.`
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
  },
  {
    "level": 5,
    "initialCode": "const promiseThrow = bluebird.promisify(throwBoomerang)\npromiseThrow().then(() =>{\n\t \n})",
    "instructions": [
      `Awesome job! Promises are really great, but they do take a lot of code to create.`,
      `In this example, you can use a library called <code>bluebird</code> to convert
      a function that takes a callback to a promise. Once you create that object using <code>.promisify(fn)</code>,
      You register what it should resolve with <code>.then</code>
      and reject with <code>.catch</code> as usual.`,
      `The birds come at the same time as the previous level, so throw a boomerang right when the promise from the first boomerang resolves.`
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
  },
  {
    "level": 6,
    "initialCode": "const promiseThrow = bluebird.promisify(throwBoomerang)\npromiseThrow()\n\t.catch(() => fixBoomerangs())",
    "instructions": [
      `Can we replicate some error catching code that we did with callbacks, but with promises? Sure thing: if the promise returned from <code>throwBoomerang()</code> rejects,`,
      `we can add a <code>.catch()</code> function to our function to do some error handling.`,
      `Again, there are 3 birds in this round: one you can kill immediately, one you can kill after chilling for 2000 ms,
      and one you can kill after chilling for 4000 ms.`,
    ],
    "events" : [
      {
        "type": 'brokenbird',
        "time": 1000,
      },
      {
        "type": 'bird',
        "time": 3000,
      },
      {
        "type": 'bird',
        "time": 5000,
      },
    ]
  },
  {
    level: 7,
    "instructions": ["Out of levels! Nice bird hunting. "],
    "initialCode": ''
  }

]


export default levels
