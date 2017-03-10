(function(exports) {

    var utils = {

        checkValueBySchema: function(value, type, length) {

            if (type == 'string' && value.length <= length) {
                return value;
            } else if (type == 'number' && value.length <= length && Number(value) != NaN && Number(value) >= 0) {
                return Number(value);
            } else {
                return null;
            }
        },

        addExcelDataToJSONListBySchema: function(data, resultList, schemaList) {

            var obj = [];
            var isValidSchema = true;

            if (data.length == schemaList.length) {

                data.forEach(function(value, index) {
                    var schema = schemaList[index];
                    var formatedValue = utils.checkValueBySchema(value, schema.type, schema.length);
                    if (formatedValue != null) {
                        obj[schema.name] = formatedValue;
                    } else {
                        isValidSchema = false;
                    }
                });

                if (isValidSchema) {
                    resultList.push(obj);
                }
            } else {
                isValidSchema = false;
            }

            return isValidSchema;
        }
    }

    exports.utils = utils;
})(module.exports);
