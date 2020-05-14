import { IValidator } from "@rheas/contracts/validators";
import { StringObject, AnyObject, KeyValue } from "@rheas/contracts";
export declare class Validator implements IValidator {
    /**
     * Performs all the rule validation checks.
     *
     * @var RuleValidator
     */
    private ruleValidator;
    /**
     * Holds the data to be validated.
     *
     * @var object
     */
    protected data: AnyObject;
    /**
     * Holds the rules associated with each field.
     *
     * @var object
     */
    protected rules: StringObject | KeyValue<any[]>;
    /**
     * Custom error messages to be used with fields. Fields are
     * the keys and its value is another object with rule name as
     * key and message as value.
     *
     * @var object
     */
    protected messages: KeyValue<StringObject>;
    /**
     * Stores the aliases for input fields. These aliases will be used
     * when parsing error message.
     *
     * @var object
     */
    protected aliases: StringObject;
    /**
     * Stores the validation errors. Field names are the keys
     * with an array containing RuleError objects as the associated
     * value.
     *
     * @var object
     */
    private errors;
    constructor(data: AnyObject, rules: StringObject, messages?: KeyValue<StringObject>, aliases?: StringObject);
    /**
     * Determine if the validation passes the given rules
     *
     * @return boolean
     */
    passes(): boolean;
    /**
     * Check the field value against the validation rules. Rules
     * are given as a string or an array of string or Rule instance.
     *
     * @param field Field to check
     * @param rules Rules to be checked
     */
    fieldValidate(field: string, rules: string | any[]): void;
    /**
     * Pushes the validation rule error message
     *
     * @param field Field key
     * @param error Validation rule error
     */
    private pushError;
    /**
     * Determine if the validation failed or not.
     *
     * @return boolean
     */
    fails(): boolean;
    /**
     * Returns the validation errors. Required for parsing
     * ValidationException response.
     *
     * @return object
     */
    getErrors(): KeyValue<string[]>;
    /**
     * Checks for the presence of any validation errors.
     *
     * @return boolean
     */
    hasErrors(): boolean;
}
