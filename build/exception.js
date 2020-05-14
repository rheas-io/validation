"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("@rheas/errors");
var ValidationException = /** @class */ (function (_super) {
    __extends(ValidationException, _super);
    /**
     * Set the error message and HTTP status code to 422.
     *
     * @param validator
     */
    function ValidationException(validator) {
        var _this = _super.call(this, "Validation exception", 422) || this;
        _this.validator = validator;
        return _this;
    }
    /**
     * Returns the validator errors object. Error handler will
     * parse the errors to Json if required. Or the views can iterate
     * through the errors and display the error messages on view.
     *
     * @return object
     */
    ValidationException.prototype.getErrors = function () {
        return this.validator.getErrors();
    };
    return ValidationException;
}(errors_1.Exception));
exports.ValidationException = ValidationException;
