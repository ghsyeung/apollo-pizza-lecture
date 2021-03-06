const { gql } = require('apollo-server');
const schema = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type User {
    name: String
    email: String
  }

  type Order {
    orderBy: User
    toppings: [String]
    isCompleted: Boolean
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    getUsers: [User]
    getOrders: [Order]
    getUser(id:ID!): User
    whoami: User
  }

  input NewOrder {
    "Toppings on the pizza"
    toppings: [String]!
  }

  type Mutation {
    addOrder(newOrder: NewOrder!): Order
    signUp(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Boolean
    logout: Boolean
    
    # Just for fun
    bake: Int
  }
`;

module.exports = schema;
