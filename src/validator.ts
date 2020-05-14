import { Rule } from "./rule";
import { RuleError } from "./ruleError";
import { RuleParser } from "./ruleParser";
import { RuleValidator } from "./ruleValidator";
import { IValidator } from "@rheas/contracts/validators";
import { StringObject, AnyObject, KeyValue } from "@rheas/contracts";

export class Validator implements IValidator {

    /**
     * Performs all the rule validation checks.
     * 
     * @var RuleValidator
     */
    private ruleValidator: RuleValidator;

    /**
     * Holds the data to be validated.
     * 
     * @var object
     */
    protected data: AnyObject = {}

    /**
     * Holds the rules associated with each field.
     * 
     * @var object
     */
    protected rules: StringObject | KeyValue<any[]> = {};

    /**
     * Custom error messages to be used with fields. Fields are
     * the keys and its value is another object with rule name as
     * key and message as value.
     * 
     * @var object
     */
    protected messages: KeyValue<StringObject> = {}

    /**
     * Stores the aliases for input fields. These aliases will be used
     * when parsing error message.
     * 
     * @var object
     */
    protected aliases: StringObject = {}

    /**
     * Stores the validation errors. Field names are the keys
     * with an array containing RuleError objects as the associated 
     * value.
     * 
     * @var object
     */
    private errors: KeyValue<string[]> = {};

    constructor(data: AnyObject, rules: StringObject, messages: KeyValue<StringObject> = {}, aliases: StringObject = {}) {

        this.ruleValidator = new RuleValidator(this.data = data);

        this.rules = rules;
        this.messages = messages;
        this.aliases = aliases;
    }

    /**
     * Determine if the validation passes the given rules
     * 
     * @return boolean
     */
    public passes(): boolean {

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
    public fieldValidate(field: string, rules: string | any[]) {

        let rules_list = RuleParser.parse(rules);
        let should_bail = false;
        let bailed = false;

        for (let i = 0; i < rules_list.length && !bailed; i++) {
            let pass = false;
            let [rule, ...params] = rules_list[i];

            if (rule instanceof Rule) {
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
                this.pushError(field, new RuleError(rule, ...params));
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
    private pushError(field: string, error: RuleError) {

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
    public fails(): boolean {
        return !this.passes();
    }

    /**
     * Returns the validation errors. Required for parsing 
     * ValidationException response.
     * 
     * @return object
     */
    public getErrors(): KeyValue<string[]> {
        return this.errors;
    }

    /**
     * Checks for the presence of any validation errors.
     * 
     * @return boolean
     */
    public hasErrors(): boolean {
        return this.errors && Object.keys(this.errors).length > 0;
    }
}