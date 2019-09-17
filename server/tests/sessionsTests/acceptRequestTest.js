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

describe('/PATCH Mentor accept mentorship session from user', () => {
  it('App should check if a user token is valid', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/1/accept')
      .set('Authorization', token.fakeMentorToken)
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if a logged user is a mentor', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/1/accept')
      .set('Authorization', token.userToken)
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if the given session ID exists', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/99/accept')
      .set('Authorization', token.mentorToken)
      .then((res) => {
        res.body.status.should.be.equal(404);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if the logged mentor ID matches the requested mentor ID', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/1/accept')
      .set('Authorization', token.mentorToken)
      .send(session[0])
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if the requested session was rejected before', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/5/accept')
      .set('Authorization', token.mentorToken)
      .send(session[1])
      .then((res) => {
        res.body.status.should.be.equal(401);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if the requested session was accepted before', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/4/accept')
      .set('Authorization', token.mentorToken)
      .send(session[2])
      .then((res) => {
        res.body.status.should.be.equal(409);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should update the requested to accepted', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/7/accept')
      .set('Authorization', token.mentorToken)
      .send(session[3])
      .then((res) => {
        res.body.status.should.be.equal(200);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if mentor has set headers token', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/3/accept')
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      }).catch((err) => done(err));
  });
});
