/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {Feature} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const features = await Promise.all([
    Feature.create({type: 'Cafe', icon: 'https://image.flaticon.com/icons/svg/37/37908.svg'}),
    Feature.create({ type: 'Gym', icon: 'https://image.flaticon.com/icons/svg/563/563828.svg' }),
    Feature.create({ type: 'Grocery', icon: 'https://image.flaticon.com/icons/svg/69/69372.svg' }),
    Feature.create({ type: 'Yoga', icon: 'https://image.flaticon.com/icons/png/512/273/273280.png' }),
    Feature.create({ type: 'Metro Station', icon: 'https://image.flaticon.com/icons/svg/619/619035.svg' }),
    Feature.create({ type: 'Library', icon: 'https://image.flaticon.com/icons/svg/167/167755.svg' }),

  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${features.length} users`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
