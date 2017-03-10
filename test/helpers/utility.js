var chai = require('chai');
var assert = chai.assert;
var should = chai.should();

var UTILITY = require('../../helpers/utility').utils;
var CONSTANTS = require('../../helpers/constants').constants;

describe('Utility : Check Excel Schema', () => {
    
    it('should return true with correct format', (done) => {
        
        UTILITY.addExcelDataToJSONListBySchema(['max', 'smith','0','0','01 March - 31 March'], 
            [], CONSTANTS.employeeExcelSchema).should.equal(true);
        
        UTILITY.addExcelDataToJSONListBySchema(['max', 'smith','10','20','01 March - 31 March'], 
            [], CONSTANTS.employeeExcelSchema).should.be.equal(true);
        done();
    });

    it('should return false with long firstName', (done) => {
        
        UTILITY.addExcelDataToJSONListBySchema(['maxwwwwwwwwwwwwwwwwwwww', 'smith','0','0','01 March - 31 March'], 
            [], CONSTANTS.employeeExcelSchema).should.be.equal(false);
        done();
    });

    it('should return false with salary out of range', (done) => {
        
        UTILITY.addExcelDataToJSONListBySchema(['max', 'smith','-1','0','01 March - 31 March'], 
            [], CONSTANTS.employeeExcelSchema).should.be.equal(false);

        UTILITY.addExcelDataToJSONListBySchema(['max', 'smith','1000000000000','0','01 March - 31 March'], 
            [], CONSTANTS.employeeExcelSchema).should.be.equal(false);
        done();
    });

    it('should return false with super out of range', (done) => {
        
        UTILITY.addExcelDataToJSONListBySchema(['max', 'smith','0','100','01 March - 31 March'], 
            [], CONSTANTS.employeeExcelSchema).should.equal(false);
        done();
    });
});