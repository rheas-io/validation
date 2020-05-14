"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var rule_1 = require("./rule");
var ruleError_1 = require("./ruleError");
var ruleParser_1 = require("./ruleParser");
var ruleValidator_1 = require("./ruleValidator");
var Validator = /** @class */ (function () {
    function Validator(data, rules, messages, aliases) {
        if (messages === void 0) { messages = {}; }
        if (aliases === void 0) { aliases = {}; }
        /**
         * Holds the data to be validated.
         *
         * @var object
         */
        this.data = {};
        /**
         * Holds the rules associated with each field.
         *
         * @var object
         */
        this.rules = {};
        /**
         * Custom error messages to be used with fields. Fields are
         * the keys and its value is another object with rule name as
         * key and message as value.
         *
         * @var object
         */
        this.messages = {};
        /**
         * Stores the aliases for input fields. These aliases will be used
         * when parsing error message.
         *
         * @var object
         */
        this.aliases = {};
        /**
         * Stores the validation errors. Field names are the keys
         * with an array containing RuleError objects as the associated
         * value.
         *
         * @var object
         */
        this.errors = {};
        this.ruleValidator = new ruleValidator_1.RuleValidator(this.data = data);
        this.rules = rules;
        this.messages = messages;
        this.aliases = aliases;
    }
    /**
     * Determine if the validation passes the given rules
     *
     * @return boolean
     */
    Validator.prototype.passes = function () {
        this.errors = {};
        for (var key in this.rules) {
            // Perform validation of all the rules
            this.fieldValidate(key, this.rules[key]);
        }
        return !this.hasErrors();
    };
    /**
     * Check the field value against the validation rules. Rules
     * are given as a string or an array of string or Rule instance.
     *
     * @param field Field to check
     * @param rules Rules to be checked
     */
    Validator.prototype.fieldValidate = function (field, rules) {
        var _a;
        var rules_list = ruleParser_1.RuleParser.parse(rules);
        var should_bail = false;
        var bailed = false;
        for (var i = 0; i < rules_list.length && !bailed; i++) {
            var pass = false;
            var _b = rules_list[i], rule = _b[0], params = _b.slice(1);
            if (rule instanceof rule_1.Rule) {
                pass = rule.check(this.data, field);
            }
            // If the rule is not an instance of class Rule,
            // it will be a string containing the basic Rheas rules 
            // and its arguments.
            else {
                if ('bail' === rule.trim()) {
                    should_bail = true;
                }
                pass = (_a = this.ruleValidator).passesRule.apply(_a, __spreadArrays([rule, field], params));
            }
            // If the rule validation failed, push the rule to
            // the error_rules array.
            if (!pass) {
                this.pushError(field, new (ruleError_1.RuleError.bind.apply(ruleError_1.RuleError, __spreadArrays([void 0, rule], params)))());
                bailed = should_bail;
            }
        }
    };
    /**
     * Pushes the validation rule error message
     *
     * @param field Field key
     * @param error Validation rule error
     */
    Validator.prototype.pushError = function (field, error) {
        if (!Array.isArray(this.errors[field])) {
            this.errors[field] = [];
        }
        var error_message = error.getErrorMessage(field, this.aliases[field], this.messages[field]);
        this.errors[field].push(error_message);
    };
    /**
     * Determine if the validation failed or not.
     *
     * @return boolean
     */
    Validator.prototype.fails = function () {
        return !this.passes();
    };
    /**
     * Returns the validation errors. Required for parsing
     * ValidationException response.
     *
     * @return object
     */
    Validator.prototype.getErrors = function () {
        return this.errors;
    };
    /**
     * Checks for the presence of any validation errors.
     *
     * @return boolean
     */
    Validator.prototype.hasErrors = function () {
        return this.errors && Object.keys(this.errors).length > 0;
    };
    return Validator;
}());
exports.Validator = Validator;
