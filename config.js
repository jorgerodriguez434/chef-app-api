exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'https://chef-app-client.herokuapp.com';
exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  global.DATABASE_URL ||
  "mongodb://localhost/chef-app";
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || "mongodb://localhost/test-chef-app";
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || "config.JWT_SECRET";
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';


//https://chef-app-client.herokuapp.com
//http://localhost:3000