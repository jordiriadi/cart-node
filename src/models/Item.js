import mongoose from "mongoose";
import { composeMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  sku: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
  }
}, { timestamps: true });

export default mongoose.model('items', ItemSchema);
// const Item = mongoose.model('items', ItemSchema);

// const customizationOptions = {}; // left it empty for simplicity, described below
// const ItemTC = composeMongoose(Item, customizationOptions);
// schemaComposer.Query.addFields({
//   itemById: ItemTC.mongooseResolvers.findById(),
//   itemByIds: ItemTC.mongooseResolvers.findByIds(),
//   itemOne: ItemTC.mongooseResolvers.findOne(),
//   itemMany: ItemTC.mongooseResolvers.findMany(),
//   itemDataLoader: ItemTC.mongooseResolvers.dataLoader(),
//   itemDataLoaderMany: ItemTC.mongooseResolvers.dataLoaderMany(),
//   itemByIdLean: ItemTC.mongooseResolvers.findById({ lean: true }),
//   itemByIdsLean: ItemTC.mongooseResolvers.findByIds({ lean: true }),
//   itemOneLean: ItemTC.mongooseResolvers.findOne({ lean: true }),
//   itemManyLean: ItemTC.mongooseResolvers.findMany({ lean: true }),
//   itemDataLoaderLean: ItemTC.mongooseResolvers.dataLoader({ lean: true }),
//   itemDataLoaderManyLean: ItemTC.mongooseResolvers.dataLoaderMany({ lean: true }),
//   itemCount: ItemTC.mongooseResolvers.count(),
//   itemConnection: ItemTC.mongooseResolvers.connection(),
//   itemPagination: ItemTC.mongooseResolvers.pagination(),
// });

// schemaComposer.Mutation.addFields({
//   itemCreateOne: ItemTC.mongooseResolvers.createOne(),
//   itemCreateMany: ItemTC.mongooseResolvers.createMany(),
//   itemUpdateById: ItemTC.mongooseResolvers.updateById(),
//   itemUpdateOne: ItemTC.mongooseResolvers.updateOne(),
//   itemUpdateMany: ItemTC.mongooseResolvers.updateMany(),
//   itemRemoveById: ItemTC.mongooseResolvers.removeById(),
//   itemRemoveOne: ItemTC.mongooseResolvers.removeOne(),
//   itemRemoveMany: ItemTC.mongooseResolvers.removeMany(),
// });

// // STEP 4: BUILD GraphQL SCHEMA OBJECT
// const schema = schemaComposer.buildSchema();
// export default schema;