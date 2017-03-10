var chai = require('chai');
var assert = chai.assert;
var should = chai.should();

var incCalc = require('../../helpers/incomeCalculator');

describe('Helpers', () => {
    it('null case', (done) => {
        should.not.exist(incCalc.monthlyPay(null));
        done();
    });

    it('empty employee object', (done) => {
        var result = incCalc.monthlyPay({});  

        should.not.exist(result);
        done();
    });

    it('incorrect employee Schema', (done) => {
        var result = incCalc.monthlyPay({ first: 'abhishek', last: 'lal', 
            annualSalary: 100000, super: 9, 
            paymentStartDate: '01 March - 31 March' });
        
        should.not.exist(result);
        done();
    });

    it('salary is in string format', (done) => {
        var result = incCalc.monthlyPay({ firstName: 'abhishek', lastName: 'lal', 
            annualSalary: 'aaaa', super: 9, 
            paymentStartDate: '01 March - 31 March' }); 

        should.not.exist(result);
        done();
    });

    it('super is in string format', (done) => {
        var result = incCalc.monthlyPay({ firstName: 'abhishek', lastName: 'lal', 
            annualSalary: 100000, super: 'aaaa', 
            paymentStartDate: '01 March - 31 March' });

        should.not.exist(result);
        done();
    });

    it('passing test', (done) => {
        var result = incCalc.monthlyPay({ 
        	firstName: 'abhishek', lastName: 'lal', 
        	annualSalary: 100000, super: 8, 
        	paymentStartDate: '01 March - 31 March' });        
                
        result.should.be.a('object');
        result.should.have.property('name').equal('abhishek lal');
        done();
    });

});
