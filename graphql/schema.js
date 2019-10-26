const {buildSchema} = require('graphql');
const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');
const gadgetGraphQLType = require('./gadgetType');
const Gadget = require('../models/gadgets');
const RootMutations = require('./mutations');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    gadget: {
      type: gadgetGraphQLType,
      args: {id: {type: GraphQLString}},
      resolve(parent, args) {
        return Gadget.findById(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutations
});

