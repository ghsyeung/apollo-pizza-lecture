const { users, orders } = require('../data');

const Query = {
  getUsers: () => users,
  getOrders: () => orders,
  getUser: (_, {id}) => users[+id],
  // NEW!!
  whoami: (_, __, {pizzaUser}) => {
    return pizzaUser ? users[pizzaUser] : undefined;
  },
};

module.exports = Query;
