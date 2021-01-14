const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');
const mongoose = require('mongoose');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;


describe('GET /api/departments', () => {
  before(async () => {
    const testConOne = new Concert({performer: 'John', genre: 'Rock', price: 25, day: 1, image: 'image'});
    await testConOne.save();
    const testConTwo = new Concert({performer: 'Anna', genre: 'Pop', price: 20, day: 2, image: 'image1'});
    await testConTwo.save();
    const testConThree = new Concert({performer: 'John', genre: 'Rock', price: 20, day: 2, image: 'image2'});
    await testConThree.save();
  });

  it('/ should return concerts filtered by performer', async () => {
    const res = await request(server).get('/api/concerts/performer/John');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  
  });
  
  it('/ should return concerts filtered by genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Rock');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  
  });
  
  it('/ should return concerts filtered by price', async () => {
    const res = await request(server).get('/api/concerts/price/10/22');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });
  
  it('/ should return concerts filtered by day', async () => {
    const res = await request(server).get('/api/concerts/price/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });
  
  after(async () => {
    await Concert.deleteMany();
  });
  
  after(() => {
    mongoose.models = {};
  });
});