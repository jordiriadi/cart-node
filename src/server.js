import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { graphqlHTTP } from 'express-graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import 'dotenv/config';

import cartRoutes from './routes/cart.js';
import checkoutRoutes from './routes/checkout.js';
import itemControllers from './controllers/item.js';
import cartControllers from './controllers/cart.js';
import checkoutControllers from './controllers/checkout.js'
import promotionControllers from './controllers/promotion.js'

const app = express()
const port = 3001

// Schema
const typeDefs = `
type Item {
  _id: ID!
  sku: String!
  name: String!
  price: Float!
  qty: Int
}

type Promotion {
  id: ID!
  type: String!
  minItem: Int!
  multiple: Boolean!
  discount: Float
  freebieItem: Item
  item: Item
}

type Cart {
  _id: String!
}

type CartItem {
  _id: String!
  cart: Cart
  item: Item
  qty: Int
}

type Query {
  items: [Item]
  promotions: [Promotion]
}

type Mutation {
  initCart: Cart
  addItemToCart(cartId: String, itemId: String, qty: Int): CartItem
  checkout(cartId: String): Float
}
`

// Resolver for warriors
const resolvers = {
  Query: {
    items: itemControllers.getItems,
    promotions: promotionControllers.getPromotions,
  },
  Mutation: {
    initCart: cartControllers.initCart,
    addItemToCart: cartControllers.addItemToCart,
    checkout: checkoutControllers.checkout,
  }
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Entrypoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: executableSchema,
    graphiql: true,
  })
)

mongoose.connect(process.env.MONGO_URI, {dbName: process.env.MONGO_DB_NAME})
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB & Running a server at http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

export default app;
