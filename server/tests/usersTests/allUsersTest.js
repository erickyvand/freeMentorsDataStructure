/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../../../app';
import token from '../helpers/dummyToken';

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaihttp);

describe('/GET All Users and all Mentors separately', () => {
  it('App should check for set headers token', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      }).catch((err) => done(err));
  });

  it('App should check token is valid', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .set('Authorization', token.fakeAdminToken)
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should check route access', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .set('Authorization', token.userToken)
      .then((res) => {
        res.body.status.should.be.equal(403);
        done();
      })
      .catch((err) => done(err));
  });

  it('App should get users and mentors', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .set('Authorization', token.adminToken)
      .then((res) => {
        res.body.status.should.be.equal(200);
        done();
      })
      .catch((err) => done(err));
  });
});
