import Item from '../models/Item.js';

const getItems = async () => {
  try {
    const result = await Item.find();
    // res.status(200).json(result);
    return result;
  } catch (error) {
    throw new Error(error);
    res.status(400).json({ error: error.message });
  }
};


export default { getItems };
