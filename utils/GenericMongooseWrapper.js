/*jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true*/

/* globals require, module */

var Q = require("q"),
    mongoose = require("mongoose");

function GenericMongooseWrapper(modelName, schemaPath) {
    "use strict";
    this.schema = require(schemaPath);
    this.model = mongoose.model(modelName);
}

GenericMongooseWrapper.prototype.find = function (query, fields, options) {
    "use strict";
    query = query || {};
    fields = fields || {};
    options = options || {};

    return (Q.denodeify(this.model.find.bind(this.model)))(query, fields, options);
};

GenericMongooseWrapper.prototype.findOne = function (query, fields, options) {
    "use strict";
    query = query || {};
    fields = fields || {};
    options = options || {};

    return (Q.denodeify(this.model.findOne.bind(this.model)))(query, fields, options);
};

GenericMongooseWrapper.prototype.findById = function (id) {
    "use strict";
    return (Q.denodeify(this.model.findById.bind(this.model)))(id);
};

GenericMongooseWrapper.prototype.save = function (model) {
    "use strict";
    return (Q.denodeify(model.save.bind(model)))();
};

GenericMongooseWrapper.prototype.remove = function (model) {
    "use strict";
    return (Q.denodeify(model.remove.bind(model)))();
};

module.exports = GenericMongooseWrapper;
