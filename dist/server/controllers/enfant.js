"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var enfant_1 = require("../models/enfant");
var base_1 = require("./base");
var EnfantCtrl = (function (_super) {
    __extends(EnfantCtrl, _super);
    function EnfantCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = enfant_1.default;
        _this.getAllCreated = function (req, res) {
            _this.model.find({ created: true }, function (err, docs) {
                if (err) {
                    return console.error(err);
                }
                res.json(docs);
            });
        };
        _this.countCreated = function (req, res) {
            _this.model.count({ created: true }, function (err, count) {
                if (err) {
                    return console.error(err);
                }
                res.json(count);
            });
        };
        _this.test = function (req, res) {
            _this.model.count({ created: true }, function (err, count) {
                if (err) {
                    return console.error(err);
                }
                res.json(count);
            });
        };
        return _this;
    }
    return EnfantCtrl;
}(base_1.default));
exports.default = EnfantCtrl;
//# sourceMappingURL=enfant.js.map