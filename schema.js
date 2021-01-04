const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
} = require("graphql");

//Category
const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    categories: { type: GraphQLString },
    created_at: { type: GraphQLString },
    icon_url: { type: GraphQLString },
    id: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    url: { type: GraphQLString },
    value: { type: GraphQLString },
  }),
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return axios
          .get("https://api.chucknorris.io/jokes/categories")
          .then((res) => res.data);
      },
    },
    joke: {
      type: CategoryType,
      args: {
        category: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://api.chucknorris.io/jokes/random?category=${args.category}`
          )
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
