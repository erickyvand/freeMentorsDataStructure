/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../../../app';
import token from '../helpers/dummyToken';

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaihttp);

// eslint-disable-next-line no-undef
describe('/PATCH change user to mentor', () => {
  // eslint-disable-next-line no-undef
  it('App should allow admin to update user to mentor', (done) => {
    chai.request(app)
      .patch('/api/v1/user/2')
      .set('Authorization', token.adminToken)
      .then((res) => {
        res.body.status.should.be.equal(200);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if the ID of the user to update exists', (done) => {
    chai.request(app)
      .patch('/api/v1/user/99')
      .set('Authorization', token.adminToken)
      .then((res) => {
        res.body.status.should.be.equal(404);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if the ID of the user has been updated before', (done) => {
    chai.request(app)
      .patch('/api/v1/user/4')
      .set('Authorization', token.adminToken)
      .then((res) => {
        res.body.status.should.be.equal(409);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if the ID of the user to update is an admin', (done) => {
    chai.request(app)
      .patch('/api/v1/user/1')
      .set('Authorization', token.adminToken)
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check the user token is allowed to access the route', (done) => {
    chai.request(app)
      .patch('/api/v1/user/9')
      .set('Authorization', token.userToken)
      .then((res) => {
        res.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if the user token is correct', (done) => {
    chai.request(app)
      .patch('/api/v1/user/10')
      .set('Authorization', token.fakeAdminToken)
      .then((res) => {
        res.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if the user has set token', (done) => {
    chai.request(app)
      .patch('/api/v1/user/10')
      .then((res) => {
        res.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });
});
