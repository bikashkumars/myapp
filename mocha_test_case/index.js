var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://127.0.0.1:3000");

// UNIT test begin
describe("Init-Test",function() {

    // #1 should return home page
    it("Home-Page should be reachable",function(done) {
        // calling home page api
        server
            .get("/dev/api")
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                done();
            });
    });

    //Response should be As Expected
    it("Response should be Express",function(done) {
        // calling home page api
        server
            .get("/dev/api")
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                res.body.title.should.equal('Express');
                done();
            });
    });


});

//Login API Testing
describe("Login-API",function() {
    var authToken = '';
    it("User should able to login",function(done) {
        // calling home page api
        var user = {"username": "ctladmin", "password": "ctladmin@1234", "domain": "ctl"};
        server
            .post("/dev/api/users/login")
            .type('json')
            .send(user)
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                res.body.user['first_name'].should.equal('Ctl');
                res.body.user.gender.should.equal('Female');
                res.body.user.role.should.equal('Admin');
                res.body.user.username.should.equal('ctladmin');
                res.body.token['token_id'].should.have.length(32);
                authToken = res.body.token['token_id'];
                done();
            });
    });

    //http://127.0.0.1:3000/dev/api/users/getMenu/?token_id=eb25a1f2f7175d5bb2c2ba74cbf53070
    it("Get Menu details of logged-in user",function(done) {
        server
            .get("/dev/api/users/getMenu?token_id="+authToken)
            .type('json')
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                res.body.should.have.properties('menu');
                done();
            });
    });

});
