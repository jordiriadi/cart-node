import supertest from 'supertest';
import checkoutController from '../controllers/checkout';

import app from '../server';
const request = supertest(app);

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});
describe('Cart', () => {
  const dummyCartItems = [
    {
      item: {
        _id: "63011e96f91f0342ddedec80",
        name: "Google Home",
        price: 49.99
      },
      qty: 3,
    },
    {
      item: {
        _id: "630124dcca3e0f8533bf89c9",
        name: "MacBook Pro",
        price: 5399.99
      },
      qty: 1,
    },
    {
      item: {
        _id: "6301286dca3e0f8533bf89cb",
        name: "Alexa Speaker",
        price: 109.5
      },
      qty: 3,
    },
    {
      item: {
        _id: "63012881ca3e0f8533bf89cd",
        name: "Raspberry Pi B",
        price: 30
      },
      qty: 1,
    }
  ];
  let promotions =  [
    {
      type: 'freebie',
      minItem: 1,
      multiple: true,
      discount: 0,
      freebieItem: { _id: '63012881ca3e0f8533bf89cd', price: 30 },
      item: {_id: '630124dcca3e0f8533bf89c9', }
    },
    {
      type: 'freebie',
      minItem: 2,
      multiple: true,
      discount: 0,
      freebieItem: { _id: '63011e96f91f0342ddedec80', price: 49.99 },
      item: {_id: '63011e96f91f0342ddedec80', }
    },
    {
      type: 'discount',
      minItem: 3,
      multiple: false,
      discount: 10,
      freebieItem: null,
      item: {_id: '6301286dca3e0f8533bf89cb', }
    }
  ];

  const expectedPromotionDiscounts = [49.99, 30, 32.85];


  it.skip('get promotions', (done) => {
    request.post('/graphql')
      .send({ query: `
        {
          promotions {
            type
            minItem
            multiple
            discount
            freebieItem {
              _id
              price
            }
          }
        }
      ` })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.data).toHaveProperty('promotions');
        done();
      })
  });

  it('get promotion discount', () => {
    dummyCartItems.forEach((cartItem, index) => {
      const promotion = promotions.find((_promotion) => _promotion.item._id === cartItem.item._id);

      if (!promotion) return;

      const discount = checkoutController.applyPromotion({ promotion, cartItems: dummyCartItems, cartItem, item: cartItem.item });

      expect(discount).toEqual(expectedPromotionDiscounts[index]);
    })
  });
});