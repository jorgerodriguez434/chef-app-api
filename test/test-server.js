const chai = require('chai');
const chaiHttp = require('chai-http');

const {app} = require('../server');

const should = chai.should();
chai.use(chaiHttp);

describe('API', function() {

  it('should return 200 on GET requests', function() {
    return chai.request(app)
      .get('/test')
      .then(function(res) {
        res.should.be.json;
      });
  });
});
