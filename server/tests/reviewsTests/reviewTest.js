/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../../../app';
import token from '../helpers/dummyToken';
import review from '../helpers/dummyReview';

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaihttp);

describe('/POST User review mentor for mentorship session', () => {
  it('App should check if mentor has set headers token', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/1/review')
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if a user token is valid', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/1/review')
      .set('Authorization', token.fakeUserToken)
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check route access', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/1/review')
      .set('Authorization', token.mentorToken)
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should show admin all reviews', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/1/review')
      .set('Authorization', token.adminToken)
      .then((res) => {
        res.body.status.should.be.equal(200);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if the given session ID exists', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/99/review')
      .set('Authorization', token.userToken)
      .then((res) => {
        res.body.status.should.be.equal(404);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if is the right user who requested', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/4/review')
      .set('Authorization', token.userToken)
      .then((res) => {
        res.body.status.should.be.equal(404);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check rejected status should not reviewed', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/5/review')
      .set('Authorization', token.userToken)
      .then((res) => {
        res.body.status.should.be.equal(401);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check field input to be valid', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/6/review')
      .set('Authorization', token.userToken)
      .send(review[0])
      .then((res) => {
        res.body.status.should.be.equal(400);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should create review', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/6/review')
      .set('Authorization', token.userToken)
      .send(review[1])
      .then((res) => {
        res.body.status.should.be.equal(200);
        done();
      })
      .catch((err) => done(err));
  });
});
