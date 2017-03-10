var chai = require('chai');
var assert = chai.assert;
var should = chai.should();

var incCalc = require('../../helpers/incomeCalculator');


describe('Tax Calculator', () => {
    
    it('should not exit if null', (done) => {
        should.not.exist(incCalc.monthlyPay(null));
        done();
    });

    it('should not exist with empty object', (done) => {
        var result = incCalc.monthlyPay({});

        should.not.exist(result);
        done();
    });

    it('should not exist with incorrect employee headers', (done) => {
        var result = incCalc.monthlyPay({
            first: 'abhishek',
            last: 'lal',
            annualSalary: 100000,
            super: 9,
            paymentStartDate: '01 March - 31 March'
        });

        should.not.exist(result);
        done();
    });

    it('should not exist when salary is in string format', (done) => {
        var result = incCalc.monthlyPay({
            firstName: 'abhishek',
            lastName: 'lal',
            annualSalary: 'aaaa',
            super: 9,
            paymentStartDate: '01 March - 31 March'
        });

        should.not.exist(result);
        done();
    });

    it('should not exist when super is in string format', (done) => {
        var result = incCalc.monthlyPay({
            firstName: 'abhishek',
            lastName: 'lal',
            annualSalary: 100000,
            super: 'aaaa',
            paymentStartDate: '01 March - 31 March'
        });

        should.not.exist(result);
        done();
    });

    it('should have property name abhishek lal when correct format', (done) => {
        var result = incCalc.monthlyPay({
            firstName: 'abhishek',
            lastName: 'lal',
            annualSalary: 100000,
            super: 8,
            paymentStartDate: '01 March - 31 March'
        });

        result.should.be.a('object');
        result.should.have.property('name').equal('abhishek lal');
        done();
    });

    it('should be an object with property name abhishek lal when both annualsalary and super are 0', (done) => {
        var result = incCalc.monthlyPay({
            firstName: 'abhishek',
            lastName: 'lal',
            annualSalary: 0,
            super: 0,
            paymentStartDate: '01 March - 31 March'
        });

        result.should.be.a('object');
        result.should.have.property('name').equal('abhishek lal');
        done();
    });

});


