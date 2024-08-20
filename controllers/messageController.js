const Message = require('../models/message');
const User = require('../models/user');

function isAuthenticated(req) {
  return req.isAuthenticated();
}

exports.getHomePage = async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: [{ model: User, as: 'user' }],
    });
    const isUserAuthenticated = isAuthenticated(req);

    res.render('home', { messages, isUserAuthenticated });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
