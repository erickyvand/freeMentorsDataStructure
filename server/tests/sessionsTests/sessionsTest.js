/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../../../app';
import token from '../helpers/dummyToken';

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaihttp);

describe('/GET User own request and Mentor own request against him', () => {
  it('App should check if mentor has set headers token', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      }).catch((err) => done(err));
  });

  it('App should check if a user token is valid', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .set('Authorization', token.fakeUserToken, token.fakeMentorToken)
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check route access', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .set('Authorization', token.adminToken)
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should get user own request', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .set('Authorization', token.userToken)
      .then((res) => {
        res.body.status.should.be.equal(200);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should get mentor own request against him', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .set('Authorization', token.mentorToken)
      .then((res) => {
        res.body.status.should.be.equal(200);
        done();
      })
      .catch((err) => done(err));
  });
});
