/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../../../app';
import token from '../helpers/dummyToken';

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaihttp);

describe('/DELETE Admin can delete mentorship session review deemed inappropriate', () => {
  it('App should check if admin has set headers token', (done) => {
    chai.request(app)
      .delete('/api/v1/sessions/1/review')
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if a admin token is valid', (done) => {
    chai.request(app)
      .delete('/api/v1/sessions/1/review')
      .set('Authorization', token.fakeAdminToken)
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check route access', (done) => {
    chai.request(app)
      .delete('/api/v1/sessions/1/review')
      .set('Authorization', token.userToken)
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check if the given review ID exists', (done) => {
    chai.request(app)
      .delete('/api/v1/sessions/99/review')
      .set('Authorization', token.adminToken)
      .then((res) => {
        res.body.status.should.be.equal(404);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should allow admin to delete review', (done) => {
    chai.request(app)
      .delete('/api/v1/sessions/1/review')
      .set('Authorization', token.adminToken)
      .then((res) => {
        res.body.status.should.be.equal(200);
        done();
      })
      .catch((err) => done(err));
  });
});
