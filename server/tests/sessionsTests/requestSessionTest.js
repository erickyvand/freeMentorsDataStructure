/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../../../app';
import token from '../helpers/dummyToken';
import session from '../helpers/dummySession';

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaihttp);

describe('/POST Request mentorship session to mentor', () => {
  it('App should check if a user token is valid', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', token.fakeUserToken)
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should allow user to request mentorship session to a mentor', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', token.userToken)
      .send(session[8])
      .then((res) => {
        res.body.status.should.be.equal(200);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if a user is allowed to access the route', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', token.mentorToken)
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if field session name is not empty', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', token.userToken)
      .send(session[9])
      .then((res) => {
        res.body.status.should.be.equal(400);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if field session name is atleast 3 characters long', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', token.userToken)
      .send(session[10])
      .then((res) => {
        res.body.status.should.be.equal(400);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if a user ID exists', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', token.userToken)
      .send(session[11])
      .then((res) => {
        res.body.status.should.be.equal(404);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if the existed ID is a mentor\'s ID', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', token.userToken)
      .send(session[12])
      .then((res) => {
        res.body.status.should.be.equal(404);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if the request was made before', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('Authorization', token.userToken)
      .send(session[13])
      .then((res) => {
        res.body.status.should.be.equal(401);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if a user has set token', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      }).catch((err) => done(err));
  });
});
