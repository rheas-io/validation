"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("./rule");
const ruleError_1 = require("./ruleError");
const ruleParser_1 = require("./ruleParser");
const ruleValidator_1 = require("./ruleValidator");
class Validator {
    constructor(data, rules, messages = {}, aliases = {}) {
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
    passes() {
        this.errors = {};
        for (let key in this.rules) {
            // Perform validation of all the rules
            this.fieldValidate(key, this.rules[key]);
        }
        return !this.hasErrors();
    }
    /**
     * Check the field value against the validation rules. Rules
     * are given as a string or an array of string or Rule instance.
     *
     * @param field Field to check
     * @param rules Rules to be checked
     */
    fieldValidate(field, rules) {
        let rules_list = ruleParser_1.RuleParser.parse(rules);
        let should_bail = false;
        let bailed = false;
        for (let i = 0; i < rules_list.length && !bailed; i++) {
            let pass = false;
            let [rule, ...params] = rules_list[i];
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
                pass = this.ruleValidator.passesRule(rule, field, ...params);
            }
            // If the rule validation failed, push the rule to
            // the error_rules array.
            if (!pass) {
                this.pushError(field, new ruleError_1.RuleError(rule, ...params));
                bailed = should_bail;
            }
        }
    }
    /**
     * Pushes the validation rule error message
     *
     * @param field Field key
     * @param error Validation rule error
     */
    pushError(field, error) {
        if (!Array.isArray(this.errors[field])) {
            this.errors[field] = [];
        }
        let error_message = error.getErrorMessage(field, this.aliases[field], this.messages[field]);
        this.errors[field].push(error_message);
    }
    /**
     * Determine if the validation failed or not.
     *
     * @return boolean
     */
    fails() {
        return !this.passes();
    }
    /**
     * Returns the validation errors. Required for parsing
     * ValidationException response.
     *
     * @return object
     */
    getErrors() {
        return this.errors;
    }
    /**
     * Checks for the presence of any validation errors.
     *
     * @return boolean
     */
    hasErrors() {
        return this.errors && Object.keys(this.errors).length > 0;
    }
}
exports.Validator = Validator;
