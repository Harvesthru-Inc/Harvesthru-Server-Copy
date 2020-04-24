const mongoose = require('mongoose');

const connect = () => {
  mongoose.connect('ENTER CONNECT URI HERE');
};

module.exports = connect;
