const { AuthenticationError } = require('apollo-server');
const { tokenConfig } = require("../config");
const { users, orders } = require('../data');

// NEW!!
function unsetCookie({ name, res }) {
	res.clearCookie(name);
}

function setCookie({ name, value, res }) {
	res.cookie(name, value, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 1000 * 60 * 60 * 2 // 2h
	});
}

const Mutation = {
  addOrder(_, {newOrder}) {
    orders.push({
      orderBy: newOrder.orderBy,
      toppings: newOrder.toppings,
      isCompleted: false,
    });
    return orders[orders.length - 1];
  },
  signUp(_, {name, email, password}) {
    users.push({
      name, email, password
    });
    return users[users.length - 1];
  },
  login(_, {email, password}, {req}) {
    const userId = users.findIndex(u => u.email === email && u.password === password);
    if(userId !== -1) {
      setCookie({
        name: tokenConfig.name,
        value: userId,
        res: req.res,
      });
      return true;
    }
    throw new AuthenticationError("Invalid login!");
  },
  // NEW!!
  logout(_, __, { req }) {
    unsetCookie({name: tokenConfig.name, res: req.res});
    unsetCookie({name: 'timesBaked', res: req.res});
    return true;
  },
  bake(_, __, { req }) {
    const newTimesBaked = (+req.cookies.timesBaked || 0) + 1;
    setCookie({
      name: 'timesBaked',
      value: newTimesBaked,
      res: req.res,
    });
    return newTimesBaked;
  }
};

module.exports = Mutation;
