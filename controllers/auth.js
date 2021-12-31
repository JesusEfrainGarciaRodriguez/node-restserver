const { request, response } = require("express");

const login = (req = request, res = response) => {
  res.json({
    message: "login ok",
  });
};

module.exports = {
  login,
};
