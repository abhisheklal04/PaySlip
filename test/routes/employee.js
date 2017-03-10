var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var fs = require('fs');

chai.use(chaiHttp);
var _testDir = 'test/routes/testFiles/';

describe('employee', function() {
    
    describe('/POST paySlip', () => {
        it('it should POST csv file containing 4 employees', (done) => {            
            chai.request(server)
                .post('/employee/paySlip')
                .attach('file', fs.readFileSync(_testDir+'test1.csv'), 'test1.csv')
                .send()
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');                    
                    res.body.should.have.length(4);                    
                    done();
                });
        });

        it('it should not POST csv file with no. of rows exceeding the limit', (done) => {            
            chai.request(server)
                .post('/employee/paySlip')
                .attach('file', fs.readFileSync(_testDir+'test5.csv'), 'test5.csv')
                .send()
                .end((err, res) => {
                    res.should.not.have.status(200);                                                    
                    done();
                });
        });

        it('it should not post an incorrect column format csv', (done) => {            
            chai.request(server)
                .post('/employee/paySlip')
                .attach('file', fs.readFileSync(_testDir+'test2.csv'), 'test2.csv')
                .send()
                .end((err, res) => {                	
                    res.should.not.have.status(200);                                                    
                    done();
                });
        });

        it('it should not post a partially correct csv', (done) => {            
            chai.request(server)
                .post('/employee/paySlip')
                .attach('file', fs.readFileSync(_testDir+'test3.csv'), 'test3.csv')
                .send()
                .end((err, res) => {                	
                    res.should.not.have.status(200);                                                    
                    done();
                });
        });

        it('it should not post csv without header', (done) => {            
            chai.request(server)
                .post('/employee/paySlip')
                .attach('file', fs.readFileSync(_testDir+'test4.csv'), 'test4.csv')
                .send()
                .end((err, res) => {                	
                    res.should.not.have.status(200);                                                    
                    done();
                });
        });

        it('it should only post a csv file', (done) => {            
            chai.request(server)
                .post('/employee/paySlip')                
                .attach('file', fs.readFileSync(_testDir+'test1.csv'), 'test1.abc')
                .send()
                .end((err, res) => {                    
                    res.should.not.have.status(200);                                                    
                    done();
                });
        });
    });
});
