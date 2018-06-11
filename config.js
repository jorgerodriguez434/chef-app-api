exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
exports.DATABASE_URL = process.env.DATABASE_URL ||
 global.DATABASE_URL ||
                  'mongodb://localhost/chef-app';
