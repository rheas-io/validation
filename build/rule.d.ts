import { AnyObject } from "@rheas/contracts";
export declare abstract class Rule {
    /**
     * Name of this rule.
     *
     * @var string
     */
    protected name: string;
    constructor(name?: string);
    /**
     * Check if the input field satisfies with this rule or not.
     *
     * @param all_fields The whole fields and values.
     * @param field The name of the field to validate
     */
    abstract check(all_fields: AnyObject, field: string): boolean;
    /**
     * Returns the error message of this rule. The message can be
     * parsed or not. Use ":attribute" to be replaced with the field
     * name. Other params can use any word followed by a colon.
     *
     * For eg: The :attribute field must have :min characters.
     *
     * Rheas will replace :attribute with the field name and :min
     * with the first param of the rule.
     */
    abstract getErrorMessage(): string;
    /**
     * Returns the name of this rule.
     */
    getName(): string;
}
