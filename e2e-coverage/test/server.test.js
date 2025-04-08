const { describe, it, after, before } = require("mocha");
const supertest = require("supertest");
const assert = require("assert");

describe("API Suite test", () => {
  let server;
  before((done) => {
    server = require("../src/server");
    server.once("listening", done);
  });

  after((done) => server.close(done));

  describe("/api/login:get", () => {
    it("Should return HTTP status 200", async () => {
      const response = await supertest(server).get("/api/login").expect(200);

      assert.strictEqual(response.status, 200);
    });
  });

  describe("/api/not-found", () => {
    it("Should return HTTP status 404 and message not found!", async () => {
      const response = await supertest(server)
        .get("/api/not-found")
        .expect(404);

      assert.strictEqual(response.status, 404);
      assert.deepStrictEqual(response.text, "not found!");
    });
  });

  describe("/api/login:post", () => {
    it("Should return HTTP status 401 and unauthorized! if user or password is not valid", async () => {
      const response = await supertest(server)
        .post("/api/login")
        .send({ username: "gibson", password: "123s" })
        .expect(401);

      assert.deepStrictEqual(response.text, "unauthorized!");
    });

    describe("/api/login:post", () => {
      it("Should return HTTP status 200 and succeced message", async () => {
        const response = await supertest(server)
          .post("/api/login")
          .send({ username: "gibson", password: "123" })
          .expect(200);
        assert.deepStrictEqual(response.text, "Succeced!");
      });
    });
  });
});
