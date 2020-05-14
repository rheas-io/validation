"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var support_1 = require("@rheas/support");
var emailValidator_1 = require("@rheas/support/emailValidator");
var RuleValidator = /** @class */ (function () {
    function RuleValidator(data) {
        this.data = data;
    }
    /**
     * Checks the field for a particular rule.
     *
     * @param rule The rule to check
     * @param field The data field to check
     * @param params Additional parameters
     */
    RuleValidator.prototype.passesRule = function (rule, field) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        var method = "validate" + support_1.Str.studly(rule);
        if (method in this) {
            //@ts-ignore
            var handler = this[method].bind(this);
            return handler.apply(void 0, __spreadArrays([field], params));
        }
        throw Error("Unknown rule " + rule + " given. Read the docs for valid rule list.");
    };
    /**
     * Always return true.
     *
     * @param field Data field name
     */
    RuleValidator.prototype.validateBail = function (field) {
        return true;
    };
    /**
     * Check if the field_confirm field matches
     *
     * @param field
     */
    RuleValidator.prototype.validateConfirm = function (field) {
        var confirmField = field + "_confirm";
        return this.data[field] === this.data[confirmField];
    };
    /**
     * Check if the input value is a valid email address or not.
     *
     * @param field Data field name
     */
    RuleValidator.prototype.validateEmail = function (field) {
        var validator = new emailValidator_1.EmailValidator();
        return validator.validate(this.data[field]);
    };
    /**
     * Check if the given input value has a min char length, array size
     * or file size.
     *
     * Throws error if no arguments are passed.
     *
     * @param field Data field name
     * @param params Array holding the min length value
     */
    RuleValidator.prototype.validateMin = function (field) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.meetsRequiredParameters.apply(this, __spreadArrays([1, 'min'], params));
        var value = this.data[field];
        return this.getSize(value) >= this.numericParameter("min", params[0]);
    };
    /**
     * Check if the given input value is above the max char length, array size
     * or file size limits.
     *
     * Throws error if no arguments are passed.
     *
     * @param field Data field name
     * @param params Array holding the min length value
     */
    RuleValidator.prototype.validateMax = function (field) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.meetsRequiredParameters.apply(this, __spreadArrays([1, 'max'], params));
        var value = this.data[field];
        return this.getSize(value) <= this.numericParameter("max", params[0]);
    };
    /**
     * Check if the input exists. null, undefined and empty
     * strings will return false. Everything else returns true.
     *
     * @param field Data field name
     */
    RuleValidator.prototype.validateRequired = function (field) {
        var value = this.data[field];
        return null != value && "" !== value;
    };
    /**
     *
     * @param input
     */
    RuleValidator.prototype.getSize = function (input) {
        if (Array.isArray(input) || typeof input === 'string') {
            return input.length;
        }
        return input.length;
    };
    /**
     *
     * @param needs_count
     * @param rule
     * @param params
     */
    RuleValidator.prototype.meetsRequiredParameters = function (needs_count, rule) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        if (params.length < needs_count)
            throw Error(rule + " needs minimum " + needs_count + " parameters");
    };
    /**
     *
     * @param rule
     * @param value
     */
    RuleValidator.prototype.numericParameter = function (rule, value) {
        var result = parseInt(value);
        if (isNaN(result))
            throw Error(rule + " expects numeric value/s as parameters");
        return result;
    };
    return RuleValidator;
}());
exports.RuleValidator = RuleValidator;
