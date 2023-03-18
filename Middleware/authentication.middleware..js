const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  const token = req.headers?.authorization;

  if (token) {
    const decoded = jwt.verify(token, "masai");

    if (decoded) {
      req.body.user = decoded.userId;
      next();
    } else {
      res.send("Please Login First");
    }
  } else {
    res.send("Please Login First");
  }
}

module.exports = { authentication };
