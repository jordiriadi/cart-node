import Item from '../models/Item.js';

const getItems = async () => {
  try {
    const result = await Item.find();

    return result;
  } catch (error) {
    throw new Error(error);
  }
};


export default { getItems };
