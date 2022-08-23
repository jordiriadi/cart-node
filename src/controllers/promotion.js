import Promotion from '../models/Promotion.js';

const getPromotions = async () => {
  try {
    const result = await Promotion.find().populate('freebieItem').populate('item');

    
    return result;
  } catch (error) {
    throw new Error(error);
  }
};


export default { getPromotions };
