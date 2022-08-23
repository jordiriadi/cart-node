const dummyCartItems = [
  {
    _id: 1,
    item: {
      _id: "63011e96f91f0342ddedec80",
      name: "Google Home",
      price: 49.99
    },
    cart: {
      _id: 'cart-0',
    },
    qty: 3,
  },
  {
    _id: 2,
    item: {
      _id: "630124dcca3e0f8533bf89c9",
      name: "MacBook Pro",
      price: 5399.99
    },
    cart: {
      _id: 'cart-9',
    },
    qty: 1,
  },
  {
    _id: 3,
    item: {
      _id: "6301286dca3e0f8533bf89cb",
      name: "Alexa Speaker",
      price: 109.5
    },
    cart: {
      _id: 'cart-b',
    },
    qty: 3,
  },
  {
    _id: 4,
    item: {
      _id: "63012881ca3e0f8533bf89cd",
      name: "Raspberry Pi B",
      price: 30
    },
    cart: {
      _id: 'cart-d',
    },
    qty: 1,
  }
];

const dummyPromotions = [
  {
    _id: 1,
    type: 'freebie',
    minItem: 1,
    multiple: true,
    discount: 0,
    freebieItem: { _id: '63012881ca3e0f8533bf89cd', price: 30 },
    item: { _id: '630124dcca3e0f8533bf89c9', }
  },
  {
    _id: 2,
    type: 'freebie',
    minItem: 2,
    multiple: true,
    discount: 0,
    freebieItem: { _id: '63011e96f91f0342ddedec80', price: 49.99 },
    item: { _id: '63011e96f91f0342ddedec80', }
  },
  {
    _id: 3,
    type: 'discount',
    minItem: 3,
    multiple: false,
    discount: 10,
    freebieItem: null,
    item: { _id: '6301286dca3e0f8533bf89cb', }
  }
];

export default { dummyCartItems, dummyPromotions };