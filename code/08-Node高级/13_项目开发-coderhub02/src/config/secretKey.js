const path = require("path");
const fs = require("fs");

const PRIVATE_KEY = fs.readFileSync("./src/config/keys/private.key");
const PUBLIC_KEY = fs.readFileSync("./src/config/keys/public.key");

module.exports = {
  PRIVATE_KEY,
  PUBLIC_KEY,
};
