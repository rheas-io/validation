import { Str } from '@rheas/support/str';
import { AnyObject } from '@rheas/contracts';
import { IRuleHandler } from '@rheas/contracts/validators';

export class RuleValidator {
    /**
     * Holds the data to be validated.
     *
     * @var object
     */
    private data: AnyObject;

    constructor(data: AnyObject) {
        this.data = data;
    }

    /**
     * Checks the field for a particular rule.
     *
     * @param rule The rule to check
     * @param field The data field to check
     * @param params Additional parameters
     */
    public passesRule(rule: string, field: string, ...params: string[]): boolean {
        let method = 'validate' + Str.studly(rule);

        if (method in this) {
            //@ts-ignore
            let handler: IRuleHandler = this[method].bind(this);

            return handler(field, ...params);
        }
        throw Error(`Unknown rule ${rule} given. Read the docs for valid rule list.`);
    }

    /**
     * Always return true.
     *
     * @param field Data field name
     */
    protected validateBail(field: string) {
        return true;
    }

    /**
     * Check if the field_confirm field matches
     *
     * @param field
     */
    protected validateConfirm(field: string) {
        let confirmField = field + '_confirm';

        return this.data[field] === this.data[confirmField];
    }

    /**
     * Check if the input value is a valid email address or not.
     *
     * @param field Data field name
     */
    protected validateEmail(field: string) {
        return Str.isValidEmail(this.data[field]);
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
    protected validateMin(field: string, ...params: string[]): boolean {
        this.meetsRequiredParameters(1, 'min', ...params);

        let value = this.data[field];

        return this.getSize(value) >= this.numericParameter('min', params[0]);
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
    protected validateMax(field: string, ...params: string[]): boolean {
        this.meetsRequiredParameters(1, 'max', ...params);

        let value = this.data[field];

        return this.getSize(value) <= this.numericParameter('max', params[0]);
    }

    /**
     * Check if the input exists. null, undefined and empty
     * strings will return false. Everything else returns true.
     *
     * @param field Data field name
     */
    protected validateRequired(field: string) {
        let value = this.data[field];

        return null != value && '' !== value;
    }

    /**
     *
     * @param input
     */
    protected getSize(input: any) {
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
    protected meetsRequiredParameters(needs_count: Number, rule: string, ...params: string[]) {
        if (params.length < needs_count)
            throw Error(`${rule} needs minimum ${needs_count} parameters`);
    }

    /**
     *
     * @param rule
     * @param value
     */
    protected numericParameter(rule: string, value: string) {
        let result = parseInt(value);

        if (isNaN(result)) throw Error(`${rule} expects numeric value/s as parameters`);

        return result;
    }
}
