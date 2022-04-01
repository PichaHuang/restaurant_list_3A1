const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')

const restaurantList = require("../../restaurant.json").results

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    ownRestaurantIndex: [0, 1, 2],
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    ownRestaurantIndex: [3, 4, 5],
  },
]

db.once('open', () => {
  Promise.all(
    Array.from(SEED_USER, (seedUser) => {
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(seedUser.password, salt))
        .then((hash) =>
          User.create({
            name: seedUser.name,
            email: seedUser.email,
            password: hash,
          })
        )
        .then((user) => {
          const userId = user._id
          const seedRestaurant = []
          seedUser.ownRestaurantIndex.forEach((x) => {
            restaurantList[x].userId = userId
            seedRestaurant.push(restaurantList[x])
          })
          return Restaurant.create(seedRestaurant)
        })
    })
  )
    .then(() => {
      console.log('done.')
      process.exit()
    })
})