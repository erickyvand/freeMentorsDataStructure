import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../../../app';
import user from '../helpers/dummyUser';

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaihttp);

// eslint-disable-next-line no-undef
describe('/POST signup', () => {
  // eslint-disable-next-line no-undef
  it('App should create a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user[3])
      .then((res) => {
        res.body.status.should.be.equal(201);
        done();
      })
      .catch((err) => done(err));
  });

  // eslint-disable-next-line no-undef
  it('App should check bad request to the field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user[4])
      .then((res) => {
        res.body.status.should.be.equal(400);
        done();
      })
      .catch((err) => done(err));
  });

  // eslint-disable-next-line no-undef
  it('App should check if email exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user[5])
      .then((res) => {
        res.body.status.should.be.equal(409);
        done();
      })
      .catch((err) => done(err));
  });

// eslint-disable-next-line eol-last
});