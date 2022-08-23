import supertest from 'supertest';
import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';
import Item from '../models/Item.js';
import app from '../server';

import DUMMY from './dummy.js';

const { dummyCartItems } = DUMMY;
const request = supertest(app);

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});
describe('Cart', () => {
  let cartId = '';
  const itemId = '63011e96f91f0342ddedec80';

  it('Init Cart', async (done) => {
    jest.spyOn(Cart, "create").mockReturnValue(Promise.resolve({ _id: 1, __v: 0 }));
    request.post('/graphql')
      .send({ query: `
        mutation {
          initCart{
            _id
          }
        }
      ` })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.data.initCart).toHaveProperty('_id')
        cartId = res.body.data.initCart._id;
        done();
      })
  });

  it('Add Item To New Cart', (done) => {
    jest.spyOn(CartItem, "findOne").mockReturnValue(Promise.resolve(null));
    jest.spyOn(CartItem, "create").mockReturnValue(Promise.resolve(dummyCartItems[0]));
    jest.spyOn(CartItem, "findOneAndUpdate").mockReturnValue(Promise.resolve({ ...dummyCartItems[0], qty: dummyCartItems[0].qty + 1 }));
    jest.spyOn(Item, "findById").mockReturnValue(Promise.resolve(dummyCartItems[0]));
    request.post('/graphql')
      .send({ query: `
        mutation AddItemToCart ($cartId: String, $itemId: String){
          addItemToCart(cartId: $cartId, itemId: $itemId, qty: 1) {
            _id
            cart {
              _id
            }
            item {
              _id
            }
            qty
          }
        }
      `,
        variables: {
          cartId,
          itemId
        }
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.data.addItemToCart.cart).toHaveProperty('_id');
        expect(res.body.data.addItemToCart.item).toHaveProperty('_id');

        done();
      })
  });

  it('Add Item To Cart', (done) => {
    jest.spyOn(CartItem, "findOne").mockReturnValue(Promise.resolve({ qty: 1 }));
    jest.spyOn(CartItem, "create").mockReturnValue(Promise.resolve(dummyCartItems[0]));
    jest.spyOn(CartItem, "findOneAndUpdate").mockReturnValue(Promise.resolve({ ...dummyCartItems[0], qty: dummyCartItems[0].qty + 1 }));
    jest.spyOn(Item, "findById").mockReturnValue(Promise.resolve(dummyCartItems[0]));
    request.post('/graphql')
      .send({ query: `
        mutation AddItemToCart ($cartId: String, $itemId: String){
          addItemToCart(cartId: $cartId, itemId: $itemId, qty: 1) {
            _id
            cart {
              _id
            }
            item {
              _id
            }
            qty
          }
        }
      `,
        variables: {
          cartId,
          itemId
        }
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.data.addItemToCart.cart).toHaveProperty('_id');
        expect(res.body.data.addItemToCart.item).toHaveProperty('_id');
        expect(res.body.data.addItemToCart.qty).toEqual(dummyCartItems[0].qty + 1);

        done();
      })
  });
});