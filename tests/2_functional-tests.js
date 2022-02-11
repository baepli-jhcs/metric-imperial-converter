const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("GET /api/convert?input=[input] => object", () => {
    test("?input=10L", (done) => {
      chai
        .request(server)
        .get("/api/convert?input=10L")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, "L");
          assert.equal(res.body.returnNum, 2.64172);
          assert.equal(res.body.returnUnit, "gal");
          done();
        });
    });
    test("?input=32g", (done) => {
      chai
        .request(server)
        .get("/api/convert?input=32g")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid unit");
          done();
        });
    });
    test("?input=3/7.2/4kg", (done) => {
      chai
        .request(server)
        .get("/api/convert?input=3/7.2/4kg")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number");
          done();
        });
    });
    test("?input=3/7.2/4kilomegagram", (done) => {
      chai
        .request(server)
        .get("/api/convert?input=3/7.2/4kilomegagram")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number and unit");
          done();
        });
    });
    test("?input=kg", (done) => {
      chai
        .request(server)
        .get("/api/convert?input=kg")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          done();
        });
    });
  });
});
