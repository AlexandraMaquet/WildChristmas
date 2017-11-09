"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var enfantSchema = new mongoose.Schema({
    name: String,
    town: String,
    age: Number,
    present: String
});
var Enfant = mongoose.model('Enfant', enfantSchema);
exports.default = Enfant;
//# sourceMappingURL=enfant.js.map