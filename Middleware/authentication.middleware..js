const jwt = require("jsonwebtoken");
const Cookies = require("js-cookie");

function authentication(req, res, next) {
  const token = req.headers.cookies;
  console.log(token);

  if (token) {
    const decoded = jwt.verify(token, "masai");

    if (decoded) {
      req.body.user = decoded.userId; //here you are adding user key to the req.body object
      next();
    } else {
      res.send("Please Login First");
    }
  } else {
    res.send("Please Login First");
  }
}

module.exports = { authentication };
