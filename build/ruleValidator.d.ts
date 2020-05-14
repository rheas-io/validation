import { AnyObject } from "@rheas/contracts";
export declare class RuleValidator {
    /**
     * Holds the data to be validated.
     *
     * @var object
     */
    private data;
    constructor(data: AnyObject);
    /**
     * Checks the field for a particular rule.
     *
     * @param rule The rule to check
     * @param field The data field to check
     * @param params Additional parameters
     */
    passesRule(rule: string, field: string, ...params: string[]): boolean;
    /**
     * Always return true.
     *
     * @param field Data field name
     */
    protected validateBail(field: string): boolean;
    /**
     * Check if the field_confirm field matches
     *
     * @param field
     */
    protected validateConfirm(field: string): boolean;
    /**
     * Check if the input value is a valid email address or not.
     *
     * @param field Data field name
     */
    protected validateEmail(field: string): boolean;
    /**
     * Check if the given input value has a min char length, array size
     * or file size.
     *
     * Throws error if no arguments are passed.
     *
     * @param field Data field name
     * @param params Array holding the min length value
     */
    protected validateMin(field: string, ...params: string[]): boolean;
    /**
     * Check if the given input value is above the max char length, array size
     * or file size limits.
     *
     * Throws error if no arguments are passed.
     *
     * @param field Data field name
     * @param params Array holding the min length value
     */
    protected validateMax(field: string, ...params: string[]): boolean;
    /**
     * Check if the input exists. null, undefined and empty
     * strings will return false. Everything else returns true.
     *
     * @param field Data field name
     */
    protected validateRequired(field: string): boolean;
    /**
     *
     * @param input
     */
    protected getSize(input: any): any;
    /**
     *
     * @param needs_count
     * @param rule
     * @param params
     */
    protected meetsRequiredParameters(needs_count: Number, rule: string, ...params: string[]): void;
    /**
     *
     * @param rule
     * @param value
     */
    protected numericParameter(rule: string, value: string): number;
}
