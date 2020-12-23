const path = require('path');
const gateway = require('express-gateway');
require("./todoIndex")

gateway()
  .load(path.join(__dirname, 'config'))
  .run();
