const Message = require("../models/message");
const User = require("../models/user");

function isAuthenticated(req) {
  return req.isAuthenticated();
}

exports.getHomePage = async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: [{ model: User, as: "user" }],
      order: [["id", "DESC"]],
    });
    const isUserAuthenticated = isAuthenticated(req);

    res.render("home", {
      title: "Message Board",
      messages,
      isUserAuthenticated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.createMessage = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .send("Unauthorized: Please log in to create a message.");
    }

    console.log(req.body);
    const { title, message } = req.body;

    await Message.create({
      title,
      text: message,
      userId: req.user.id,
    });

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
