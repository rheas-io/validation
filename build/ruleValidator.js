"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const support_1 = require("@rheas/support");
class RuleValidator {
    constructor(data) {
        this.data = data;
    }
    /**
     * Checks the field for a particular rule.
     *
     * @param rule The rule to check
     * @param field The data field to check
     * @param params Additional parameters
     */
    passesRule(rule, field, ...params) {
        let method = "validate" + support_1.Str.studly(rule);
        if (method in this) {
            //@ts-ignore
            let handler = this[method].bind(this);
            return handler(field, ...params);
        }
        throw Error(`Unknown rule ${rule} given. Read the docs for valid rule list.`);
    }
    /**
     * Always return true.
     *
     * @param field Data field name
     */
    validateBail(field) {
        return true;
    }
    /**
     * Check if the field_confirm field matches
     *
     * @param field
     */
    validateConfirm(field) {
        let confirmField = field + "_confirm";
        return this.data[field] === this.data[confirmField];
    }
    /**
     * Check if the input value is a valid email address or not.
     *
     * @param field Data field name
     */
    validateEmail(field) {
        return support_1.Str.isValidEmail(this.data[field]);
    }
    /**
     * Check if the given input value has a min char length, array size
     * or file size.
     *
     * Throws error if no arguments are passed.
     *
     * @param field Data field name
     * @param params Array holding the min length value
     */
    validateMin(field, ...params) {
        this.meetsRequiredParameters(1, 'min', ...params);
        let value = this.data[field];
        return this.getSize(value) >= this.numericParameter("min", params[0]);
    }
    /**
     * Check if the given input value is above the max char length, array size
     * or file size limits.
     *
     * Throws error if no arguments are passed.
     *
     * @param field Data field name
     * @param params Array holding the min length value
     */
    validateMax(field, ...params) {
        this.meetsRequiredParameters(1, 'max', ...params);
        let value = this.data[field];
        return this.getSize(value) <= this.numericParameter("max", params[0]);
    }
    /**
     * Check if the input exists. null, undefined and empty
     * strings will return false. Everything else returns true.
     *
     * @param field Data field name
     */
    validateRequired(field) {
        let value = this.data[field];
        return null != value && "" !== value;
    }
    /**
     *
     * @param input
     */
    getSize(input) {
        if (Array.isArray(input) || typeof input === 'string') {
            return input.length;
        }
        return input.length;
    }
    /**
     *
     * @param needs_count
     * @param rule
     * @param params
     */
    meetsRequiredParameters(needs_count, rule, ...params) {
        if (params.length < needs_count)
            throw Error(`${rule} needs minimum ${needs_count} parameters`);
    }
    /**
     *
     * @param rule
     * @param value
     */
    numericParameter(rule, value) {
        let result = parseInt(value);
        if (isNaN(result))
            throw Error(`${rule} expects numeric value/s as parameters`);
        return result;
    }
}
exports.RuleValidator = RuleValidator;
