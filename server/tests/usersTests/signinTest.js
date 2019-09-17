import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../../../app';
import user from '../helpers/dummyUser';

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaihttp);

// eslint-disable-next-line no-undef
describe('/POST signin', () => {
  // eslint-disable-next-line no-undef
  it('App should login a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user[0])
      .then((res) => {
        res.body.status.should.be.equal(200);
        done();
      })
      .catch((err) => done(err));
  });

  // eslint-disable-next-line no-undef
  it('App should check unauthorized user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user[1])
      .then((res) => {
        res.body.status.should.be.equal(401);
        done();
      })
      .catch((err) => done(err));
  });

  // eslint-disable-next-line no-undef
  it('App should check if user exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user[2])
      .then((res) => {
        res.body.status.should.be.equal(404);
        done();
      })
      .catch((err) => done(err));
  });
});
