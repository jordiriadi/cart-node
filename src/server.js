import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { graphqlHTTP } from 'express-graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import 'dotenv/config';

import cartRoutes from './routes/cart.js';
import checkoutRoutes from './routes/checkout.js';

const app = express()
const port = 3001

// In-memory data store
const items = [
  {id: '120P90', name: 'Google Home', price: 49.99, qty: 10},
  {id: '43N23P', name: 'MacBook Pro', price: 5399.99, qty: 5},
  {id: 'A304SD', name: 'Alexa Speaker', price: 109.5, qty: 10},
  {id: '234234', name: 'Raspberry Pi B', price: 30, qty: 5},
];
const promotions = [
  { item: '43N23P', type: 'freebie', discount: 0, freebieItem: items[3], minItem: 1, multiple: true },
  { item: '120P90', type: 'freebie', discount: 0, freebieItem: items[0], minItem: 2, multiple: true },
  { item: 'A304SD', type: 'discount', discount: '10', freebieItem: null, minItem: 3, multiple: false }
];
const data = {
  items,
  promotions,
};

// Schema
const typeDefs = `
type Item {
  id: ID!
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
}

type Query {
  items: [Item]
  promotions: [Promotion]
}
`

// Resolver for warriors
const resolvers = {
  Query: {
    items: (obj, args, context) => context.items,
    promotions: (obj, args, context) => context.promotions,
  },
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
    context: data,
    graphiql: true,
  })
)

app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

mongoose.connect(process.env.MONGO_URI, {dbName: process.env.MONGO_DB_NAME})
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB & Running a server at http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });